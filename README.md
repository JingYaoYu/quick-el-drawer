# quick el drawer

> 在vuejs后台系统中, 经常使用到抽屉打开指定组件的操作, 每次要写一堆标签, 一堆状态控制, template显得非常臃肿, 我认为抽屉和抽屉内的业务逻辑应该是解耦的, 作为抽屉只负责展示组件, 业务都应该拆分出来
> 为了解决我开发中的这个痛点, 开发了快速创建抽屉的一个工具函数, 方便后台业务开发

## 安装

```
npm i @yizhai/quick-el-drawer
```

## 使用

``` javascript
import ElQuickDrawer from '@yizhai/quick-el-drawer'

// 简单用法
ElQuickDrawer({ title: '这是标题', component: '这是内容' })
```

## 抽屉内容

``` javascript

// 使用render函数渲染自定义组件
ElQuickDrawer({  title: '这是标题', component: h => h('h1', '这是内容') })

// 渲染import组件
import Example from 'path/to/example.vue'
ElQuickDrawer({  title: '这是标题', component: Example })

ElQuickDrawer({  title: '这是标题', component: require( 'path/to/example.vue').default })

// 渲染vue组件对象
const CusomComponent = { name: 'CustomCom', render: h => h('el-button', 'el button!') }
ElQuickDrawer({ title: '这是标题',  component: CusomComponent })
```

## 配置

* 参数传递时使用驼峰写法

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | Drawer 的标题 | string | - |
| component | Drawer显示的内容 | string/VNode/h函数 | Null |
| props | component渲染组件的时候透传给组件的参数 | object | {} |
| on | 渲染组件内部派发的事件, 通过on接收 | object | {} |
| width | Drawer 的宽度 | string | 50% |
| fullscreen | 是否为全屏 Drawer | boolean | false |
| modal | 是否需要遮罩层 | boolean | true |
| modal-append-to-body | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Drawer 的父元素上 | boolean | true |
| append-to-body | Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true | boolean | false |
| custom-class | Drawer 的自定义类名 | string | - |
| wrapperClosable | 点击遮罩层是否可以关闭 Drawer | boolean | true |
| show-close | 是否显示关闭图标 | boolean | true |
| animation | 切换全屏的时候是否需要动画 | boolean | false |
| buttons | Drawer的按钮, 为空时不显示footer | array: [{text, callback, name, confirm}] | [] |
| buttonLoadingKeys | 需要loading的按钮的name值 | array | [] |
| buttonDisabledKeys | 需要禁用的按钮的name值 | array | [] |
| showCancelButton | 是否显示取消按钮 | boolean | false |

## live demo(结合一个打开表单并提交到后台然后关闭抽屉的一个业务场景)

[!\[Edit quick-el-drawer-example \\(forked\\)\]\(https://codesandbox.io/static/img/play-codesandbox.svg\)](https://codesandbox.io/s/quick-el-drawer-example-forked-vpcogq?fontsize=14&hidenavigation=1&theme=dark)

