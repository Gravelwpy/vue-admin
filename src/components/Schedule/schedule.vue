<template>
  <div class="schedule">
    <div v-if="classlist != null" class="classschedule">
      <div class="classgrid">
        <van-grid square :column-num="8">
          <van-grid-item text="" />
          <van-grid-item text="周一" />
          <van-grid-item text="周二" />
          <van-grid-item text="周三" />
          <van-grid-item text="周四" />
          <van-grid-item text="周五" />
          <van-grid-item text="周六" />
          <van-grid-item text="周日" />
        </van-grid>

        <van-row type="flex" justify="space-between">
          <van-col span="3">
            <div class="schedule_class_card_number">
              <van-grid square :column-num="1">
                <van-grid-item
                  v-for="value in 12"
                  :key="value"
                  :text="value + ''"
                />
              </van-grid>
            </div>
          </van-col>

          <van-col v-for="(firstitem, index) in 7" :key="index" span="3">
            <div @click="chooseitem(seconditem)" v-for="(seconditem, secondindex) in classlist[firstitem - 1]" :key="secondindex" class="schedule_class_card">
              <cell
                :classname="seconditem.course_name"
                :local="seconditem.room_id"
                :number="seconditem.i_duration"
              />
            </div>
          </van-col>

        </van-row>

      </div>
    </div>
    <div v-else>
      <div style="margin-top: 50%;"><p style="color: #606266;font-size: 20px;">暂无课程表数据</p></div>
    </div>

  </div>
</template>

<script>
import cell from './cell.vue'

export default {
  name: 'Class',
  components: {
    cell
  },
  props: ['classList'],
  data: function() {
    return {
      wid: 45,
      classlist: null
    }
  },
  watch: {
    classList(val) {
      this.classlist = val
    }
  },
  created() {
    if (this.classList) {
      this.classlist = this.classList
      console.log(this.classlist)
    } else {
      console.log('当前暂无课表数据')
    }
  },
  mounted() {
  },
  methods: {
    chooseitem(seconditem) {
      console.log(seconditem)
    },
    getSchedule() {
      this.$req.get('information/schedule', {
      })
        .then(res => {
          console.log(res)
          this.classlist = res.data
        })
    }
  }
}
</script>

<style scoped>
  .classgrid {
    width: 100%;
  }
  .classschedule {
    display: flex;
  }
  .schedule {
  }
  .schedule_class_card_number {

  }
  .schedule_class_card {

  }
</style>
