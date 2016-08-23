<script>
  import Cookies from 'js-cookie';
  import SparkMD5 from 'spark-md5';
  export default {
    name: 'RinUser',
    data() {
      let user = {};
      let is_signined = false;

      const names = ['_id', 'emailHash', 'username'];
      for (const name of names) {
        user[name] = Cookies.get(`rin-user-${name}`);
      }

      if (!user._id) {
        user = {};
        is_signined = false;
      } else {
        this.$dispatch('UserSignInOK', user);
        is_signined = true;
      }

      return {
        user,
        is_signined,
      };
    },
    methods: {
      signin(username, password) {
        if (this.is_signined) {
          this.$dispatch('UserSignInFailed', '本地已经登录，请注销后重试');
          return;
        }

        if (!password) {
          this.$dispatch('UserSignInFailed', 'please input your passsword');
          return;
        }

        this.$http.post('/api/user/signin', {
          username,
          password: SparkMD5.hash(password),
        }).then((data) => {
          if (data.success) {
            this.user = data.user;

            const names = ['_id', 'emailHash', 'username'];
            for (const name of names) {
              Cookies.set(`rin-user-${name}`, this.user[name]);
            }

            this.is_signined = true;
            this.$dispatch('UserSignInOK', this.user);
          } else {
            this.user = {};
            this.is_signined = false;
            this.$dispatch('UserSignInFailed', data.message || 'login failed');
          }
        }, () => {
          this.user = {};
          this.is_signined = false;
          this.$dispatch('UserSignInFailed', 'network or remote server error');
        });
      },
      signout() {
        const names = ['_id', 'emailHash', 'username'];
        for (const name of names) {
          Cookies.remove(`rin-user-${name}`);
        }
        this.is_signined = false;
      },
    },
    events: {
      rinUserSignIn(form) {
        this.signin(form.username, form.password);
      },
      rinUserSignOut() {
        this.signout();
      },
    },
  };
</script>