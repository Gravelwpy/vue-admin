<template>
  <div style="padding:30px;" class="roommanagement">
    <div class="coursetablearea">
      <schedule
        :class-list="json_data"
      />
    </div>
    <div class="detial">
      <el-form ref="form" :model="classTableIdData" label-width="80px">
        <el-form-item label="当前班级">
          <el-input v-model="classTableIdData.class_name" :disabled="true" style="width: 200px;" />
        </el-form-item>
      </el-form>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="添加课程" name="first">
          <div class="choosetag">
            <div style="display: flex;">
              <div class="tag-group">
                <span class="tag-group__title">已选课程：</span>
                <el-tag>
                  {{ courseData.course_name }}
                </el-tag>
              </div>
              <div class="tag-group" style="margin-left: 10px;">
                <span class="tag-group__title">任课教师：</span>
                <el-tag>
                  {{ teacherData.name }}
                </el-tag>
              </div>
              <div class="tag-group" style="margin-left: 10px;">
                <span class="tag-group__title">上课地点：</span>
                <el-tag>
                  {{ classData.room_name }}
                </el-tag>
              </div>
              <div style="margin-left: 220px;margin-top: -5px;">
                <el-button type="primary" @click="submit">添加课程</el-button>
              </div>
            </div>
            <div style="display: flex;margin-top: 10px;">
              <div class="tag-group">
                <span class="tag-group__title">日期：</span>
                <el-input-number v-model="i_week" :min="1" :max="7" label="描述文字" />
              </div>
              <div class="tag-group" style="margin-left: 10px;">
                <span class="tag-group__title">课程开始节数：</span>
                <el-input-number v-model="beginTime" :min="1" :max="12" label="描述文字" />
              </div>
              <div class="tag-group" style="margin-left: 10px;">
                <span class="tag-group__title">课程节数：</span>
                <el-input-number v-model="numTime" :min="1" :max="12" label="描述文字" />
              </div>
            </div>
          </div>
          <el-tabs :tab-position="'left'" style="height: 100%;">
            <el-tab-pane label="课程选择">
              <div class="table_area">
                <el-table
                  :data="courseTableData"
                  style="width: 100%"
                >

                  <el-table-column
                    label="课程名称"
                    width="200px;"
                  >
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.course_name }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="课程类型"
                  >
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.course_type }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="时长"
                  >
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.course_hour }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" min-width="150px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleChooseCourse(scope.$index, scope.row)"
                      >选择</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div class="block">
                <el-pagination
                  layout="prev, pager, next"
                  :total="coursetotal"
                  :page-size="size"
                  @prev-click="courseprev_click"
                  @next-click="coursenext_click"
                  @current-change="coursecurrent_change"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="选择教师">
              <div class="table_area">
                <el-table
                  :data="teacherTableData"
                  style="width: 100%"
                >
                  <el-table-column
                    label="工号"
                  >
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.tea_code }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="姓名"
                  >
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="类型"
                  >
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.type }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" min-width="150px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleChooseTeacher(scope.$index, scope.row)"
                      >选择</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    layout="prev, pager, next"
                    :total="teachertotal"
                    :page-size="size"
                    @prev-click="teacherprev_click"
                    @next-click="teachernext_click"
                    @current-change="teachercurrent_change"
                  />
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="选择教室">
              <div class="table_area">
                <el-table
                  :data="roomTableData"
                  style="width: 100%"
                >
                  <el-table-column
                    label="教室"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>教室: {{ scope.row.room_name }}</p>
                        <p>容量: {{ scope.row.capacity }}</p>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.room_name }}</el-tag>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleChooseClass(scope.$index, scope.row)"
                      >选择</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div class="block">
                <el-pagination
                  layout="prev, pager, next"
                  :total="roomtotal"
                  :page-size="size"
                  @prev-click="roomprev_click"
                  @next-click="roomnext_click"
                  @current-change="roomcurrent_change"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import schedule from '../../components/Schedule/schedule'
export default {
  name: 'CourseTableManageMent',
  components: {
    schedule
  },
  data: function() {
    return {
      classTableIdData: '',
      json_data: '',
      classGrade: '',
      activeName: 'first',
      teacherTableData: [],
      teacherpage: 0,
      size: 8,
      teachertotal: 0,
      courseTableData: [],
      coursepage: 0,
      coursetotal: 0,
      roomTableData: [],
      roompage: 0,
      roomtotal: 0,
      courseData: { course_name: '未选' },
      teacherData: { name: '未选' },
      classData: { room_name: '未选' },
      beginTime: 1,
      numTime: 1,
      i_week: 1
    }
  },
  created() {
    this.getClassId()
    this.getTeacherData()
    this.getCourseData()
    this.getRoomData()
  },
  mounted() {
  },
  methods: {
    submit() {
      this.$req.post('information/addSchedule', {
        course_id: this.courseData.course_id,
        room_id: this.classData.room_name,
        class_id: this.classTableIdData.class_id,
        tea_code: this.teacherData.tea_code,
        i_week: this.i_week,
        i_start: this.beginTime,
        i_duration: this.numTime
      })
        .then(res => {
          console.log(res)
          if (res.error_code === 0 && res.data === 1) {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.json_data = ''
            this.getTableData()
            this.resetSubData()
          } else {
            this.$message({
              showClose: true,
              message: '添加失败',
              type: 'error'
            })
          }
        })
    },
    resetSubData() {
      this.courseData = { course_name: '未选' }
      this.teacherData = { name: '未选' }
      this.classData = { room_name: '未选' }
      this.beginTime = 1
      this.numTime = 1
      this.i_week = 1
    },
    handleChooseCourse(index, row) {
      this.courseData = row
    },
    handleChooseTeacher(index, row) {
      this.teacherData = row
    },
    handleChooseClass(index, row) {
      this.classData = row
    },
    getClassId() {
      this.classTableIdData = JSON.parse(this.$store.state.classtableiddata.classTableIdData)
      console.log(this.classTableIdData)
      if (this.classTableIdData !== '') {
        this.classGrade = this.classTableIdData.class_id
        this.getTableData()
      } else {
        this.$message({
          type: 'error',
          message: '页面数据错误'
        })
      }
    },
    getCourseData() {
      this.$req.post('course/getAllCourse', {
        page: this.coursepage,
        size: this.size
      })
        .then(res => {
          console.log(res)
          if (res.error_code === 0) {
            this.courseTableData = res.data.data
            this.coursetotal = res.data.number
          }
        })
    },
    getRoomData() {
      this.$req.post('classroom/getClassRoomListByPageNumber', {
        page: this.roompage,
        size: this.size
      })
        .then(res => {
          console.log(res)
          if (res.error_code === 0) {
            this.roomTableData = res.data.data
            this.roomtotal = res.data.number
          }
        })
    },
    getTableData() {
      this.$req.post('information/scheduleGrade', {
        grade: this.classGrade
      })
        .then(res => {
          console.log(res)
          this.json_data = res.data
        })
    },
    getTeacherData() {
      this.$req.post('teacher/getAllTeacher', {
        page: this.teacherpage,
        size: this.size
      })
        .then(res => {
          console.log(res)
          if (res.error_code === 0) {
            this.teacherTableData = res.data.data
            this.teachertotal = res.data.number
          }
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 教师信息分类
    teacherprev_click() {
      this.teacherpage = this.teacherpage - 1
      this.getTeacherData()
    },
    teachernext_click() {
      this.teacherpage = this.teacherpage + 1
      this.getTeacherData()
    },
    teachercurrent_change(index) {
      this.teacherpage = index - 1
      this.getTeacherData()
    },
    // 课程
    courseprev_click() {
      this.coursepage = this.coursepage - 1
      this.getCourseData()
    },
    coursenext_click() {
      this.coursepage = this.coursepage + 1
      this.getCourseData()
    },
    coursecurrent_change(index) {
      this.coursepage = index - 1
      this.getCourseData()
    },
    // 教室
    roomprev_click() {
      this.roompage = this.roompage - 1
      this.getRoomData()
    },
    roomnext_click() {
      this.roompage = this.roompage + 1
      this.getRoomData()
    },
    roomcurrent_change(index) {
      this.roompage = index - 1
      this.getRoomData()
    }
  }

}
</script>

<style scoped>
  .roommanagement {
    position: absolute;
    height: calc( 100% - 40px );
    width: calc( 100% - 40px );
    overflow: auto;
    margin: 20px;
    background: white;
    border-radius: 20px;
    padding: 3% 5%;
    display: flex;
  }
  .coursetablearea {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 460px;
    min-height: 615px;
  }
  .detial {
    margin-left: 50px;
    width: calc(100% - 460px);
  }
  .choosetag {
    padding: 10px;
    height: 110px;
    margin-bottom: 20px;
    min-width: 890px;
    overflow: auto;
    border: #EBEEF5 1px solid;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>
