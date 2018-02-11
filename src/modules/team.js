import Tag from "@/modules/tag";

const teams = {};

class Team {
  constructor(source) {
    this.id = source._id;
    this.name = source.name;
    this.tagId = source.tag_id;

    if (source.icon) this.iconUrl = `https://static.bangumi.moe/${source.icon}`;
    else this.iconUrl = '';
    // else this.iconUrl = require("../assets/akarin.jpg");

    this.tag = null;
    if (source.tag)
      Tag.get(this.tagId, source.tag).then(tag => {
        this.tag = tag;
      });

    this.sync = {};
  }

  static get(id, source) {
    return new Promise(resolve => {
      let team = teams[id];
      if (team !== undefined) {
        resolve(team);
        return;
      }

      team = new Team(source);
      teams[id] = team;
      resolve(team);
    });
  }
}

export default Team;
