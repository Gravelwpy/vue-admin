<template>
  <div style="padding:30px;" class="roommanagement">
    <el-button type="primary" round @click="addClassRoom">新增</el-button>
    <div class="table_area">
      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          label="学生姓名"
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
          label="性别"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="班级"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.tele }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="邮箱"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
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
      :title="'请选择新增学生'"
      :width="'750px'"
      @dailogClose="dailogClose"
    >
      <div class="inputandbutton">
        <el-input v-model="wantsearchstudentname" placeholder="请输入学生名字"></el-input>
        <el-button type="primary" round style="margin-left: 20px;" @click="addClassRoom">搜索</el-button>
        <el-button type="primary" round style="margin-left: 10px;" @click="submitStudent" v-if="currentRow !== ''">提交</el-button>
      </div>
      <div class="studentlistcss">
        <el-table
          highlight-current-row
          @current-change="handleCurrentChange"
          :data="studentList"
          style="width: 100%"
        >

          <el-table-column
            label="学生姓名"
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
            label="性别"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.sex }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="班级"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.grade }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="电话"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.tele }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="邮箱"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </alert>
  </div>
</template>

<script>
import alert from '../../components/Alert/alert'
export default {
  name: 'Labpersionmanagement',
  components: {
    alert
  },
  data: function() {
    return {
      currentRow: '',
      wantsearchstudentname: '',
      studentList: [],
      flag: 0, // 默认0为新增，变为1则为编辑
      tableData: [],
      page: 0,
      size: 10,
      total: 0,
      alertflag: false,
      editid: '',
      ruleForm: {
        group_name: '',
        group_teacher: '',
        group_introduce: ''
      },
      rules: {
        group_name: [
          { required: true, message: '请输入实验室名字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        group_teacher: [
          { required: true, message: '请输入教师编号', trigger: 'change' }
        ],
        group_introduce: [
          { required: true, message: '请输入实验室简介', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
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
    submitStudent() {
      var labid = JSON.parse(this.$store.state.labinfo.labinfo)
      this.$req.post('group/addItemNumber', {
        stucode: this.currentRow.stu_code,
        groupid: labid.id
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
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val
    },
    submitForm() {
      if (this.flag === 0) {
        this.$req.post('group/addGroup', {
          groupname: this.ruleForm.group_teacher,
          tcode: this.ruleForm.group_teacher,
          groupiintroduce: this.ruleForm.group_introduce
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
        this.$req.post('group/editGroup', {
          id: this.editid,
          groupname: this.ruleForm.group_name,
          tcode: this.ruleForm.group_teacher,
          groupiintroduce: this.ruleForm.group_introduce
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
      this.ruleForm.group_name = ''
      this.ruleForm.group_teacher = ''
      this.ruleForm.group_introduce = ''
      this.alertflag = false
      this.wantsearchstudentname = ''
    },
    addClassRoom() {
      // 获取学生名单
      this.$req.post('students/searchStudentByName', {
        name: this.wantsearchstudentname
      })
        .then(res => {
          console.log(res)
          if (res.error_code === 0) {
            this.studentList = res.data.data
            this.flag = 0
            this.alertflag = true
          }
        })
    },
    editTeacherInfo: function(id, group_name, group_teacher, group_introduce) {
      this.editid = id
      this.ruleForm.group_name = group_name
      this.ruleForm.group_teacher = group_teacher
      this.ruleForm.group_introduce = group_introduce
      this.alertflag = true
    },
    getTableList() {
      var labid = JSON.parse(this.$store.state.labinfo.labinfo)
      this.$req.post('group/getGroupNumberByPage', {
        page: this.page,
        size: this.size,
        labid: labid.id
      })
        .then(res => {
          console.log(res)
          if (res.error_code === 0) {
            this.tableData = res.data.data
            this.total = res.data.number
          }
        })
    },
    handlePersionEdit(index, row) {
      console.log(index)
      console.log(row)
      this.$store.dispatch('labinfoset', JSON.stringify(row))
      this.$router.push('/labmanage/labpersionmanagement')
    },
    handleEdit(index, row) {
      this.flag = 1
      console.log(index, row)
      this.editTeacherInfo(row.id, row.group_name, row.group_teacher, row.group_introduce)
    },
    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$req.post('group/delLabNumber', {
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
  .studentlistcss {
    height: 300px;
    overflow: auto;
  }
  .inputandbutton {
    display: flex;
    width: 50%;
  }
</style>
