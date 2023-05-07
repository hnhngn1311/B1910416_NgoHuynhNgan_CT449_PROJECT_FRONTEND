<template>
  <div class="sidebar">
    <div class="d-flex flex-column p-3 text-white bg-dark" style="width: 280px">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none gap-2"
      >
        <img src="@/assets/logo.jpg" width="50" class="img-fluid rounded" alt="" />
        <h4 class="m-0">Booking Room</h4>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="mb-1">
          <button
            class="btn border-bottom d-flex align-items-left rounded text-light w-100 mb-2"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="true"
          >
            Bảng điều khiển
          </button>
          <div class="collapse ml-3 show" id="dashboard-collapse" style="">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <RouterLink class="p-2 px-4 rounded" to="/adminstrator/">Tổng quan</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn border-bottom d-flex align-items-left rounded text-light w-100 mb-2"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="true"
          >
            Quản lý
          </button>
          <div class="collapse ml-3 show" id="home-collapse" style="">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <RouterLink class="p-2 px-4 rounded" to="/adminstrator/booking_room"
                  >Đặt phòng</RouterLink
                >
              </li>
              <li>
                <RouterLink class="p-2 px-4 rounded" to="/adminstrator/rooms">Phòng học</RouterLink>
              </li>
              <li>
                <RouterLink class="p-2 px-4 rounded" to="/adminstrator/term">Kỳ học</RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <hr />
      <div class="d-flex">
        <button type="button" class="btn w-100 btn-outline-danger" @click="logOut">Đăng xuất</button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  methods: {
    logOut(){
      localStorage.removeItem('user');
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.router-link-exact-active {
  display: flex;
  color: white;
  background-color: rgb(0, 164, 237);
  justify-content: end;
}

.router-link-active {
  display: flex;
  color: white;
  justify-content: start;
}

.sidebar {
  display: flex;
  height: 100vh;
}
</style>
