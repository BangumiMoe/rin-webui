import md5 from 'md5';
import 'whatwg-fetch';


const default_icon = require('../assets/akarin.jpg');

export class User {
  __urlLogin = '/api/user/signin';
  __urlCheck = '/api/v2/user/session';
  __urlIcon = 'https://static.bangumi.moe/avatar';

  username = null;
  email = null;
  teams = [];

  info = {
    active: false,
    emailHash: '',
    group: 'invalid',
    team_ids: [],
  };
  extra_info = {
    regDate: new Date(),
    receiveEmail: false,
  };

  sso = {
    disqus: {
      api_key: '',
      remote_auth_v3: '',
    },
  };

  constructor(username) {
    this.info = {
      active: false,
      emailHash: '',
      group: 'invalid',
      team_ids: [],
    };
    this.extra_info = {
      regDate: new Date(),
      receiveEmail: false,
    };
    this.sso = {
      disqus: {
        api_key: '',
        remote_auth_v3: '',
      },
    };

    this.teams = [];
    this.email = '';
    this.username = username;
  }

  isLogin() {
    return this.username != 'anonymous';
  }

  get_icon() {
    if (this.isLogin()) {
      return `${this.__urlIcon}/${this.info.emailHash}`;
    }
    return default_icon;
  }

  reset() {
    this.info.active = false;
    this.info.emailHash = '';
    this.info.group = 'invalid';
    this.info.team_ids.splice(0);

    this.extra_info.regDate = new Date();
    this.extra_info.receiveEmail = false;

    this.sso.disqus.api_key = '';
    this.sso.disqus.remote_auth_v3 = '';

    this.teams.splice(0);
    this.email = '';
    this.username = 'anonymous';
  }

  login(username, password) {
    return fetch(this.__urlLogin, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: md5(password) }),
    }).then(resp => {
      const promise = resp.json();

      promise.then(json => {
        this.reset();

        if (json.success) {
          this.info.active = json.user.active;
          this.info.emailHash = json.user.emailHash;
          this.info.group = json.user.group;
          if (json.user.team_ids) this.info.team_ids.push(json.user.team_ids);
          this.username = json.user.username;

          console.info(`[User.login]user ${username} is success login.`);
        }
      });

      return promise;
    });
  }

  check() {
    return fetch(this.__urlCheck, {
      credentials: 'same-origin',
    }).then(resp => {
      console.debug(`[User.check]user ${this.username} checking...`);

      return resp.json().then(json => {
        this.reset();
        if (json.active) {
          this.info.active = json.active;
          this.info.emailHash = json.emailHash;
          this.info.group = json.group;
          if (json.team_ids) this.info.team_ids.push(...json.team_ids);

          this.extra_info.regDate = new Date(json.regDate);
          this.extra_info.receiveEmail = json.receiveEmail;

          this.sso.disqus.api_key = json.sso.disqus.api_key;
          this.sso.disqus.remote_auth_v3 = json.sso.disqus.remote_auth_v3;

          this.teams.push(...json.teams);
          this.email = json.email;
          this.username = json.username;

          console.info(`[User.check]user ${this.username} check ok.`);
        }
      });
    });
  }
}

export const user = new User('anonymous');
