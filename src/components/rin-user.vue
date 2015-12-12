<script>
  export default {
	  data: {
      user: null
    },
    methods: {
      'signin' (username, password) {
        console.log(this);
        return self.$http.post('/api/user/signin', {username: username, password: SparkMD5.hash(password)}, function(data) {
          if(data.success) {
            self.user = data.user;
          } else {
            self.user = {};
            // TODO error handle
          }
          
          console.log(self.user);
          self.$dispatch('user_sigined', data);
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
      'rinSingIn' (ev, form) {
        console.log('seconday #2');
        this.signin(form.username, form.password);
      }
    }
  };
</script>
