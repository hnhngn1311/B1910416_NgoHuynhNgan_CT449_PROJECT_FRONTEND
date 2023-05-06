<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-light p-4 rounded shadow-lg">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <div class="d-flex gap-4 bg-light p-2">
              <div class="mb-3" style="width: 250px">
                <div class="fw-bold">Năm học</div>
                <div class="d-flex align-items-center gap-3">
                  <input
                    type="number"
                    class="form-control"
                    name=""
                    id=""
                    @change="setTerm(startYear)"
                    aria-describedby="helpId"
                    placeholder=""
                    v-model="startYear"
                    :min="minYear"
                    :max="maxYear"
                  />
                  -
                  <input
                    type="number"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="helpId"
                    placeholder=""
                    :value="startYear + 1"
                    disabled
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="fw-bold">Kỳ học</div>
                <select
                  class="form-select form-select-lg"
                  v-model="termSelect"
                  @change="setWeekOfTerm(termSelect)"
                  name=""
                  id=""
                >
                  <option value="" selected>Học kỳ</option>
                  <option
                    v-for="item in termYear"
                    :value="item.startDate"
                    :key="item.term"
                    :disabled="!startYear"
                  >
                    Kỳ {{ item.term }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <div class="fw-bold">Tuần học</div>
                <select
                  class="form-select form-select-lg"
                  :value="weekSelected"
                  v-model="weekSelected"
                  :disabled="termSelect == null"
                  @change="getDateWeeks(weekSelected)"
                  name=""
                  id=""
                >
                  <option
                    v-for="item in weeks"
                    :value="item.firstDay"
                    :key="item.id"
                  >
                    Tuần {{ item.id }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <div class="fw-bold">Phòng</div>
                <select
                  class="form-select form-select-lg"
                  name=""
                  v-model="selectedTypeRoom"
                  id=""
                >
                  <option selected value="">Tất cả</option>
                  <option
                    v-for="item in typesRoom"
                    :value="item.type"
                    :key="item.id"
                  >
                    {{ item.type }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex flex-column gap-1">
            <div class="fw-bold">Phòng</div>
            <div class="d-flex flex-wrap gap-1">
              <button
                type="button"
                v-for="i in selectedTypeRoom == ''
                  ? rooms
                  : rooms.filter((e) => e.type === selectedTypeRoom)"
                :key="i._id"
                class="btn btn-outline-secondary"
                :class="{
                  'btn-success text-light': bookingData.room === i.name,
                }"
                @click="bookingData.room = i.name"
              >
                {{ i.name }} - {{ i.type }}
              </button>
            </div>
          </div>
          <hr />
          <div class="d-flex flex-column gap-1">
            <div class="fw-bold">Ngày bắt đầu</div>
            <div class="d-flex gap-1">
              <button
                type="button"
                v-for="item in daysInWeek"
                :key="item.id"
                class="btn btn-outline-secondary"
                :class="{
                  'btn-success text-light':
                    moment(item.date).format('yyyy-MM-DD') ===
                    moment(bookingData.startDate).format('yyyy-MM-DD'),
                }"
                @click="
                  bookingData.startDate = moment(item.date)
                    .set('hours', 0)
                    .set('minute', 0)
                "
                :disabled="bookingData.room == null"
              >
                {{ item.name }} - {{ moment(item.date).format("DD/MM/yyyy") }}
              </button>
            </div>
          </div>
          <hr />
          <div class="d-flex flex-column gap-1">
            <div class="fw-bold">Tiết bắt đầu</div>
            <div class="d-flex gap-1">
              <button
                v-for="item in lesson"
                type="button"
                class="btn"
                :class="{ 'btn-outline-success': startLesson === item.start }"
                :key="item._id"
                @click="setStartDate(item.start)"
                :disabled="
                  moment(item.start, 'HH:mm') >= moment(endLesson, 'HH:mm') ||
                  bookingData.startDate == null
                "
              >
                {{ item.start }} - Tiết {{ item._id }}
              </button>
            </div>
            <hr />
            <div class="fw-bold">Tiết kết thúc</div>
            <div class="d-flex gap-1">
              <button
                v-for="item in lesson"
                type="button"
                class="btn"
                :class="{ 'btn-outline-success': endLesson === item.end }"
                :disabled="
                  moment(item.end, 'HH:mm') <= moment(startLesson, 'HH:mm') ||
                  startLesson == null
                "
                :key="item._id"
                @click="setEndDate(item.end)"
              >
                {{ item.end }} - Tiết {{ item._id }}
              </button>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between mx-4 mt-4">
            <div class="mb-3">
              <label for="" class="form-label fw-bold">Nội dung </label>
              <textarea
                class="form-control"
                name=""
                id=""
                v-model="bookingData.desc"
                cols="100"
                rows="4"
                :disabled="endLesson == null"
              ></textarea>
            </div>
          </div>
          <div class="d-flex justify-content-between mx-4 mt-4">
            <div class="d-flex fw-bold"></div>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="handleBooking"
            >
              Đặt phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { toast } from "vue3-toastify";
import BaseAPI from "../config/axios.js";
export default {
  emits: ["refreshData"],
  data() {
    return {
      rooms: [],
      daysInWeek: [],
      weekSelected: moment(),
      termSelect: null,
      startYear: null,
      termYear: [],
      rooms: [],
      weeks: [],
      histories: [],
      booking_rooms: [],
      selectedTypeRoom: "",
      minYear: null,
      maxYear: null,
      typesRoom: [
        { id: 1, type: "Lý thuyết" },
        { id: 2, type: "Lab" },
        { id: 3, type: "Hội trường" },
      ],
      dateSelected: null,
      startLesson: null,
      endLesson: null,
      bookingData: {
        room: null,
        startDate: null,
        endDate: null,
        desc: null,
        status: "Đã đặt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      lesson: [
        { _id: "1", start: "07:00", end: "07:50" },
        { _id: "2", start: "07:50", end: "08:40" },
        { _id: "3", start: "08:50", end: "09:40" },
        { _id: "4", start: "09:50", end: "10:40" },
        { _id: "5", start: "10:40", end: "11:30" },
        { _id: "6", start: "13:30", end: "14:20" },
        { _id: "7", start: "14:20", end: "15:10" },
        { _id: "8", start: "15:20", end: "16:10" },
        { _id: "9", start: "16:10", end: "17:00" },
        { _id: "10", start: "17:20", end: "18:10" },
        { _id: "11", start: "18:20", end: "19:10" },
        { _id: "12", start: "19:10", end: "20:00" },
      ],
    };
  },
  methods: {
    moment,
    checkBooked(room, date) {
      var bookedRoom = [];
      if (this.booking_rooms && room) {
        bookedRoom = this.booking_rooms.filter(
          (e) =>
            e.room === room &&
            moment(e.startDate).format("yyyy-MM-DD") ===
              moment(date).format("yyyy-MM-DD")
        );
      }
      return bookedRoom;
    },
    setStartDate(date) {
      this.startLesson = date;
      var newDate = moment(new Date(this.bookingData.startDate))
        .set("hour", moment(this.startLesson, "HH:mm").get("hour"))
        .set("minute", moment(this.startLesson, "HH:mm").get("minute"))
        .format("yyyy-MM-DD HH:mm");
      this.bookingData.startDate = newDate;
    },
    setEndDate(date) {
      this.endLesson = date;
      var newDate = moment(new Date(this.bookingData.startDate))
        .set("hour", moment(this.endLesson, "HH:mm").get("hour"))
        .set("minute", moment(this.endLesson, "HH:mm").get("minute"))
        .format("yyyy-MM-DD HH:mm");
      this.bookingData.endDate = newDate;
    },
    getDateWeeks(date) {
      var now = moment(date);
      this.daysInWeek = [];
      this.daysInWeek.push({
        id: 1,
        name: "Thứ 2",
        date: now.clone().weekday(1),
      });
      this.daysInWeek.push({
        id: 2,
        name: "Thứ 3",
        date: now.clone().weekday(2),
      });
      this.daysInWeek.push({
        id: 3,
        name: "Thứ 4",
        date: now.clone().weekday(3),
      });
      this.daysInWeek.push({
        id: 4,
        name: "Thứ 5",
        date: now.clone().weekday(4),
      });
      this.daysInWeek.push({
        id: 5,
        name: "Thứ 6",
        date: now.clone().weekday(5),
      });
      this.daysInWeek.push({
        id: 6,
        name: "Thứ 7",
        date: now.clone().weekday(6),
      });
      this.daysInWeek.push({
        id: 7,
        name: "Chủ nhật",
        date: now.clone().weekday(7),
      });
      this.getRoomBooked();
    },
    getRoomBooked() {
      const obj = {};
      obj.startDate = moment(this.daysInWeek[0].date).format(
        "yyyy-MM-DD 00:00"
      );
      obj.endDate = moment(this.daysInWeek[6].date).format("yyyy-MM-DD 24:00");
      this.booking_rooms = [];
      BaseAPI.post("/booking_room/get-rooms", obj).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          this.booking_rooms.push(element);
        }
      });
    },
    setTerm(year) {
      const temp = this.terms.filter(
        (e) => new Date(e.startDate).getFullYear() === year
      );
      this.termYear = [];
      for (let i = 0; i < temp.length; i++) {
        const element = temp[i];
        this.termYear.push({
          term: element.term,
          startDate: moment(element.startDate).format("yyyy-MM-DD"),
        });
      }
      this.termYear.sort((a, b) => (a.term > b.term ? 1 : -1));
    },
    setWeekOfTerm(date) {
      this.weeks = [];
      var temp = moment(date);
      for (let i = 0; i < 20; i++) {
        var week = i + 1;
        this.weeks.push({
          id: week,
          firstDay: temp
            .add(i > 0 ? 1 : 0, "week")
            .clone()
            .weekday(1)
            .format("yyyy-MM-DD"),
        });
      }
    },
    handleBooking() {
      this.bookingData.startDate = moment(
        this.bookingData.startDate,
        "yyyy-MM-DD HH:mm"
      );
      this.bookingData.endDate = moment(
        this.bookingData.endDate,
        "yyyy-MM-DD HH:mm"
      );
      BaseAPI.post("/booking_room", this.bookingData)
        .then(({ status }) => {
          status === 201 &&
            toast("Đặt phòng thành công", {
              autoClose: 1000,
            });
          this.$emit("refeshData");
        })
        .catch(({ response }) => {
          if (response) {
            response.status === 409 &&
              toast("Đã đặt phòng", {
                autoClose: 1000,
                position: "bottom-right",
              });
          }
        });
    },
    fetchData() {
      this.rooms = [];
      BaseAPI.get("/rooms").then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          this.rooms.push(element);
        }
      });
      BaseAPI.get("/term").then((res) => {
        var startYear = [];
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          startYear.push(new Date(element.startDate).getFullYear());
        }
        this.terms = res.data;
        this.startYear = Math.max(...startYear);
        this.setTerm(Math.max(...startYear));
        this.maxYear = Math.max(...startYear);
        this.minYear = Math.min(...startYear);
      });
    },
  },
  mounted() {
    this.setWeekOfTerm(this.weekSelected);
    this.getDateWeeks(this.weekSelected);
    this.getRoomBooked();
    this.fetchData();
  },
};
</script>

<style scoped></style>
