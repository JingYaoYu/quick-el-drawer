<script>
export default {
  name: 'QuickElDrawer',
  data: () => ({
    title: null,
    width: '60%',
    direction: 'rtl',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    modalAppendToBody: false,
    animation: false,
    showCancelButton: false,
    appendToBody: true,
    modal: true,
    center: false,
    visible: false,
    beforeClose: null,
    customClass: '',
    component: null,
    destroy: null,
    props: {},
    on: {},
    buttonLoadingKeys: [],
    buttonDisabledKeys: [],
    buttons: [],
    callback: null
  }),
  methods: {
    onClose() {
      const destroyState = () => {
        this.visible = false
        this.on && this.on.close && this.on.close()
        const timer = setTimeout(() => {
          this.buttons = []
          this.buttonDisabledKeys = []
          this.buttonDisabledKeys = []
          this.loading = false
          this.customClass = ''
          this.title = ''
          this.component = null
          this.destroy && this.destroy()
          clearTimeout(timer)
        }, 400)
      }
      this.beforeClose ? this.beforeClose(destroyState) : destroyState()
    },
    async onButtonClicked(button) {
      if (!button.callback) return

      if (button.confirm) {
        const state = window.confirm(`是否确认${button.text}?`)
        if (!state) return
      }

      const child =
        (typeof this.component === 'function' ? this.$children[0].$children.pop() : this.$refs.modalChild) || {}

      if (typeof button.callback === 'string') {
        child && child[button.callback] && child[button.callback]({ modal: this })
        return
      }
      if (typeof button.callback === 'function') {
        button.callback && button.callback({ modal: this, component: child })
      }
    }
  },
  render(h) {
    let {
      visible,
      direction,
      closeOnClickModal,
      closeOnPressEscape,
      customClass,
      buttonLoadingKeys,
      buttonDisabledKeys,
      modalAppendToBody,
      showCancelButton,
      appendToBody,
      buttons,
      loading,
      title,
      props,
      animation,
      width,
      center,
      showClose,
      callback,
      component,
      onButtonClicked,
      onClose,
      on,
      modal
    } = this

    const renderHeader = () => {
      if (!title) return null
      return [
        h('strong', { slot: 'title' }, title),
        h('span', { slot: 'title' }, [
          showClose && h('i', { on: { click: () => (this.visible = false) }, class: 'el-icon-close' })
        ])
      ]
    }

    const renderFooter = () => {
      if (!showCancelButton && buttons.length <= 0) return null
      const cancelButton = showCancelButton
        ? [{ text: '取消', type: 'default', callback: () => (this.visible = false) }]
        : []

      return h(
        'div',
        { class: 'quick-drawer__footer' },
        [...buttons, ...cancelButton].map((button, index) =>
          h(
            'el-button',
            {
              key: button.name || index,
              props: {
                type: button.type || 'primary',
                icon: button.icon,
                size: button.size || 'medium',
                loading: loading || button.loading || buttonLoadingKeys.includes(button.name),
                disabled: button.disabled || buttonDisabledKeys.includes(button.name)
              },
              on: { click: () => onButtonClicked(button) }
            },
            button.text
          )
        )
      )
    }

    const renderContent = () => {
      if (typeof component === 'function') return component(h, this)
      if (typeof component === 'string') return component

      return h(component, {
        ref: 'modalChild',
        props,
        on: {
          callback: params => callback && callback(params || this),
          'update:loading': v => (this.loading = v),
          'update:buttons': v => (this.buttons = v),
          'update:visible': v => (this.visible = v),
          'update:title': v => (this.title = v),
          'update:disabled-keys': v => (this.buttonDisabledKeys = v),
          'update:loading-keys': v => (this.buttonLoadingKeys = v)
        }
      })
    }

    const Footer = renderFooter()
    const Content = renderContent()
    return h(
      'el-drawer',
      {
        props: {
          title,
          size: width,
          center,
          visible,
          direction,
          withHeader: !!title,
          showClose: false,
          modal,
          customClass: [customClass, 'quick-el-drawer', animation ? 'animation' : '', Footer ? 'has-footer' : ''].join(
            ' '
          ),
          wrapperClosable: closeOnClickModal,
          closeOnPressEscape,
          modalAppendToBody,
          appendToBody,
          destroyOnClose: true
        },
        on: { ...on, close: onClose }
      },
      [renderHeader(), h('div', { class: 'quick-drawer__content' }, [Content]), Footer]
    )
  }
}
</script>

<style>
.quick-el-drawer.animation {
  transition: width cubic-bezier(0, 0, 0.2, 1) 0.3s;
}
.quick-el-drawer {
  display: flex;
  flex-direction: column;
}
.quick-el-drawer .el-drawer__header {
  padding: 0 20px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 0;
}

.quick-el-drawer .quick-drawer__content {
  padding: 15px;
  height: 100%;
}
.quick-el-drawer .el-drawer__body {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.quick-el-drawer.has-footer .el-drawer__body {
  padding-bottom: 55px;
}
.quick-el-drawer .quick-drawer__footer {
  padding: 0 20px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #f0f0f0;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
}

.quick-el-drawer .el-drawer__header i {
  color: #909399;
  cursor: pointer;
}
.quick-el-drawer .el-drawer__header i:hover {
  color: #000;
}
.quick-el-drawer .el-drawer__header .el-icon-close {
  margin-left: 10px;
}
</style>
