<template>
  <div>
    <div class="chart">
      <div class="table">
        <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
        <el-checkbox-group v-model="checkedPhones" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in phones" :key="city.wifi_rec_id" :label="city.wifi_rec_id">{{ city.phone_info }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="position: absolute;right: 7%;bottom: 30px;">
        <el-button type="primary" @click="submit">提交<i class="el-icon-upload el-icon--right" /></el-button>
      </div>
    </div>

    <div class="chart_body">
      <EHistogram
        v-if="update"
        :opinionData = "opinionData"
        :xAxisData = "xAxisData"
      ></EHistogram>
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
    name: 'contrast',
    components: {
      EHistogram,
    },
    data () {
      return {
        locationInfo: '', //地点信息
        loading: false,

        checkAll: false,
        checkedPhones: [],
        phones: phoneOptions,
        isIndeterminate: true,

        opinionData: "",

        update: false,
        xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '1'],
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
        var loc_id = localStorage.getItem('localeditdata');

        this.$req.post('wifi/get_wifi_record', {
          "loc_id": loc_id
        })
          .then(res => {
            if(res.error_code == 0 ) {
              console.log(res.data[0].local_info_list);
              this.phones = res.data[0].local_info_list;
              console.log(this.phones);
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
    width: calc(100% - 40px);
    height: 100px;
    overflow: auto;
    margin: 20px;
    background: white;
    border-radius: 20px;
    padding: 3% 5%;
  }
  .chart_body {
    position: absolute;
    width: calc(100% - 40px);
    height: calc(100% - 160px);
    overflow: auto;
    margin: 140px 20px 20px 20px;
    background: white;
    border-radius: 20px;
    padding: 3% 5%;
  }
  .table {
    margin-right: 10%;
  }
</style>
