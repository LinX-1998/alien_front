<template>
  <div class="main">
    <div class="container">
      <h2 class="form-title"><span class="logo"></span>异星论坛</h2>
      <div class="form-group">
        <input type="text" class="form-control" v-model="username" name="name" id="name" placeholder="用户名" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="password"  name="pass" id="pass" placeholder="密码" />
      </div>
      <div class="form-btn">
        <button type="button" class="btn btn-info" @click="submit">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			username: "",
			password: "",
			submitted: false
		};
	},
	computed: {
	},
	created() {

	},
	methods: {
		submit() {
			this.$axios({
				method: 'post',
				url:'/login',
				data: JSON.stringify({
					username: this.username,
					password: this.password
				})
			}).then((res)=>{
				if (res.code == 1000) {
          localStorage.setItem("loginResult", JSON.stringify(res.data));
          this.$store.commit("login", res.data);
          this.loginSuccess('登录成功，您可以登录创作啦～')
          this.$router.push({path: this.redirect || '/' })
				} else {
          this.loginFailed('参数错误，请重新检查输入～')
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
    loginSuccess(msg) {
      this.$notify({
        type:'success',
        title: '登录成功',
        message: msg
      });
    },
    loginFailed(msg) {
      this.$notify.error({
        title: '登录失败',
        message: msg
      });
    }
	}
};
</script>
<style lang="less" scoped>
.main {
  padding: 200px 0;
  .container {
    width: 500px;
    background: #fff;
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    .form-title {
      margin-bottom: 25px;
      text-align: center;
    }
    .logo {
      height: 40px;
      background: url("../assets/images/logo.png") no-repeat;
      background-size: 40px 40px;
      background-position: left center;
      padding-left: 35px;
      line-height: 40px;
      flex-grow: 0;
      margin-right:10px;
    }
    .form-group {
      margin: 15px;
      label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700;
      }
      .form-control {
        display: block;
        width: 95%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }
    .form-btn {
      display: flex;
      justify-content: center;
      .btn {
        padding: 6px 20px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        border: 1px solid transparent;
      }
      .btn-info {
        color: #fff;
        background-color: #5bc0de;
        border-color: #46b8da;
      }
    }
  }
}
</style>