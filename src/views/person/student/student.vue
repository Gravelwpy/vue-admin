<template>
  <div style="padding:30px;" class="roommanagement">
    <el-select
      v-model="value"
      @change="change"
      placeholder="请选择班级">
      <el-option
        v-for="item in options"
        :key="item.class_id"
        :label="item.class_name"
        :value="item.class_id"
      />
    </el-select>
    <el-button type="primary" round @click="addClassRoom">新增学生</el-button>
    <div class="table_area">
      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          label="姓名"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="学号"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.stu_code }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="班级代码"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.tele }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
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

    
    <!-- 弹窗信息 -->
    <alert
      :dialog-visible="alertflag"
      :title="'填写学生信息'"
      :width="'650px'"
      @dailogClose="dailogClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID" prop="id">
          <el-input v-model="ruleForm.id" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="ruleForm.grade" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="male" />
            <el-radio label="female" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学号" prop="stu_code">
          <el-input v-model="ruleForm.stu_code" />
        </el-form-item>
        <el-form-item label="电话" prop="tele">
          <el-input v-model="ruleForm.tele" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
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
        id:'',
        stu_code: '',
        name: '',
        sex: '',
        tele: '',
        email: '',
        grade: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入id', trigger: 'blur' },
          { min: 1, max: 10, message: '不可进行修改', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        stu_code: [
          { required: true, message: '请输入学号', trigger: 'change' }
        ],
        sex: [
          {  required: true, message: '请选择性别', trigger: 'change' }
        ],
        tele: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入年级', trigger: 'change' }
        ],
        email: [
          { type: 'array', required: true, message: '请输入邮箱', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      options: [],
      value: ''
    }
  },
  created() {
    this.getclasslist()
    this.getTableList()
  },
  mounted() {
  },
  methods: {
    getclasslist() {    //获取班级信息
      this.$req.get('class/getclasslist')
        .then(res => {
          console.log(res)
          if (res.error_code === 0) {
            this.options = res.data
          } else {
            this.$message({
              showClose: true,
              message: '班级信息获取失败',
              type: 'error'
            })
          }
        })
    },
    change() {
      this.getTableList()//获取对应班级的学生名单
    },
    submitForm() {
      if (this.flag === 0) {
        this.$req.post('students/addStudent', {   //新增学生信息
          id:this.ruleForm.id,//增加id
          stu_code: this.ruleForm.stu_code,
          email: this.ruleForm.email,
          name: this.ruleForm.name,
          sex: this.ruleForm.sex,
          tele: this.ruleForm.tele,
          grade: this.ruleForm.grade
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
        this.$req.post('students/editStudentInf', {//编辑学生信息
          //id: this.editid,
          id: this.ruleForm.id,
          stu_code: this.ruleForm.stu_code,
          email: this.ruleForm.email,
          name: this.ruleForm.name,
          sex: this.ruleForm.sex,
          tele: this.ruleForm.tele,
          grade: this.ruleForm.grade
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
    resetForm(formName) {//重置
      //this.$refs[formName].resetFields()
      this.ruleForm.id = ''
      this.ruleForm.stu_code = ''
      this.ruleForm.email = ''
      this.ruleForm.name = ''
      this.ruleForm.sex = ''
      this.ruleForm.tele = ''
      this.ruleForm.grade = ''
    },
    dailogClose: function() {
      this.editid = ''
      this.ruleForm.stu_code = ''
      this.ruleForm.email = ''
      this.ruleForm.name = ''
      this.ruleForm.sex = ''
      this.ruleForm.tele = ''
      this.ruleForm.grade = ''
      this.alertflag = false
    },
    addClassRoom: function() {
      this.flag = 0
      this.alertflag = true
    },
    editInfo: function(id, grade, email, name, sex, stu_code, tele) {//编辑时显示已有数据
      //this.editid = id
      this.ruleForm.id = id
      this.ruleForm.stu_code = stu_code
      this.ruleForm.email = email
      this.ruleForm.name = name
      this.ruleForm.sex = sex
      this.ruleForm.tele = tele
      this.ruleForm.grade = grade
      this.alertflag = true
    },
    getTableList() {    //获取学生名单
      // console.log(this.value)
      this.$req.post('students/getlist', {
        class_id: this.value,
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
      this.flag = 1
      console.log(index, row)
      this.editInfo(row.id, row.grade, row.email, row.name, row.sex, row.stu_code, row.tele)
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
        this.$req.post('students/delStudentInf', {
          stu_code: this.tableData[index].stu_code
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
