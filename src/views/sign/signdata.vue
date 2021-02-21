<template>
  <div style="padding:30px;" class="roommanagement scroll-all">
    <div class="show_item_choose">
      <div class="block">
        <div class="functionblock" @click="redioToLabSignResult">
          <i class="el-icon-s-grid" style="color: #f4516c;font-size: 90px;" />
          <div>
            <div class="greadname">实验室签到</div>
          </div>
        </div>
        <div class="functionblock" @click="redioToClassSignResult">
          <i class="el-icon-s-custom" style="color: #40c9c6;font-size: 90px;" />
          <div>
            <div class="greadname">课堂签到</div>
          </div>
        </div>
      </div>
      <!--<div class="block">-->
      <!--<div class="functionblock">-->
      <!--<i class="el-icon-s-data" style="color: rgb(105, 89, 205);font-size: 90px;"></i>-->
      <!--<div>-->
      <!--<div class="greadname">出勤率统计</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="functionblock">-->
      <!--<i class="el-icon-s-claim" style="color: #36a3f7;font-size: 90px;"></i>-->
      <!--<div>-->
      <!--<div class="greadname">wifi测试</div>-->
      <!--<div class="greadnumber">number</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signdata',
  components: {},
  data: function() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {
    redioToLabSignResult() {
      this.$router.push({ path: '/sign/labresult' })
    },
    redioToClassSignResult() {
      this.$router.push({ path: '/sign/classresult' })
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "~@/styles/themes.scss";
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
  .show_item_choose {
    display: flex;
    min-width: 800px;
  }
  .block {
    width: 50%;
    display: flex;
  }
  .functionblock {
    display: flex;
    justify-content: space-around;
    height: 108px;
    padding: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    min-width: 200px;
    margin: 0 10px;
    width: calc( 50% - 20px);
  }
  .greadname {
    margin-top: 18px;
    line-height: 18px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    margin-bottom: 5px;
  }
  .greadnumber {
    color: #666;
    font-size: 20px;
  }
</style>
