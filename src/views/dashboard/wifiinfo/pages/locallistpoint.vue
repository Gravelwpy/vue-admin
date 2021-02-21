<template>
  <div class="chart">
    <div class="table">
      <el-table
        :data="locationInfo"
        style="width: 100%"
      >
        <el-table-column
          prop="locName"
          label="地点"
        />
        <el-table-column
          prop="testPoint"
          label="测试点"
        />
        <el-table-column
          prop="locId"
          label="点编号"
        />
        <el-table-column
          prop="longitude"
          label="经度"
        />
        <el-table-column
          prop="latitude"
          label="纬度"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >测试对比图</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>

// import { mapGetters } from 'vuex'
// @ is an alias to /src
// eslint-disable-next-line
  /* eslint-disable */

  export default {
    name: 'localPoint',
    components: {
    },
    data () {
      return {
        locationInfo: '', //地点信息
        loading: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {

      handleEdit(index, row) {
        localStorage.setItem('locallistpointdata', row.locId);
        // console.log(row);
        this.$router.push('/contrastlist');
        // console.log(row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      getlocallist() {
        console.log(JSON.parse(localStorage.getItem('locallistdata')));
        this.locationInfo = JSON.parse(localStorage.getItem('locallistdata')).test_point;
        // this.$req.post('location/getLoc', {
        // })
        //   .then(res => {
        //     if(res.error_code == 0 ) {
        //       console.log(res.data);
        //       this.locationInfo = res.data;
        //     }else {
        //       console.log(res.msg);
        //     }
        //
        //   })
      },
      getwifiinfo() {
        this.$req.post('wifi/get_wifi_info', {
          "json_str": JSON.stringify([2,3,4,5])
        })
          .then(res => {
            console.log(res)
            this.locationInfo = res;
          })
      }
    },
    mounted() {
    },
    created() {
      this.getlocallist();
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .chart {
    position: absolute;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    overflow: auto;
    margin: 20px;
    background: white;
    border-radius: 20px;
    padding: 20px;
  }
  .table {

  }
</style>
