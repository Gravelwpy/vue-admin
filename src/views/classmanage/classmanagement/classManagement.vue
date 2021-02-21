<template>
  <div style="padding:30px;" class="roommanagement">
    <el-button type="primary" round @click="addClassRoom">新增</el-button>
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
      :title="'填写课程信息'"
      :width="'650px'"
      @dailogClose="dailogClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="班级名称" prop="class_name">
          <el-input v-model="ruleForm.class_name" />
        </el-form-item>
        <el-form-item label="班级编号" prop="class_id">
          <el-input v-model="ruleForm.class_id" />
        </el-form-item>
        <el-form-item label="年级" prop="class_year">
          <el-input v-model="ruleForm.class_year" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </alert>
  </div>
</template>

<script>
import alert from '../../../components/Alert/alert'
export default {
  name: 'Teacher',
  components: {
    alert
  },
  data: function() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
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
      },
      rules: {
        tea_name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        tea_code: [
          { required: true, message: '请输入教师编号', trigger: 'change' }
        ],
        tea_sex: [
          { type: 'date', required: true, message: '请选择性别', trigger: 'change' }
        ],
        tea_tele: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        tea_email: [
          { type: 'array', required: true, message: '请输入邮箱', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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
        if (this.$store.state.majordata.majorData) {
          var majorobj = JSON.parse(this.$store.state.majordata.majorData)
          this.$req.post('class/addClass', {
            class_id: this.ruleForm.class_id,
            class_name: this.ruleForm.class_name,
            class_year: this.ruleForm.class_year,
            majority_id: majorobj.id
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

        } else {
          this.$message({
            showClose: true,
            message: '页面数据错误',
            type: 'error'
          })
        }
      } else if (this.flag === 1) {
        this.$req.post('class/editClass', {
          id: this.editid,
          class_id: this.ruleForm.class_id,
          class_name: this.ruleForm.class_name,
          class_year: this.ruleForm.class_year
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
      this.ruleForm.class_id = ''
      this.ruleForm.class_name = ''
      this.ruleForm.class_year = ''
      this.alertflag = false
    },
    addClassRoom: function() {
      this.flag = 0
      this.alertflag = true
    },
    editTeacherInfo: function(id, class_id, class_name, class_year) {
      this.editid = id
      this.ruleForm.class_id = class_id
      this.ruleForm.class_name = class_name
      this.ruleForm.class_year = class_year
      this.alertflag = true
    },
    getTableList() {
      if (this.$store.state.majordata.majorData) {
        var majorobj = JSON.parse(this.$store.state.majordata.majorData)
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
      this.flag = 1
      console.log(index, row)
      this.editTeacherInfo(row.id, row.class_id, row.class_name, row.class_year)
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
        this.$req.post('class/delClass', {
          id: this.tableData[index].id
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
