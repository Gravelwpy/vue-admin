<template>
  <div style="padding:30px;" class="roommanagement">
    <div class="table_area">
      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          label="签到标记"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sign_item_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="目标班级"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sign_item_classid }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="时间"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sign_item_begin_time }}:{{ scope.row.sign_item_end_time }} </span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
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
      :title="'填写教师信息'"
      :width="'650px'"
      @dailogClose="dailogClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="tea_name">
          <el-input v-model="ruleForm.tea_name" />
        </el-form-item>
        <el-form-item label="性别" prop="tea_sex">
          <el-radio-group v-model="ruleForm.tea_sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工号" prop="tea_code">
          <el-input v-model="ruleForm.tea_code" />
        </el-form-item>
        <el-form-item label="电话" prop="tea_tele">
          <el-input v-model="ruleForm.tea_tele" />
        </el-form-item>
        <el-form-item label="邮箱" prop="tea_email">
          <el-input v-model="ruleForm.tea_email" />
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
  name: 'Classsignitemlist',
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
        tea_code: '',
        tea_name: '',
        tea_sex: '',
        tea_tele: '',
        tea_email: ''
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
        this.$req.post('teacher/add', {
          tea_code: this.ruleForm.tea_code,
          tea_email: this.ruleForm.tea_email,
          tea_name: this.ruleForm.tea_name,
          tea_sex: this.ruleForm.tea_sex,
          tea_tele: this.ruleForm.tea_tele
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
        this.$req.post('teacher/editTeacher', {
          id: this.editid,
          tea_code: this.ruleForm.tea_code,
          tea_email: this.ruleForm.tea_email,
          tea_name: this.ruleForm.tea_name,
          tea_sex: this.ruleForm.tea_sex,
          tea_tele: this.ruleForm.tea_tele
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
    editTeacherInfo: function(id, email, name, sex, tea_code, tele) {
      this.editid = id
      this.ruleForm.tea_code = tea_code
      this.ruleForm.tea_email = email
      this.ruleForm.tea_name = name
      this.ruleForm.tea_sex = sex
      this.ruleForm.tea_tele = tele
      this.alertflag = true
    },
    getTableList() {
      this.$req.post('sign/getsignItemByTid', {
        page: this.page,
        size: this.size,
        tid: localStorage.getItem('teaid')
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
      // this.flag = 1
      console.log(index, row)
      localStorage.setItem('classsigninfo', JSON.stringify(row))
      this.$router.push('/sign/classsigndetial')
      // this.editTeacherInfo(row.id, row.email, row.name, row.sex, row.tea_code, row.tele)
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
        this.$req.post('teacher/delTeacherInf', {
          account: this.tableData[index].tea_code
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
