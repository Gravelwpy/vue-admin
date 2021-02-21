<template>
  <div style="padding:30px;" class="labsigndetial">
    <div class="info">
      <div class="info_chooseitem">
        <div class="labname">当前班级：<el-tag>{{ iteminfo.sign_item_classid }}</el-tag></div>
      </div>
      <div class="tip"><el-tag type="info"><i class="el-icon-warning-outline">通过选择时间范围查看签到统计，以下数据仅统计所选时间段内的数据！</i></el-tag></div>
    </div>
    <div class="signresultborder">
      <div class="signdetial">
        <div class="signdetialfontcss">共有 <el-tag>{{ signnumber }}</el-tag> 次签到数据参与统计</div>
        <div class="signdetialfontcss betweensignfont">总签到率：{{ signrate }}%</div>
        <linechart
          :chart-data="piedata"
        />
      </div>
      <div class="signlist">
        未签到名单
        <el-table
          :data="tableData"
          style="width: 90%;margin-left: 5%;"
        >

          <el-table-column
            align="center"
            label="姓名"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import linechart from '../chart/LineChart'
export default {
  name: 'Labsigndetial',
  components: {
    linechart
  },
  data: function() {
    return {
      iteminfo: '',
      value1: '',
      piedata: { expectedData: [0, 0, 0, 0, 0] },
      signrate: 0,
      signnumber: 0,
      tableData: []
    }
  },
  created() {
    this.getLabInfo()
  },
  mounted() {
  },
  methods: {
    getLabInfo() {
      this.iteminfo = JSON.parse(localStorage.getItem('classsigninfo'))
      console.log(this.iteminfo)
      this.$req.post('sign/getClassItemResult', {
        signitemid: this.iteminfo.id
      })
        .then(res => {
          console.log(res)
          if (res.error_code === 0) {
            this.piedata = res.data.piedata
            // this.signrate = res.data.rate * 100
            // this.signnumber = res.data.signnumber
            this.tableData = res.data.notsignlist
          }
        })
    },
    getSignResult() {
      if (this.value1 === '') {
        this.$message({
          showClose: true,
          message: '请选择时间范围',
          type: 'error'
        })
      } else {
        this.$req.post('sign/getsignResultByTime', {
          end_time: this.value1[1],
          beg_time: this.value1[0],
          labid: JSON.parse(localStorage.getItem('setlabinfo')).id
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.piedata = res.data.piedata
              this.signrate = res.data.rate * 100
              this.signnumber = res.data.signnumber
              this.tableData = res.data.personlist
              // this.$message({
              //   showClose: true,
              //   message: '删除成功',
              //   type: 'success'
              // })
            }
          })
      }
    }
  }

}
</script>

<style scoped>
  .labsigndetial {
    position: absolute;
    height: calc( 100% - 40px );
    width: calc( 100% - 40px );
    overflow: auto;
    margin: 20px;
    background: white;
    border-radius: 20px;
    padding: 3% 5%;
  }
  .labname {
    color: #303133;
  }
  .info {
    padding: 10px;
  }
  .tip {
    padding: 10px 0 0 0;
  }
  .info_chooseitem {
    display: flex;
    justify-content: space-between;
  }
  .signresultborder {
    width: 100%;
    display: flex;
    height: calc( 100% - 102px );
  }
  .signdetial {
    padding: 40px 80px;
    width: calc(75% - 20px);
    margin-right: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .signlist {
    width: 25%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .signdetialfontcss {
    color: #303133;
  }
  .betweensignfont {
    margin-top: 20px;
  }
</style>
