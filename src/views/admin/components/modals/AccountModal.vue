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
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="removeAccount"
          >
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
        <form class="d-flex flex-column" @submit.prevent="editAccount">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col">
                <div class="mb-3">
                  <label for="" class="form-label">Tên tài khoản</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.username"
                    placeholder=""
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Chức vụ</label>
                  <select
                    class="form-select form-select-lg"
                    name=""
                    id=""
                    v-model="item.role"
                    required
                  >
                    <option v-for="item in roles" :value="item.name" :key="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Tên hiển thị</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.publicName"
                    placeholder=""
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="emailHelpId"
                    placeholder="abc@mail.com"
                    v-model="item.email"
                    required
                  />
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
                  <label for="" class="form-label">Tên tài khoản</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.username"
                    placeholder=""
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Chức vụ</label>
                  <select
                    class="form-select form-select-lg"
                    name=""
                    id=""
                    v-model="item.role"
                    required
                  >
                    <option v-for="item in roles" :value="item.name" :key="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Tên hiển thị</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.publicName"
                    placeholder=""
                    aria-describedby="helpId"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="emailHelpId"
                    placeholder="abc@mail.com"
                    v-model="item.email"
                    required
                  />
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
  props: ['item', 'roles'],
  emits: ['refreshData'],
  data() {
    return {
      titleConfirm: 'Xoá tài khoản',
      titleEdit: 'Chỉnh sửa tài khoản',
      titleCreate: 'Thêm tài khoản'
    }
  },
  methods: {
    removeAccount() {
      BaseAPI.delete('/accounts/' + this.item._id)
        .then(() => {
          toast('Xoá ' + this.item.username + ' thành công', {
            autoClose: 1000,
            position: 'bottom-right'
          })
          this.$emit('refreshData')
        })
        .catch((err) => console.log(err))
    },
    createRoom() {
      this.item.password = 'abc@123'
      BaseAPI.post('/accounts/register', this.item)
        .then((res) => {
          toast(`Thêm tài khoản ${this.item.username} thành công`, {
            autoClose: 1000,
            position: 'bottom-right'
          })
          this.$emit('refreshData')
        })
        .catch((err) =>
          toast(`Tài khoản ${this.item.username} đã tồn tại`, {
            autoClose: 1000,
            position: 'bottom-right'
          })
        )
    },
    editAccount() {
      BaseAPI.put(`/accounts/${this.item._id}`, this.item).then((res) => {
        toast(`Sửa thông tin tài khoản ${this.item.username} thành công`, {
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
