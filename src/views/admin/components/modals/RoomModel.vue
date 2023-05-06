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
        <div class="modal-body">Xác nhận xoá {{ item.name }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeRoom">
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
        <form class="d-flex flex-column" @submit.prevent="editRoom">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col">
                <div class="mb-3">
                  <label for="" class="form-label">Tên phòng</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.name"
                    placeholder=""
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Loại phòng</label>
                  <select
                    class="form-select form-select-lg"
                    name=""
                    id=""
                    v-model="item.type"
                    required
                  >
                    <option v-for="item in roomType" :value="item.name" :key="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Mô tả phòng </label>
                  <textarea
                    class="form-control"
                    name=""
                    id=""
                    rows="5"
                    v-model="item.desc"
                    required
                  ></textarea>
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
        <form class="d-flex flex-column" @submit.prevent="createRoom">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col">
                <div class="mb-3">
                  <label for="" class="form-label">Tên phòng</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.name"
                    placeholder=""
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Loại phòng</label>
                  <select
                    class="form-select form-select-lg"
                    name=""
                    id=""
                    v-model="item.type"
                    required
                  >
                    <option v-for="item in roomType" :value="item.name" :key="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Mô tả phòng</label>
                  <textarea
                    class="form-control"
                    name=""
                    id=""
                    rows="5"
                    v-model="item.desc"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button type="submit" class="btn btn-primary">Tạo</button>
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
  props: ['item', 'roomType'],
  emits: ['refreshData'],
  data() {
    return {
      titleConfirm: 'Xoá phòng',
      titleEdit: 'Chỉnh sửa phòng',
      titleCreate: 'Thêm phòng'
    }
  },
  methods: {
    removeRoom() {
      BaseAPI.delete('/rooms/' + this.item._id)
        .then(() => {
          toast('Xoá ' + this.item.name + ' thành công', {
            autoClose: 1000,
            position: 'bottom-right'
          })
          this.$emit('refreshData')
        })
        .catch((err) => console.log(err))
    },
    createRoom() {
      BaseAPI.post('/rooms', this.item)
        .then((res) => {
          toast(`Thêm phòng ${this.item.name} thành công`, {
            autoClose: 1000,
            position: 'bottom-right'
          })
          this.$emit('refreshData')
        })
        .catch((err) =>
          toast(`Phòng ${this.item.name} đã tồn tại`, {
            autoClose: 1000,
            position: 'bottom-right'
          })
        )
    },
    editRoom() {
      BaseAPI.put(`/rooms/${this.item._id}`, this.item).then((res) => {
        toast(`Sửa thông tin phòng ${this.item.name}`, {
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
