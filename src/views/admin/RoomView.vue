<template>
  <div class="d-flex flex-column mb-3 p-3 bg-light shadow-lg rounded">
    <h4 class="m-0">Quản lý đặt phòng</h4>
    <hr />
  </div>
  <div class="d-flex flex-column bg-light p-3 shadow-lg rounded">
    <div class="d-flex gap-2">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Nhập thông tin tìm kiếm"
          aria-label="Button"
          aria-describedby=""
        />
        <button class="btn btn-outline-secondary" type="button" id="">Tìm kiếm</button>
      </div>
      <select class="form-select form-select-md" v-model="typeSelected" name="" id="">
        <option value="">Loại phòng</option>
        <option v-for="item in roomType" :value="item.name" :key="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <hr />
    <div class="d-flex justify-content-start">
      <button
        type="button"
        class="btn btn-outline-success shadow-lg"
        data-bs-toggle="modal"
        data-bs-target="#modalCreate"
        @click="setSelectedItem({})"
      >
        Thêm phòng
      </button>
    </div>
  </div>
  <div class="p-3 bg-light mt-3 shadow-lg rounded">
    <div class="d-flex h-50 justify-content-center align-items-end" v-if="rooms.length === 0">
      <div class="d-flex flex-column gap-2">
        <span>Không có phòng nào để hiển thị</span>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="setSelectedItem({})"
          data-bs-toggle="modal"
          data-bs-target="#modalCreate"
        >
          Thêm phòng
        </button>
      </div>
    </div>
    <div class="table-responsive sticky-top bg-light" v-else>
      <table class="table align-middle p-3">
        <thead class="sticky-top">
          <caption class="w-100 d-flex">
            Bảng phòng
          </caption>
          <tr>
            <th>Tên Phòng</th>
            <th>Loại phòng</th>
            <th>Mô tả</th>
            <th>{{ typeSelected }}</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="item in rooms" :key="item._id">
            <td scope="row">{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.desc }}</td>
            <td>
              <div class="dropdown open d-flex justify-content-end">
                <button
                  type="button"
                  class="btn"
                  id="triggerId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  @click="setSelectedItem(item)"
                >
                  <img src="@/assets/gear.svg" class="img-fluid" alt="" />
                </button>
                <div class="dropdown-menu" aria-labelledby="triggerId">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#modalConfirm"
                    class="dropdown-item"
                    href="#"
                  >
                    Xoá
                  </button>
                  <button
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEdit"
                    href="#"
                    @click="setSelectedItem(item)"
                  >
                    Sửa
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </div>
  <ModalRoom :item="itemSelected" :roomType="roomType" @refreshData="fetchData" />
</template>

<script>
import BaseAPI from '@/config/axios.js'
import ModalRoom from '@/views/admin/components/modals/RoomModel.vue'
export default {
  components: { ModalRoom },
  data() {
    return {
      rooms: [],
      itemSelected: {},
      typeSelected: '',
      roomType: [
        { id: 1, name: 'Lý thuyết' },
        { id: 2, name: 'Lab' },
        { id: 3, name: 'Hội trường' }
      ]
    }
  },
  methods: {
    moment(date) {
      return moment(new Date(date)).format('DD-MM-yyyy')
    },
    setSelectedItem(item) {
      this.itemSelected = { ...item }
    },
    fetchData() {
      BaseAPI.get('/rooms')
        .then(({ data }) => (this.rooms = data))
        .catch((err) => console.log(err))
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped></style>
