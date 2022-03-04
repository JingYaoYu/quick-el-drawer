<template>
  <el-button @click="handleSubmit">测试</el-button>
</template>

<script>
export default {
  name: 'Test',
  data: () => ({ b: 2 }),
  methods: {
    open3() {
      this.quickElDrawerShow({
        title: 'open3',
        width: '50%',
        component: 'open3'
      })
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
