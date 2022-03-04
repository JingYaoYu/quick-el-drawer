import Vue from 'vue'
import QuickElDrawer from './quick-el-drawer'

export default (options = {}) => {
  const QuickElDrawerConstructor = Vue.extend(QuickElDrawer)
  const instance = new QuickElDrawerConstructor({
    data: {
      ...options,
      destroy: () => instance.$el.remove()
    }
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.$nextTick(() => {
    instance.visible = true
  })

  return instance
}
