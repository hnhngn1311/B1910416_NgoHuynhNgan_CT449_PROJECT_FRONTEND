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
          v-model="searchString"
        />
      </div>
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
        Đặt phòng
      </button>
    </div>
  </div>
  <div class="p-3 bg-light mt-3 shadow-lg rounded">
    <div
      class="d-flex h-50 justify-content-center align-items-end"
      v-if="booking_room.length === 0"
    >
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
            Bảng đặt phòng
          </caption>
          <tr>
            <th>Phòng học</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Nội dung đặt phòng</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr
            v-for="item in searchString == ''
              ? booking_room
              : booking_room.filter((e) =>
                  e.room
                    .toString()
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
                )"
            :key="item._id"
          >
            <td>{{ item.room }}</td>
            <td>{{ moment(item.startDate) }}</td>
            <td>{{ moment(item.endDate) }}</td>
            <td>{{ item.desc }}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </div>
  <ModalRoom :item="itemSelected" :status="status" @refreshData="fetchData" />
</template>
<script>
import BaseAPI from "@/config/axios.js";
import ModalRoom from "@/views/admin/components/modals/BookingRoomModal.vue";
import moment from "moment";
export default {
  components: { ModalRoom },
  data() {
    return {
      booking_room: [],
      itemSelected: {},
      searchString: "",
      status: [
        { id: 1, name: "Đang xử lý" },
        { id: 2, name: "Đã đặt" },
        { id: 3, name: "Đã từ chối" },
      ],
    };
  },
  methods: {
    moment(date) {
      return moment(new Date(date)).format("DD-MM-yyyy HH:mm");
    },
    setSelectedItem(item) {
      this.itemSelected = { ...item };
    },
    fetchData() {
      BaseAPI.get("/booking_room")
        .then(({ data }) => {
          this.booking_room = data;
          console.log(JSON.stringify(this.booking_room, 0, 2));
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
