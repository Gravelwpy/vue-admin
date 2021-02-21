<template>
  <div style="padding:30px;" class="roommanagement">
    <el-button type="primary" round @click="addClassRoom">新增</el-button>
    <div class="table_area">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="教室"
          align="center"
          width="400px;"
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

        <el-table-column
          label="人数"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.capacity }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
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
  import anert from '../../../components/Alert/alert'
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
      addClassRoom: function() {
        this.$store.dispatch('roomdataset', '')
        this.$router.push('/nested/roomSeatManagement')
      },
      getTableList() {
        this.$req.post('classroom/getClassRoomListByPageNumber', {
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
      handleEdit(index, row) {
        console.log(index, row)
        this.$store.dispatch('roomdataset', JSON.stringify(row))
        // this.$store.commit('ROOM_DATA_MUTATION', JSON.stringify(row))
        this.$router.push('/nested/roomSeatManagement')
        // console.log(this.$store.state.roomdata)
      },
      handleDelete(index, id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$req.post('classroom/delClassRoom', {
            id: id
          })
            .then(res => {
              console.log(res)
              if (res.data === 1) {
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
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
