<template>
  <div class="app">
    <el-button @click="test">测试</el-button>
  </div>
</template>

<script>
import Test from './Test'
export default {
  name: 'App',
  methods: {
    test() {
      this.quickElDrawerShow({
        title: '测试标题',
        component: Test,
        showCancelButton: true,
        buttons: [{ text: '测试', callback: 'handleSubmit' }]
      })
    }
  }
}
</script>
