<style src="./less/colors.less"></style>
<style src="./less/framework.less"></style>
<style src="./less/app.less"></style>

<template>
  <div id="app" class="rin-row">
    <router-view></router-view>

    <nav-toolbar></nav-toolbar>
    <nav-logo></nav-logo>
    <rin-modal></rin-modal>
    <rin-user></rin-user>
    <modal-signin></modal-signin>
  </div>
</template>

<script>
import Vue from 'vue';

Vue.filter('locale', function(value) {
    if (!value) {
        return value;
    }
    // method 1
    if (value.locale) {
        let text = value.locale[this.$root.lang];
        // if(!text) text = value.locale[this.$root.lang_default];
        if (!text) text = value.name; //再找不到的话就取默认值，16/01/24  @zzetao
        return text;

    }
    if ((typeof value) == 'string') {
        let locale = this.$root.locales[this.$root.lang];
        if (locale) {
            let text = locale[value];
            if (!text) text = value;
            return text;
        }
    }

    return value;
});

export default {
    data() {
        return {
            displaySigninForm: false,
            locales: {},
            lang: 'en',
            lang_default: 'en'
        };
    },
    components: {
        'nav-toolbar': require('./components/nav-toolbar'),
        'nav-logo': require('./components/nav-logo'),
        'rin-modal': require('./components/rin-modal'),
        'rin-user': require('./components/rin-user'),
        'modal-signin': require('./components/modal-signin'),
    },
    methods: {
        updateLocales(lng) {
            let self = this;
            // TODO busy controller
            try {
                self.locales[lng] = require('./i18n/' + lng + '.json');
                self.lang = lng;

                // site title update
                document.title = self.locales[lng]['番組、萌え'];
                Cookies.set('locale', lng);

                self.$broadcast('LangChanged', lng);
            }
            catch (err) {
                //console.log('opps', err);
                self.$broadcast('LangChangedFail', lng);
            }
        }
    },
    events: {
        "open-modal": function(opt) {
            this.$broadcast("open-modal", opt);
        },
        "open-modal-blur": function() {
            this.$broadcast("open-modal-blur");
        },
        "close-modal-blur": function() {
            this.$broadcast("close-modal-blur");
            if (this.displaySigninForm) {
                this.displaySigninForm = false;
            }
        },

        // display sign in form modal
        'displaySigninForm' () {
            if (this.displaySigninForm) {
                return;
            }
            this.displaySigninForm = true;
            this.$dispatch("open-modal", {
                modalId: 'modal-signin'
            });
        },

        'UserSignIn' (form) {
            this.$broadcast('rinUserSignIn', form);
        },
        'UserSignInOK' (user) {
            this.$broadcast('UserSignInOK', user);
            if (this.displaySigninForm) {
                this.displaySigninForm = false;
                this.$broadcast("close-modal");
            }
        },
        'UserSignInFailed' (...args) {
            this.$broadcast('UserSignInFailed', ...args);
        },
        'UserSignOut' () {
            this.$broadcast('rinUserSignOut');
            this.$broadcast('UserSignOutOK');
        },

        'changeLang' (lng) {
            this.updateLocales(lng);
        },
    },
    ready() {
        this.lang = Cookies.get('locale');
        if (!this.lang) {
            let languageList = ["zh_tw", "zh_cn", "en"];
            // 获取浏览器语言
            let getLanguage = (navigator.language || navigator.browserLanguage).toLowerCase();

            if (getLanguage) {
                getLanguage = getLanguage.replace(/^en(-.+)/, "en").replace("-", "_");
                if (languageList.indexOf(getLanguage) >= 0) {
                    this.lang = getLanguage;
                }
                else {
                    this.lang = 'zh_tw';
                }
            }
            else {
                // 获取不到浏览器语言，给予默认值
                this.lang = 'zh_tw';
            }

        }
        this.updateLocales(this.lang);
    }
};
</script>
