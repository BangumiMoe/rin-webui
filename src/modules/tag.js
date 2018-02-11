// const URL_TAG_ALL = `/api/tag/all`;
// const URL_TAG_FETCH = `/api/tag/fetch`;

const tags = {};

class Tag {
  constructor(source) {
    this.id = source._id;
    this.activity = source.activity;
    this.locale = source.locale;
    this.name = source.name;
    this.syn_lowercase = source.syn_lowercase;
    this.synonyms = source.synonyms;
    this.type = source.type;
  }

  getDisplay() {
    // TODO l10n
    const lang = navigator.language.toLowerCase().replace("-", "-");
    return this.locale[lang] || this.locale["en"];
  }

  static get(id, source) {
    return new Promise(resolve => {
      let tag = tags[id];
      if (tag !== undefined) {
        resolve(tag);
        return;
      }

      tag = new Tag(source);
      tags[id] = tag;
      resolve(tag);
    });
  }
}

// class TagManager {
//   constructor() {
//     this.tags = {};
//   }

//   fetch(id) {
//     return new Promise(resolve => {
//       const tag = this.tags[id];
//       if (tag !== undefined) {
//         resolve(tag);
//         return;
//       }

//       fetch(URL_TAG_FETCH, {
//         method: "POST",
//         body: JSON.stringify({ _id: id })
//       })
//         .then(resp => resp.json())
//         .then(data => {
//           const tag = new Tag(data);
//           this.tags[id] = tag;
//           resolve(tag);
//         });
//     });
//   }

//   // fetchAll() {
//   //   return new Promise(resolve => {
//   //     fetch(URL_TAG_ALL)
//   //       .then(resp => resp.json())
//   //       .then(data => {
//   //         data.forEach(raw => {
//   //           this.tags.push(new Tag(raw));
//   //         });
//   //         resolve(this.tags);
//   //       });
//   //   });
//   // }
// }

// const manager = new TagManager();
// Tag.manager = manager;

// export { Tag };
export default Tag;
