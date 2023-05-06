<template>
  <div class="wrapper">
    <div class="background"></div>
    <div class="p-4 sign-in rounded">
      <div class="m-2 d-flex justify-content-center">
        <img src="@/assets/logo.jpg" class="logo rounded-circle" alt="" />
      </div>
      <div class="d-flex flex-column gap-2 form-group">
        <div class="form-group">
          <label for="">MSSV</label>
          <input
            type="text"
            name=""
            id=""
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
            v-model="data.username"
          />
        </div>
        <div class="form-group">
          <label for="">Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            name=""
            id=""
            placeholder=""
            v-model="data.password"
          />
        </div>
        <button type="button" class="btn btn-primary mt-2" @click="sign_in">ĐĂNG NHẬP</button>
      </div>
    </div>
  </div>
</template>

<script>
import accountServices from '@/services/account.services.js'

export default {
  data() {
    return {
      data: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    sign_in() {
      accountServices.signIn(this.data)
    }
  }
}
</script>

<style scoped>
.wrapper {
  background-image: url('@/assets/package.jpg');
  display: flex;
  position: relative;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
}

.background {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.7;
}

.form-group {
  width: 400px;
}

.logo {
  width: 100px;
  height: 100px;
}

.wrapper .sign-in {
  background-color: white;
}
</style>
