<script>
  

  export default {
	  data: {
      user: null
    },
    methods: {
      'signin' (username, password) {
        let self = this;
        return self.$http.post('/api/user/signin', {username: username, password: SparkMD5.hash(password)}, function(data) {
          if(data.success) {
            self.user = data.user;
            self.$dispatch('UserSignInOk', self.user);
          } else {
            self.user = {};
            self.$dispatch('UserSignInFailed', data.message);
          }
        })
      },
      'signout' () {
        let self = this;
        return self.$http.delete('/api/user/signout', null, function(data) {
          if(!data.success) {
            // TODO error handle
          }
          self.user = {};
          self.$dispatch('user_signouted');
        });
      }
    },
    events: {
      'rinUserSignIn' (form) {
        this.signin(form.username, form.password);
      }
    }
  };
</script>
