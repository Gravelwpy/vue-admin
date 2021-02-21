<template>
  <keep-alive :include="cachedViews">
    <div class="chart">
      <div class="table">
        <el-table
          :data="locationInfo"
          style="width: 100%"
        >
          <el-table-column
            prop="loc_name"
            label="地点"
          />
          <!--<el-table-column-->
          <!--prop="test_point              "-->
          <!--label="已测试组数"-->
          <!--width="180">-->
          <!--</el-table-column>-->

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >详情</el-button>
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
   </keep-alive>
</template>

<script>

  // import { mapGetters } from 'vuex'
  // @ is an alias to /src
  // eslint-disable-next-line
  /* eslint-disable */

  export default {
    name: 'Dashboard',
    components: {
    },
    data () {
      return {
        locationInfo: '', //地点信息
        loading: false,
        tableData: []
      }
    },
    methods: {

      handleEdit(index, row) {
        localStorage.setItem('locallistdata', JSON.stringify(row));
        this.$router.push('/locallistpoint');
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
        this.$req.post('location/getLoc', {
        })
          .then(res => {
            if(res.error_code == 0 ) {
              console.log(res.data);
              this.locationInfo = res.data;
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
    height: calc(100% - 60px);
    overflow: auto;
    background: white;
    border-radius: 20px;
    padding: 20px;
  }
  .table {

  }
</style>
