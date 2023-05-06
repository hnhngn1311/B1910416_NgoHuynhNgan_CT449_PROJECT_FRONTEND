<template>
  <div class="d-flex flex-column mb-3 p-3 bg-light shadow-lg rounded">
    <h4 class="m-0">Quản lý học kỳ</h4>
    <hr />
  </div>
  <div class="d-flex flex-column bg-light p-3 shadow-lg rounded">
    <div class="d-flex gap-2">
      <select
        class="form-select form-select-md"
        v-model="typeSelected"
        name=""
        id=""
      >
        <option value="">Học kỳ</option>
        <option v-for="item in termYear" :value="item.id" :key="item.id">
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
        Thêm kỳ học
      </button>
    </div>
  </div>
  <div class="p-3 bg-light mt-3 shadow-lg rounded">
    <div
      class="d-flex h-50 justify-content-center align-items-end"
      v-if="terms.length === 0"
    >
      <div class="d-flex flex-column gap-2">
        <span>Không có kỳ học nào để hiển thị</span>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="setSelectedItem({})"
          data-bs-toggle="modal"
          data-bs-target="#modalCreate"
        >
          Thêm kỳ học
        </button>
      </div>
    </div>
    <div class="table-responsive sticky-top bg-light" v-else>
      <table class="table align-middle p-3">
        <thead class="sticky-top">
          <caption class="w-100 d-flex">
            Bảng học kỳ
          </caption>
          <tr>
            <th>Năm học</th>
            <th>Học kỳ</th>
            <th>Ngày bắt đầu</th>
            <th>{{ typeSelected }}</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr
            v-for="item in typeSelected == ''
              ? terms
              : terms.filter((e) => e.term == typeSelected)"
            :key="item._id"
          >
            <td scope="row">{{ item.schoolYear }}</td>
            <td>{{ item.term }}</td>
            <td>{{ moment(item.startDate) }}</td>
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
  <ModalRoom
    :item="itemSelected"
    :termYear="termYear"
    @refreshData="fetchData"
  />
</template>

<script>
import BaseAPI from "@/config/axios.js";
import ModalRoom from "@/views/admin/components/modals/TermModal.vue";
import moment from "moment";
export default {
  components: { ModalRoom },
  data() {
    return {
      terms: [],
      itemSelected: {},
      typeSelected: "",
      termYear: [
        { id: 1, name: "Học kỳ 1" },
        { id: 2, name: "Học kỳ 2" },
      ],
    };
  },
  methods: {
    moment(date) {
      return moment(new Date(date)).format("DD-MM-yyyy");
    },
    setSelectedItem(item) {
      this.itemSelected = { ...item };
    },
    fetchData() {
      BaseAPI.get("/term")
        .then(({ data }) => (this.terms = data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
