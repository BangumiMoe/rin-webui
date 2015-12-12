<script>
  export default {
	  data () {
      let user = {};
      
      for(var name of ['_id', 'emailHash', 'username']) {
        user[name] = Cookies.get('rin-user-' + name);
      }
      
      if(!user._id) {
        user = {}
      } else {
        this.$dispatch('UserSignInOk', user);
      }

      return {
        user: user
      }
    },
    methods: {
      'signin' (username, password) {
        let self = this;
        return self.$http.post('/api/user/signin', {username: username, password: SparkMD5.hash(password)}, function(data) {
          if(data.success) {
            self.user = data.user;
            
            for(var name of ['_id', 'emailHash', 'username']) {
              let value = self.user[name];
              Cookies.set('rin-user-' + name, value);
            }
            
            self.$dispatch('UserSignInOk', self.user);
          } else {
            self.user = {};
            self.$dispatch('UserSignInFailed', data.message);
          }
        })
      },
      'signout' () {
        /* let self = this;
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
