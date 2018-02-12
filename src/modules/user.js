import * as md5 from "md5";

// const URL_HOST = "https://bangumi.moe";
const URL_SIGIN = `/api/user/signin`;
const URL_FETCH = `/api/user/fetch`;
const URL_SESSION = `/api/user/session`;

const DEFAULT_USERNAME = "Anonymous";

const users = {};

class User {
  /*
    SignIn API return intitial struct 
    {
        "_id":"566a6782c7a2fafb3c1aae30",
        "username":"SCys",
        "emailHash":"f8be07662cc444cdba3f84a2f82988b5",
        "active":true,
        "regDate":1449813890472,
        "team_ids":null,
        "group":"member"
    }
   */
  constructor() {
    this.emailHash = "";
    this.regDate = new Date(1970, 1, 1);
    this.active = false;
    this.teamIds = [];
    this.group = "unkown";

    // username spec
    this.name = DEFAULT_USERNAME;

    this.busy = false;
    this.isSignIn = false;
  }

  checkSignIn() {
    return new Promise(resolve => {
      fetch(URL_SESSION, {
        credentials: "include"
      })
        .then(resp => resp.json())
        .then(userInfo => {
          if (userInfo.emailHash === undefined) {
            this.isSignIn = false;
            resolve(null);
            return;
          }

          this.emailHash = userInfo.emailHash;
          this.group = userInfo.group;
          this.id = userInfo.id;
          this.name = userInfo.username;
          this.regDate = userInfo.regDate;
          this.isSignIn = true;
          console.info(`[User.doSignIn]${this.toString()} ok`);

          resolve(this);
        });
    });
  }

  doSignIn(password) {
    return new Promise(resolve => {
      if (this.busy) {
        console.warn(`[user.doSignIn]${this.toString()} is busy`);
        resolve(false);
        return;
      }

      if (!password) {
        resolve(false);
        return;
      }

      this.busy = true;

      fetch(URL_SIGIN, {
        method: "POST",
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        //   Cache: "no-cache"
        // },
        // credentials: "same-origin",
        credentials: "include",
        body: JSON.stringify({
          password: md5(password),
          username: this.name
        })
      }).then(resp => {
        console.log(resp.headers.get("set-cookie"));
        resp.json().then(data => {
          this.busy = false;

          const result = data.success;
          if (!result) {
            console.info(`[User.doSignIn]${this.toString()} failed`);
            resolve(false);
            return;
          }

          // TODO check cookie is updated

          const userInfo = data.user;
          this.emailHash = userInfo.emailHash;
          this.group = userInfo.group;
          this.id = userInfo.id;
          this.name = userInfo.username;
          this.regDate = userInfo.regDate;
          this.isSignIn = true;
          console.info(`[User.doSignIn]${this.toString()} ok`);

          resolve(true);
        });
      });
    });
  }

  toString() {
    return `<User "${this.name}">`;
  }

  static fetch(id) {
    return new Promise(resolve => {
      fetch(URL_FETCH, {
        method: "POST",
        body: JSON.stringify({ _id: id })
      })
        .then(resp => resp.json())
        .then(data => {
          let user = users[id];
          if (user === undefined) {
            user = new User();
            users[id] = user;
          }

          user.name = data.username;
          user.emailHash = data.emailHash;
          user.active = data.active;
          user.regDate = Date.parse(data.regDate);
          user.teamIds = data.teamIds;
          user.group = data.group;
          resolve(user);

          console.info(`[User.fetch]${user.toString()} info`);
        });
    });
  }

  // promise<User>
  static get(id, source) {
    return new Promise(resolve => {
      let user = users[id];
      if (user !== undefined) {
        resolve(user);
        return;
      }

      user = new User();
      user.emailHash = source.emailHash;
      user.name = source.username;
      user.id = source._id;

      users[id] = user;

      resolve(user);
    });
  }
}

const user = new User();

export { user, User };
