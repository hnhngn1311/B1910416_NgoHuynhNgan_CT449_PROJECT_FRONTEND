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
    <div class="modal-dialog modal-fullscreen" role="document">
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
            <FormBookingComponent />
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
    <div class="modal-dialog modal-fullscreen" role="document">
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
            <FormBookingComponent />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify'
import FormBookingComponent from '../../../../components/FormBookingComponent.vue'
import BaseAPI from '../../../../config/axios.js'

export default {
  components: { FormBookingComponent },
  props: ['item', 'status'],
  emits: ['refreshData'],
  data() {
    return {
      titleConfirm: 'Xoá lịch đặt phòng',
      titleEdit: 'Chỉnh sửa thông tin đặt phòng',
      titleCreate: 'Thêm lịch đặt phòng',
      rooms: []
    }
  },
  methods: {
    removeRoom() {
      BaseAPI.delete('/booking_room/' + this.item._id)
        .then(() => {
          toast('Xoá ' + this.item.name + ' thành công', {
            autoClose: 1000,
            position: 'bottom-right'
          })
          this.$emit('refreshData')
        })
        .catch((err) => console.log(err))
    },
    editRoom() {
      BaseAPI.put(`/booking_room/${this.item._id}`, this.item).then((res) => {
        toast(`Sửa thông tin phòng ${this.item.name}`, {
          autoClose: 1000,
          position: 'bottom-right'
        })
        this.$emit('refreshData')
      })
    }
  },
  mounted() {
    BaseAPI.get('/booking_room/get-rooms')
      .then((res) => (this.rooms = res.data))
      .catch((err) => console.log(err))
  }
}
</script>

<style scoped></style>
