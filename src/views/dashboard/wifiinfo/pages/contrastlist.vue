<template>
  <div>
    <div class="chart">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="phone"
          label="机型">
        </el-table-column>
        <el-table-column
          prop="date1"
          label="NITWLAN-Auto">
        </el-table-column>
        <el-table-column
          prop="date2"
          label="DIRECT-9C-HP DeskJet 4530 series">
        </el-table-column>
        <el-table-column
          prop="date3"
          label="NITWLAN-Auto">
        </el-table-column>
        <el-table-column
          prop="date4"
          label="As_the_moon_So_beautiful">
        </el-table-column>
        <el-table-column
          prop="date5"
          label="NITWLAN">
        </el-table-column>
        <el-table-column
          prop="date6"
          label="NITWLAN">
        </el-table-column>
        <el-table-column
          prop="date7"
          label="中控">
        </el-table-column>
        <el-table-column
          prop="date8"
          label="NITWLAN">
        </el-table-column>
        <el-table-column
          prop="date9"
          label="Rel.51646n">
        </el-table-column>
        <el-table-column
          prop="date10"
          label="LabTwoZeroTwo">
        </el-table-column>
        <el-table-column
          prop="date11"
          label="NITWLAN">
        </el-table-column>
        <el-table-column
          prop="date12"
          label="HUAWEI-LSC89X">
        </el-table-column>
        <el-table-column
          prop="date13"
          label="GuestNetwork_2.4G">
        </el-table-column>
        <el-table-column
          prop="date14"
          label="NITWLAN-Auto">
        </el-table-column>
        <el-table-column
          prop="date15"
          label="NITWLAN-Auto">
        </el-table-column>
        <el-table-column
          prop="date16"
          label="203">
        </el-table-column>
        <el-table-column
          prop="date17"
          label="李大鸡的鸡">
        </el-table-column>
        <el-table-column
          prop="date18"
          label="203_5G">
        </el-table-column>
      </el-table>
      <!--<el-checkbox v-model="checked1" disabled>小米 M8</el-checkbox>-->
      <!--<el-checkbox v-model="checked2" disabled>OPPO R15</el-checkbox>-->
      <!--<div class="table">-->
        <!--&lt;!&ndash;<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>&ndash;&gt;-->
        <!--<el-checkbox-group v-model="checkedPhones" @change="handleCheckedCitiesChange">-->
          <!--<el-checkbox v-for="city in phones" :key="city.wifi_rec_id" :label="city.wifi_rec_id">{{ city.phone_info }}</el-checkbox>-->
        <!--</el-checkbox-group>-->
      <!--</div>-->
      <!--<div style="position: absolute;right: 7%;bottom: 30px;">-->
        <!--<el-button type="primary" @click="submit">提交<i class="el-icon-upload el-icon&#45;&#45;right" /></el-button>-->
      <!--</div>-->
    </div>

    <div class="chart_body">
      <EHistogram
        v-if="update"
        :opinion-data="opinionData"
        :xAxisData="xAxisData"
      />
      <!--<EHistogram-->
      <!--opinion=""-->
      <!--x-axis-data=""-->
      <!--opinion-data=""-->
      <!--/>-->
    </div>
  </div>
</template>

<script>
import EHistogram from '../../../chart/EHistogram'
// import { mapGetters } from 'vuex'
// @ is an alias to /src
// eslint-disable-next-line
  /* eslint-disable */
  const phoneOptions = ['该点暂无测试数据'];
  export default {
    name: 'contrastlist',
    components: {
      EHistogram,
    },
    data () {
      return {
        tableData: [{
          phone: 'M8',
          date1: -75,
          date2: -66,
          date3: -82,
          date4: -74,
          date5: -75,
          date6: -81,
          date7: -82,
          date8: -69,
          date9: -72,
          date10: -71,
          date11: -70,
          date12: -75,
          date13: -76,
          date14: -68,
          date15: -69,
          date16: -55,
          date17: -70,
          date18: -44
        }, {
          phone: 'oppo r15',
          date1: -80,
          date2: -76,
          date3: -87,
          date4: -76,
          date5: -80,
          date6: -88,
          date7: -79,
          date8: -87,
          date9: -57,
          date10: -77,
          date11: -70,
          date12: -72,
          date13: -72,
          date14: -70,
          date15: -85,
          date16: -59,
          date17: -59,
          date18: -67
        }],
        locationInfo: '', //地点信息
        loading: false,

        checkAll: false,
        checkedPhones: [],
        phones: phoneOptions,
        isIndeterminate: true,

        opinionData: "",
        xAxisData: "",

        update: false,

        checked1: true,
        checked2: true
      }
    },
    methods: {
      submit() {
        if(this.checkedPhones.length == 0 ) {
          console.log("请选择手机型号");
        } else {
          console.log(this.checkedPhones[0]);
          this.$req.post('wifi/get_record_detail', {
            "wifi_rec_id": this.checkedPhones[0]
          })
            .then(res => {
              if(res.error_code == 0 ) {
                this.opinionData = res.data[0].resu;
                console.log(this.opinionData);
                // 移除组件
                this.update = false
                // 在组件移除后，重新渲染组件
                // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
                this.$nextTick(() => {
                  this.update = true
                })
              }else {
                console.log(res.msg);
              }

            })
        }
      },
      handleCheckAllChange(val) {
        this.checkedPhones = val ? phoneOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.phones.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.phones.length;
      },
      handleEdit(index, row) {
        localStorage.setItem('localdata', row.locId);
        console.log(row.locId);
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
        // var loc_id = localStorage.getItem('locallistpointdata');

        // this.$req.post('wifi/get_wifi_record', {
        //   "loc_id": loc_id
        // })
        //   .then(res => {
        //     if(res.error_code == 0 ) {
        //       console.log(res.data[0].local_info_list);
        //       this.phones = res.data[0].local_info_list;
        //       console.log(this.phones);
        //     }else {
        //       console.log(res.msg);
        //     }
        //
        //   })
        this.$req.post('wifi/get_record_difphone', {
        })
          .then(res => {
            if(res.error_code == 0 ) {
              console.log(res.data[0]);
              this.opinionData = res.data[0].data_series;
              this.xAxisData = res.data[0].data;
              // 移除组件
              this.update = false
              // 在组件移除后，重新渲染组件
              // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
              this.$nextTick(() => {
                this.update = true
              })
            }else {
              console.log(res.msg);
            }

          })
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
    width: calc(100% - 60px);
    height: 300px;
    overflow: hidden;
    background: white;
    border-radius: 20px;
    padding: 3% 5%;
  }
  .chart_body {
    position: absolute;
    width: calc(100% - 60px);
    height: calc(100% - 400px);
    overflow: auto;
    margin: 340px 0px 0px 0px;
    background: white;
    border-radius: 20px;
    padding: 3% 5%;
  }
  .table {
    margin-right: 10%;
  }
</style>
