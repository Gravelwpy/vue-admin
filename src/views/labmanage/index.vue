<template>
  <div style="padding:30px;" class="roommanagement">
    <el-button type="primary" round @click="addClassRoom">新增</el-button>
    <div class="table_area">
      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          label="实验室名称"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.group_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="老师"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.group_teacher }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="简介"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.group_introduce }}</span>
          </template>
        </el-table-column>


        <el-table-column
          width="280px;"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="handlePersionEdit(scope.$index, scope.row)"
            >实验室人员管理</el-button>
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
      :title="'填写实验室信息'"
      :width="'650px'"
      @dailogClose="dailogClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="实验室名字" prop="tea_name">
          <el-input v-model="ruleForm.group_name"  placeholder="需与教室名字一致" />
        </el-form-item>
        <el-form-item label="负责教师" prop="tea_name">
          <el-input v-model="ruleForm.group_teacher" placeholder="请输入教师工号" />
        </el-form-item>
        <el-form-item label="简介" prop="tea_name">
          <el-input
            v-model="ruleForm.group_introduce"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入简介"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </alert>
  </div>
</template>

<script>
import alert from '../../components/Alert/alert'
export default {
  name: 'Teacher',
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
    },
    addClassRoom: function() {
      this.flag = 0
      this.alertflag = true
    },
    editTeacherInfo: function(id, group_name, group_teacher, group_introduce) {
      this.editid = id
      this.ruleForm.group_name = group_name
      this.ruleForm.group_teacher = group_teacher
      this.ruleForm.group_introduce = group_introduce
      this.alertflag = true
    },
    getTableList() {
      this.$req.post('group/getAllGroupByPage', {
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
      this.$confirm('此操作将永久删除该实验室记录以及该实验室下所有的学生记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$req.post('group/delGroup', {
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
