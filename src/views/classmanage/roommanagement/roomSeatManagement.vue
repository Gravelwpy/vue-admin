<template>
  <div style="padding:30px;" class="roomseatmanagement">
    <div class="seatarea">
      <cinemaSeatChoose
        ref="getClassSeatData"
        :seatarray="json_data"
      />
    </div>
    <div class="otheroption">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="教室名称">
          <el-input v-model="form.room_name" />
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model="form.capacity" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button type="primary" @click="getRoomSeatData">test</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import cinemaSeatChoose from '../../../components/RoomManage/cinema-seat-choose'
export default {
  name: 'RoomSeatManagement',
  components: {
    cinemaSeatChoose
  },
  data: function() {
    return {
      form: {
        room_name: '',
        capacity: '',
        id: ''
      },
      json_data: [

        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ],
        [

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }},

          { 'is_seat': -1, 'signdata': { }}, { 'is_seat': -1, 'signdata': { }}

        ]

      ]

    }
  },
  created() {
    this.getRoomData()
    this.getRoomSeatData()
  },
  mounted() {
  },
  methods: {
    // 获取座位数据
    getRoomSeatData() {
      if (this.$store.state.roomdata.roomData) {
        this.$req.post('classseat/getClassSeatInf', {
          id: this.form.id
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.json_data = res.data
            }
          })
      } else {
        console.log('新增')
      }
    },
    getRoomData: function() {
      if (this.$store.state.roomdata.roomData) {
        this.form = JSON.parse(this.$store.state.roomdata.roomData)
      } else {
        console.log('新增')
      }
      console.log(this.form)
    },
    onSubmit: function() {
      if (this.form.room_name === '' || this.capacity === '') {
        this.$message({
          showClose: true,
          message: '请按要求填写数据',
          type: 'warning'
        })
      } else {
        // 处理获取到的位置数据 将数组去掉周围多余空位
        var seatarr = this.$refs.getClassSeatData.seatArray
        console.log(seatarr)
        var n, s, w, e
        var len = seatarr.length
        n = 0
        s = len - 1
        w = 0
        e = len - 1
        var flag = 0
        for (var j = 0; j < len; j++) { for (var i = 0; i < len; i++) { flag = flag + seatarr[j][i].is_seat } if (flag <= -len) { n++ } else { break }flag = 0 }
        flag = 0
        for (var j = len - 1; j >= 0; j--) { for (var i = 0; i < len; i++) { flag = flag + seatarr[j][i].is_seat } if (flag <= -len) { s-- } else { break }flag = 0 }
        flag = 0
        for (var j = 0; j < len; j++) { for (var i = 0; i < len; i++) { flag = flag + seatarr[i][j].is_seat } if (flag <= -len) { w++ } else { break }flag = 0 }
        flag = 0
        for (var j = len - 1; j >= 0; j--) { for (var i = 0; i < len; i++) { flag = flag + seatarr[i][j].is_seat } if (flag <= -len) { e-- } else { break }flag = 0 }
        var arr = []
        for (var i = 0; i <= s - n; i++) {
          arr[i] = []
          for (var j = 0; j <= e - w; j++) {
            arr[i][j] = seatarr[n + i][w + j].is_seat
          }
        }
        var flags = 0 // 修改
        if (!this.$store.state.roomdata.roomData) {
          flags = 1 // 增加
        }
        console.log(flags)
        this.$req.post('classseat/changeClassSeatInf', {
          seatArr: JSON.stringify(arr),
          form: JSON.stringify(this.form),
          flags: flags
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.form.id = res.data
              this.$store.dispatch('roomdataset', JSON.stringify(this.form))
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
            }
          })
      }

    }
  }

}
</script>

<style scoped>
  .roomseatmanagement {
    display: flex;
    position: absolute;
    height: calc( 100% - 40px );
    width: calc( 100% - 40px );
    overflow: auto;
    margin: 20px;
    background: white;
    border-radius: 20px;
    padding: 3% 5%;
  }
  .seatarea {
    width: 600px;
  }
  .otheroption {}
</style>
