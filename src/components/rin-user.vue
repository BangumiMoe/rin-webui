<script>
export default {
  data () {
    let user = {};
    let is_signined = false;
    
    for(var name of ['_id', 'emailHash', 'username']) {
      user[name] = Cookies.get('rin-user-' + name);
    }
    
    if(!user._id) {
      user = {}
      is_signined = false;
    } else {
      this.$dispatch('UserSignInOK', user);
      is_signined = true;
    }

    return {
      user: user,
      is_signined: is_signined
    }
  },
  methods: {
    signin (username, password) {
      let self = this;
      
      if(self.is_signined) {
        self.$dispatch('UserSignInFailed', '本地已经登录，请注销后重试');
        return;
      }
      
      return self.$http.post('/api/user/signin', {username: username, password: SparkMD5.hash(password)}, function(data) {
        if(data.success) {
          self.user = data.user;
          
          for(var name of ['_id', 'emailHash', 'username']) {
            let value = self.user[name];
            Cookies.set('rin-user-' + name, value);
          }
          
          self.is_signined = true;
          self.$dispatch('UserSignInOK', self.user);
        } else {
          self.user = {};
          self.is_signined = false;
          self.$dispatch('UserSignInFailed', data.message);
        }
      }, {
        xhr: {
          onerror () {
            self.user = {};
            self.is_signined = false;
            self.$dispatch('UserSignInFailed', 'network or remote server error');
          }
        }
      })
    },
    signout () {
      let self = this;
      /* 
      return self.$http.delete('/api/user/signout', null, function(data) {
        if(!data.success) {
          // TODO error handle
        }
        self.user = {};
        self.$dispatch('user_signouted');
      });*/
      for(var name of ['_id', 'emailHash', 'username']) {
        Cookies.remove('rin-user-' + name);
      }
      
      self.is_signined = false;
    }
  },
  events: {
    'rinUserSignIn' (form) {
      this.signin(form.username, form.password);
    },
    'rinUserSignOut' () {
      this.signout();
    }
  }
};
</script>