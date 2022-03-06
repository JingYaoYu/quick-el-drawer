<template>
  <div>
    <el-button @click="handleSubmit">测试</el-button>
    <el-button @click="test">测试1</el-button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data: () => ({ b: 2 }),
  methods: {
    test() {
      this.$emit('test', '哈哈哈 test')
    },
    handleSubmit() {
      this.quickElDrawerShow({
        title: '测试标题',
        width: '55%',
        component: h => h('el-button', { on: { click: this.open3 } }, '333'),
        showCancelButton: true,
        buttons: [{ text: '测试', callback: 'handleSubmit' }]
      })
    }
  }
}
</script>
