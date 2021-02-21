<template>
  <div ref="height_judge" :class="classObject">
    <van-grid :column-num="1" :style="{ height: hSize + 'px' }">
      {{ classname }} {{ local }}
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  components: {},
  props: {
    classname: {
      type: String,
      default: ''
    },
    teacher: {
      type: String,
      default: ''
    },
    local: {
      type: [Number, String],
      default: ''
    },
    number: {
      type: Number,
      default: 3
    }
  },
  data: function() {
    return {
      hSize: 0,
      wSize: 0
    }
  },
  computed: {
    classObject: function() {
      return {
        'cell': true,
        'backcolor': this.classname != ''
      }
    }
  },
  created() {

  },
  mounted() {
    this.time = setInterval(this.timer, 1)
  },
  methods: {
    timer() {
      clearInterval(this.time)
      this.hSize = this.$refs.height_judge.offsetWidth * this.number - 6
    }
  }
}
</script>

<style scoped>
  .cell {
    overflow: hidden;
    color: #7d7e80;
    font-size: 12px;
    padding: 4px;
    border-radius: 6px;
    margin: 1px;
  }
  .backcolor {
    background: #D1EEEE;
  }
</style>
