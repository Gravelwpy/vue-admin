<template>
  <div>
    <el-dialog
      :visible="dialogVisible"
      :width="width"
      :show-close="false"
      @close="dailogClose"
    >
      <slot />
      <div slot="title" class="dialog-header">
        <span>{{ title }}</span>
        <img src="@/assets/tip_img/close.png" alt="" @click="dailogClose">
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
    export default {
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '标题'
            },
            width: {
                type: String,
                default: '50%'
            },
        },
        components: {},
        data() {
            return {}
        },
        methods: {
            dailogClose() {
                this.$emit('dailogClose')
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>
<style lang="scss" scoped>
    @import "~@/styles/themes.scss";

    .dialog-header{
        border-bottom: 1px solid $themes-border;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #F5F6F7;
        font-size: 16px;
        border-radius: 10px 10px 0 0;
        color: #4A4A4A;
        img{
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }
</style>
