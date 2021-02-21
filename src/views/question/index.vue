<template>
  <div style="padding:30px;" class="roommanagement">
    <div class="table_area">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="日期"
          width="180"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.creat_time.slice(0,10) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="问题描述"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180"
          label="操作"
        >
          <template slot-scope="scope">
            <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)"-->
            <!--&gt;编辑</el-button>-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @prev-click="prev_click"
        @next-click="next_click"
        @current-change="current_change"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomManagement',
  components: {
  },
  data: function() {
    return {
      tableData: [],
      page: 0,
      size: 10,
      total: 0,

      dialogVisible: false
    }
  },
  created() {
    this.getTableList()
  },
  mounted() {
  },
  methods: {
    getTableList() {
      this.$req.post('question/getAllQuestions', {
        page: this.page,
        size: this.size
      })
        .then(res => {
          console.log(res)
          if (res.error_code === 0) {
            this.tableData = res.data.data
            this.total = res.data.number
          }
        })
    },
    handleDelete(index, id) {
      // console.log(index, id)
      this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$req.post('question/delQuestion', {
          id: id
        })
          .then(res => {
            console.log(res)
            if (res.data === 1) {
              this.tableData.splice(index, 1)
              this.total--
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
            } else {
              console.log(res.msg)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
