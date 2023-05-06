<template>
  <CalendarComponent ref="calendar" />
</template>

<script>
import moment from "moment";
import { toast } from "vue3-toastify";
import CalendarComponent from "../../components/CalendarComponent.vue";
import BaseAPI from "../../config/axios.js";
export default {
  components: { CalendarComponent, CalendarComponent },
  data() {
    return {
      history: [],
      listBookings: [],
      histories: [],
      booking: 0,
      booked: 0,
      rooms: 0,
      users: 0,
    };
  },
  methods: {
    moment,
    acceptBooking(item) {
      var new_item = item;
      new_item.status = "Đã đặt";
      new_item.updatedAt = new Date();
      BaseAPI.put("/booking_room/" + item._id, new_item).then(() => {
        toast(`Đã chấp nhận tài khoản ${item.account} đặt phòng ${item.room}`, {
          autoClose: 1000,
        });
        this.fetchData();
      });
    },
    deniedBookingRoom(item) {
      var new_item = item;
      new_item.status = "Đã từ chối";
      new_item.updatedAt = new Date();
      BaseAPI.put("/booking_room/" + item._id, new_item).then(() => {
        toast(`Đã từ chối  tài khoản ${item.account} đặt phòng ${item.room}`, {
          autoClose: 1000,
        });
        this.fetchData();
      });
    },
    fetchData() {
      this.$refs.calendar.getRoomBooked();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.header .col,
.col-2 {
  font-weight: bold;
}
</style>
