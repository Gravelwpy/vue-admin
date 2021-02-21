<template>
  <div style="padding:30px;" class="roommanagement">
    <div class="table_area">
      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          label="班级名称"
          width="200px;"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.class_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="班级编号"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.class_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="年级"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.class_year }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >班级课表管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @prev-click="prev_click"
        @next-click="next_click"
        @current-change="current_change"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Teacher',
  components: {
  },
  data: function() {
    return {
      flag: 0, // 默认0为新增，变为1则为编辑
      tableData: [],
      page: 0,
      size: 10,
      total: 0,
      alertflag: false,
      editid: '',
      ruleForm: {
        class_id: '',
        class_name: '',
        class_year: ''
      }
    }
  },
  created() {
    this.getTableList()
  },
  mounted() {
  },
  methods: {
    getTableList() {
      if (this.$store.state.coursemajordata.courseMajorData) {
        var majorobj = JSON.parse(this.$store.state.coursemajordata.courseMajorData)
        console.log(majorobj)
        this.$req.post('class/getAllClass', {
          page: this.page,
          size: this.size,
          majorid: majorobj.id
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.tableData = res.data.data
              this.total = res.data.number
            }
          })
      } else {
        this.$message({
          showClose: true,
          message: '页面数据错误',
          type: 'error'
        })
      }
    },
    handleEdit(index, row) {
      this.$store.dispatch('classtableiddataset', JSON.stringify(row))
      this.$router.push('/classmanage/conrseTableManagement')
      // this.flag = 1
      // console.log(index, row)
      // this.editTeacherInfo(row.id, row.class_id, row.class_name, row.class_year)
      // this.$store.dispatch('roomdataset', JSON.stringify(row))
      // this.$store.commit('ROOM_DATA_MUTATION', JSON.stringify(row))
      // this.$router.push('/nested/roomSeatManagement')
      // console.log(this.$store.state.roomdata)
    },
    prev_click() {
      this.page = this.page - 1
      this.getTableList()
    },
    next_click() {
      this.page = this.page + 1
      this.getTableList()
    },
    current_change(index) {
      this.page = index - 1
      this.getTableList()
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
  }
  .table_area {
    max-height: 90%;
    overflow: auto;
  }
  .block {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
</style>
