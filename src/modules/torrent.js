import { User } from "@/modules/user";
import Team from "@/modules/team";
import Tag from "@/modules/tag";

const URL_TORRENT_PAGE = `/api/v2/torrent/page`;
const URL_TORRENT_USER = `/api/v2/torrent/user`;
const URL_TORRENT_SUGG = `/api/v2/torrent/suggest`;
const URL_TORRENT_SEAR = `/api/v2/torrent/search`;

class Torrent {
  // manager is global var

  constructor(source) {
    if (source === undefined) {
      throw new Error(`[Torrent]invalid source`);
    }

    // torrent data struct from service {{{
    this.countInfo = {
      comments: source.comments,
      downloads: source.downloads,
      finished: source.finished,
      leechers: source.leechers,
      seeders: source.seeders
    };

    // file info
    this.size = source.size;
    this.fileID = source.file_id; // torrent file id
    this.magnet = source.magnet;

    this.team = null;

    this.title = source.title;
    this.introduction = source.introduction;
    this.infoHash = source.info_hash;

    this.categoryTagID = source.category_tag_id;
    this.uploaderID = source.uploader_id;
    this.id = source._id;

    this.publishDate = new Date(source.publish_time);
    // END }}}

    // inline data struct {{{
    this.tag = null;
    if (source.category_tag)
      Tag.get(this.categoryTagID, source.category_tag).then(
        tag => (this.tag = tag)
      );

    this.uploader = null;
    User.get(this.uploaderID, source.uploader).then(
      user => (this.uploader = user)
    );

    if (source.team) {
      Team.get(source.team_id, source.team).then(team => {
        this.team = team;
        if (!!source.teamsync && source.sync !== undefined) {
          Object.entries(source.sync).forEach(([key, value]) => {
            this.team.sync[key] = value;
          });
        }
      });
    }
    // }}}

    this.fetchTimestamp = new Date(); // now
  }

  getTitle() {
    return this.title.replace("【", "[").replace("】", "]");
  }

  getUploader() {
    return this.uploader ? this.uploader.name : "...";
  }
}

class TorrentManager {
  constructor() {
    this.query = "";

    this.pageCount = -1;
    this.pageCurrent = -1;

    this.torrents = [];

    this.lastFetchTimestamp = new Date(1970, 1, 1);
    this.busy = false;
  }

  fetchPageByUser(num = 1, user) {
    // TODO check user is sign in
    return new Promise((resolve, reject) => {
      if (this.busy) {
        console.error(`[TorrentManager.fetchPage]service busy`);
        reject("Service Busy");
        return;
      }

      if (num instanceof Number) {
        console.warn(
          `[TorrentManager.fetchPage]invalid page num, reset to ZERO`
        );
        num = 1;
      }

      for (let pageData of this.torrents) {
        if (pageData.num === num) {
          resolve(pageData);
          console.info(`[TorrentManager.fetchPage]get page data from cache`);
          return;
        }
      }

      fetch(`${URL_TORRENT_USER}/${user.id}?p=${num}limit=30`)
        .then(resp => resp.json())
        .then(data => {
          // reset torrents when page count is changed
          if (this.pageCount != data.page_count) {
            this.torrents.splice(0);
            console.debug(`[TorrentManager.fetchPage]reset loaded page data`);
          }

          this.pageCount = data.page_count;

          const pageData = {
            num: num,
            count: 0,
            torrents: []
          };
          data.torrents.forEach(entry =>
            pageData.torrents.push(new Torrent(entry))
          );
          pageData.count = pageData.torrents.length;

          this.torrents.push(pageData);
          console.info(
            `[TorrentManager.fetchPage]fetch page ${num} torrents count ${
              pageData.count
            }`
          );

          resolve(pageData);
        });
    });
  }

  fetchPage(num = 1, limit = 30) {
    return new Promise((resolve, reject) => {
      if (this.busy) {
        console.error(`[TorrentManager.fetchPage]service busy`);
        reject("Service Busy");
        return;
      }

      if (num instanceof Number) {
        console.warn(
          `[TorrentManager.fetchPage]invalid page num, reset to ZERO`
        );
        num = 1;
      }

      for (let pageData of this.torrents) {
        if (pageData.num === num) {
          resolve(pageData);
          console.info(`[TorrentManager.fetchPage]get page data from cache`);
          return;
        }
      }

      fetch(`${URL_TORRENT_PAGE}/${num}?limit=${limit}`)
        .then(resp => resp.json())
        .then(data => {
          // reset torrents when page count is changed
          if (this.pageCount != data.page_count) {
            this.torrents.splice(0);
            console.debug(`[TorrentManager.fetchPage]reset loaded page data`);
          }

          this.pageCount = data.page_count;

          const pageData = {
            num: num,
            count: 0,
            torrents: []
          };
          data.torrents.forEach(entry =>
            pageData.torrents.push(new Torrent(entry))
          );
          pageData.count = pageData.torrents.length;

          this.torrents.push(pageData);
          console.info(
            `[TorrentManager.fetchPage]fetch page ${num} torrents count ${
              pageData.count
            }`
          );

          resolve(pageData);
        });
    });
  }

  fetchSuggest(query) {
    return new Promise((resolve, reject) => {
      if (query instanceof String) {
        console.warn(`[TorrentManager.fetchPage]invalid query`);
        reject("Invalid query");
        return;
      }

      if (this.busy) {
        console.error(`[TorrentManager.fetchSuggest]service busy`);
        reject("Service Busy");
        return;
      }

      this.busy = true;

      fetch(`${URL_TORRENT_SUGG}?query=${query}`)
        .then(resp => resp.json())
        .then(data => {
          this.busy = false;
          console.log(data);
          resolve(data);
        });
    });
  }

  searchPage(query, num = 1, limit = 30) {
    return new Promise((resolve, reject) => {
      if (this.busy) {
        console.error(`[TorrentManager.fetchPage]service busy`);
        reject("Service Busy");
        return;
      }

      if (num instanceof Number) {
        console.warn(
          `[TorrentManager.fetchPage]invalid page num, reset to ZERO`
        );
        num = 1;
      }

      fetch(`${URL_TORRENT_SEAR}?p=${num}&limit=${limit}&query=${query}`)
        .then(resp => resp.json())
        .then(data => {
          // reset torrents when page count is changed
          if (this.pageCount != data.page_count) {
            this.torrents.splice(0);
            console.debug(`[TorrentManager.fetchPage]reset loaded page data`);
          }

          this.pageCount = data.page_count;

          const pageData = {
            num: num,
            count: 0,
            torrents: []
          };
          data.torrents.forEach(entry =>
            pageData.torrents.push(new Torrent(entry))
          );
          pageData.count = pageData.torrents.length;

          this.torrents.push(pageData);
          console.info(
            `[TorrentManager.searchPage]search ${query} page ${num} torrents count ${
              pageData.count
            }`
          );

          resolve(pageData);
        });
    });
  }
}

const manager = new TorrentManager();
Torrent.manager = manager;

export { Torrent };
