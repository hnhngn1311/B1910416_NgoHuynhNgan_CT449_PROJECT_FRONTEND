<template>
  <div
    class="modal fade"
    id="modalConfirm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm modal-center" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitleId">{{ titleConfirm }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Xác nhận xoá Học kỳ {{ item.term }} - Năm học {{ item.schoolYear }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeTerm">
            Xoá
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="modalEdit"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ titleEdit }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form class="d-flex flex-column" @submit.prevent="editTerm">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col">
                <label for="" class="form-label">Năm học</label>
                <div class="d-flex align-items-center gap-5 mb-3">
                  <input
                    type="number"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="helpId"
                    placeholder=""
                    v-model="startYear"
                  />
                  -
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="helpId"
                    placeholder=""
                    :value="startYear + 1"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Học kỳ</label>
                  <select
                    class="form-select form-select-lg"
                    name=""
                    id=""
                    v-model="item.term"
                    required
                  >
                    <option value="" selected>Chọn học kỳ</option>
                    <option v-for="item in termYear" :value="item.id" :key="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Ngày bắt đầu học kỳ</label>
                  <VueDatePicker
                    v-model="date"
                    format="dd/MM/yyyy"
                    :default-time="{ hours: 0, minutes: 0 }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button type="submit" class="btn btn-primary">Sửa</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="modalCreate"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ titleCreate }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form class="d-flex flex-column" @submit.prevent="createTerm">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col">
                <label for="" class="form-label">Năm học</label>
                <div class="d-flex align-items-center gap-5 mb-3">
                  <input
                    type="number"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="helpId"
                    placeholder=""
                    v-model="startYear"
                    required
                  />
                  -
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="helpId"
                    placeholder=""
                    :value="startYear + 1"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Học kỳ</label>
                  <select
                    class="form-select form-select-lg"
                    name=""
                    id=""
                    v-model="item.term"
                    required
                  >
                    <option value="" selected>Chọn học kỳ</option>
                    <option v-for="item in termYear" :value="item.id" :key="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Ngày bắt đầu học kỳ</label>
                  <VueDatePicker
                    v-model="date"
                    format="dd/MM/yyyy"
                    :default-time="{ hours: 0, minutes: 0 }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button type="submit" class="btn btn-primary">Thêm kỳ học</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify'
import BaseAPI from '../../../../config/axios.js'

export default {
  props: ['item', 'termYear'],
  emits: ['refreshData'],
  data() {
    return {
      titleConfirm: 'Xoá kỳ học',
      titleEdit: 'Chỉnh sửa kỳ học',
      titleCreate: 'Thêm kỳ học',
      startYear: 2023,
      endYear: this.startYear + 1,
      date: new Date().setHours(0, 0, 0, 0)
    }
  },
  methods: {
    setEndYear() {},
    removeTerm() {
      BaseAPI.delete('/term/' + this.item._id)
        .then(() => {
          toast(`Xóa Học kỳ ${this.item.term} -  Năm học ${this.item.schoolYear}`, {
            autoClose: 1000,
            position: 'bottom-right'
          })
          this.$emit('refreshData')
        })
        .catch((err) => console.log(err))
    },
    createTerm() {
      this.item.schoolYear = `${this.startYear}-${this.startYear + 1}`
      this.item.startDate = this.date
      BaseAPI.post('/term', this.item)
        .then((res) => {
          toast(`Thêm Học kỳ ${this.item.term} -  Năm học ${this.item.schoolYear} thành công`, {
            autoClose: 1000,
            position: 'bottom-right'
          })
          this.$emit('refreshData')
        })
        .catch((err) =>
          toast(`Học kỳ ${this.item.term} -  Năm học ${this.item.schoolYear} đã tồn tại`, {
            autoClose: 1000,
            position: 'bottom-right'
          })
        )
    },
    editTerm() {
      this.item.schoolYear = `${this.startYear}-${this.startYear + 1}`
      this.item.startDate = this.date
      BaseAPI.put(`/term/${this.item._id}`, this.item).then((res) => {
        toast(`Sửa thông tin Học kỳ ${this.item.term} -  Năm học ${this.item.schoolYear}`, {
          autoClose: 1000,
          position: 'bottom-right'
        })
        this.$emit('refreshData')
      })
    }
  }
}
</script>

<style scoped></style>
