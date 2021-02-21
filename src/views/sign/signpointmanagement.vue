<template>
  <div style="padding:30px;" class="roommanagement">
    <el-button type="primary" round @click="addClassRoom">新增</el-button>
    <div class="table_area">
      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          label="地点"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.loc_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="地点"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.loc_number }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="创建者"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
        :page-size="size"
        @prev-click="prev_click"
        @next-click="next_click"
        @current-change="current_change"
      />
    </div>

    <alert
      :dialog-visible="alertflag"
      :title="'填写测试点信息'"
      :width="'650px'"
      @dailogClose="dailogClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="地点" prop="loc_name">
          <el-input v-model="ruleForm.loc_name" />
        </el-form-item>
        <el-form-item label="测试点名称" prop="loc_number">
          <el-input v-model="ruleForm.loc_number" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="ruleForm.longitude" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="ruleForm.latitude" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </alert>
  </div>
</template>

<script>
import alert from '../../components/Alert/alert'
export default {
  name: 'Signpoint',
  components: {
    alert
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
        loc_name: '',
        loc_number: '',
        longitude: '',
        latitude: ''
      },
      rules: {
        loc_name: [
          { required: true, message: '请输入地点', trigger: 'blur' }
        ],
        loc_number: [
          { required: true, message: '请输入测试点名称', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTableList()
  },
  mounted() {
  },
  methods: {
    submitForm() {
      if (this.flag === 0) {
        this.$req.post('location/addPoint', {
          loc_name: this.ruleForm.loc_name,
          test_point: this.ruleForm.loc_number,
          longitude: this.ruleForm.longitude,
          latitude: this.ruleForm.latitude
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.dailogClose()
              this.getTableList()
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
            }
          })
      } else if (this.flag === 1) {
        this.$req.post('location/editPoint', {
          id: this.editid,
          loc_name: this.ruleForm.loc_name,
          test_point: this.ruleForm.loc_number,
          longitude: this.ruleForm.longitude,
          latitude: this.ruleForm.latitude
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.dailogClose()
              this.getTableList()
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
            }
          })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    dailogClose: function() {
      this.ruleForm.tea_code = ''
      this.ruleForm.tea_email = ''
      this.ruleForm.tea_name = ''
      this.ruleForm.tea_sex = ''
      this.ruleForm.tea_tele = ''
      this.alertflag = false
    },
    addClassRoom: function() {
      this.flag = 0
      this.alertflag = true
    },
    editTeacherInfo: function(id, loc_name, loc_number, longitude, latitude) {
      this.editid = id
      this.ruleForm.loc_name = loc_name
      this.ruleForm.loc_number = loc_number
      this.ruleForm.longitude = longitude
      this.ruleForm.latitude = latitude
      this.alertflag = true
    },
    getTableList() {
      if (localStorage.getItem('loc_name') != null) {
        var loc_name = localStorage.getItem('loc_name')
        this.$req.post('location/getTestPointByLocName', {
          loc_name: loc_name,
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
      } else {
        this.$message({
          showClose: true,
          message: '数据错误',
          type: 'success'
        })
      }
    },
    handlePointManage(index, row) {
      console.log(index, row)
    },
    handleEdit(index, row) {
      this.flag = 1
      console.log(index, row)
      this.editTeacherInfo(row.id, row.loc_name, row.loc_number, row.longitude, row.latitude)
      // this.$store.dispatch('roomdataset', JSON.stringify(row))
      // this.$store.commit('ROOM_DATA_MUTATION', JSON.stringify(row))
      // this.$router.push('/nested/roomSeatManagement')
      // console.log(this.$store.state.roomdata)
    },
    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$req.post('location/delLocPoint', {
          loc_id: this.tableData[index].id
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.tableData.splice(index, 1)
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
