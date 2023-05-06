<template>
  <div class="container-fluid">
    <div class="row gap-2">
      <div class="col-2 rounded shadow-lg bg-light p-2">
        <div class="d-flex flex-column bg-light p-2">
          <div class="mb-3">
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
              :value="termSelect"
              v-model="termSelect"
              :disabled="startYear == null"
              @change="setWeekOfTerm(termSelect)"
              name=""
              id=""
            >
              <option
                v-for="item in termYear"
                :value="item.startDate"
                :key="item.term"
              >
                Kỳ {{ item.term }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <div class="fw-bold">Tuần học</div>
            <select
              class="form-select form-select-lg"
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
              v-model="typesRoomSelected"
              :disabled="weekSelected == null"
              name=""
              id=""
            >
              <option selected value="">Chọn phòng</option>
              <option
                v-for="item in typesRoom"
                :value="item.type"
                :key="item._id"
              >
                {{ item.type }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col rounded shadow-lg bg-light p-3">
        <div class="calendar w-100">
          <div class="table-responsive w-100">
            <table class="table table-striped table-hover align-middle">
              <thead class="table-light fw-bold">
                <caption style="width: 120px">
                  Lịch học
                </caption>
                <tr>
                  <th class="fw-bold"></th>
                  <th class="fw-bold" v-for="item in daysInWeek" :key="item.id">
                    {{ item.name }}
                  </th>
                </tr>
                <tr>
                  <th class="fw-bold">Phòng học</th>
                  <th v-for="item in daysInWeek" :key="item.id">
                    {{ moment(item.date).format("DD/MM/yyyy") }}
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr
                  v-for="item in typesRoomSelected === ''
                    ? rooms
                    : rooms.filter((e) => e.type === typesRoomSelected)"
                  :key="item._id"
                >
                  <td class="fw-bold">{{ item.name }} - {{ item.type }}</td>
                  <td
                    style="vertical-align: top"
                    v-for="i in daysInWeek"
                    :key="i.id"
                  >
                    <div
                      class="bg-success p-1 rounded"
                      v-if="checkBooked(item.name, i.date).length > 0"
                    >
                      <div class="fw-bolder text-light">
                        {{ i.name }} <br />
                        {{ moment(i.date).format("DD/MM/yyyy") }}
                        <div
                          v-for="(item, i) in checkBooked(item.name, i.date)"
                          :key="item._id"
                        >
                          <div class="d-flex flex-column" v-if="i == 0">
                            <span class="fw-bold">
                              {{ item.account }} ({{
                                moment(item.startDate).format("hh:mm")
                              }}
                              - {{ moment(item.endDate).format("hh:mm") }}):
                            </span>
                            <p class="m-0">{{ item.desc }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BaseAPI from "../config/axios.js";
export default {
  data() {
    return {
      rooms: [],
      daysInWeek: [],
      weekSelected: moment(),
      termSelect: 1,
      startYear: null,
      termYear: [],
      rooms: [],
      weeks: [],
      histories: [],
      booking_rooms: [],
      selectedTypeRoom: "",
      minYear: null,
      maxYear: null,
      typesRoomSelected: "",
      typesRoom: [
        { id: 1, type: "Lý thuyết" },
        { id: 2, type: "Lab" },
        { id: 3, type: "Hội trường" },
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
      console.log(this.startYear);
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
    fetchData() {
      BaseAPI.get("/rooms").then((res) => (this.rooms = res.data));
      BaseAPI.get("/term").then((res) => {
        var startYear = [];
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          startYear.push(new Date(element.startDate).getFullYear());
        }
        this.terms = res.data;
        this.setTerm(Math.max(...startYear));
        this.maxYear = Math.max(...startYear);
        this.minYear = Math.min(...startYear);
        this.startYear = this.maxYear;
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

<style scoped>
.calendar {
  display: flex;
}
</style>
