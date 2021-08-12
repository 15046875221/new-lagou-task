## Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

### 简答题

#### 1、请简述 Vue 首次渲染的过程。
1. 初始化实例成员和静态成员
2. 调用new Vue
3. 调用_init()
4. 调用entry-runtime-width-complier中的$mount 将模板编译成render函数，如果没有传render会将模板编译成render函数，如果连模板都没有会讲el编译成render函数
5.调用runtime中的$mount函数,在该方法中，会重新获取el，调用mountcomponent()
6. 在mountComponent中，触发beforemount勾子，定义updateComponents,在该方法中调用render（生成虚拟DOM）和update（把虚拟DOM转化为真实DOM并挂载到页面）
7. 创建watcher对象并传入updateComponent，调用get方法
8. 创建完watcher会调用get方法，在get方法中调用updateComponent
9. 在updateComponent中调用render方法返回虚拟DOM
10. 调用update挂载真实DOM
11. 触发mounted勾子
12. 返回vue实例
　

　

　

#### 2、请简述 Vue 响应式原理。
1. 首先对数据初始化，调用observer(value)
2. 判断value是否为对象，不是直接返回，判断value是否有__ob__,如果没有创建observer，返回observer
3. 数组响应话处理：修改数组的特殊方法（pop，push等会改变数组自身的方法），在调用这些方法时发送通知，通过数组对应的ob，在通过ob中dep的notify方法，发送通知，然后会遍历数组，对每个对象进行observe处理
4. 对象响应式处理： 对对象的每一个属性调用 defineReactive
5. 在defineReactive中对每一个属性创建dep对象，如果当前属性是对象，调用observer
6. defineReactive最主要目的为每个属性设置getter和setter，在getter中收集依赖，在setter中判断如果新设置的值是对象，调用observe，派发更新通知（调用dep.notify）
7. 收集依赖：在watcher对象的get方法中调用pushTarget记录Dep.tartget
8. 在访问data中属性的时候通过defineReative中定义的getter收集依赖，将属性对应的watcher对象添加到dep的subs数组中
9. 若果收集依赖的属性也是对象，会创建childOb为子对象收集依赖
10. 当数据发声变化是会调用dep.notify发送通知，调用watcher的update方法，
11. 调用queueWatcher 中判断watcher是否被处理，如果没有处理添加值queue队列毛病刷新队列
12. 清空上一次依赖，触发activied勾子和update勾子

　

　

　

#### 3、请简述虚拟 DOM 中 Key 的作用和好处。
使用key可以最大限度的复用，diff算法中会通过key和tag来对比两个节点是不是相同节点，如果是相同节点，则会对比子节点或文本内容，如果相同直接复用，如果没有key则默认所又key都相同，只会判断tag，会使本来可以复用的元素无法复用
　

　

　

#### 4、请简述 Vue 中模板编译的过程。

1. 调用complie函数
2. 将template转换为AST语法树
3. 标记AST tree重点静态sub trees
4. 检测到静态子树，设置为静态（不需要在每次重新渲染时重新生成该节点,在patch阶段跳过静态子树）
5. AST tree通过generate函数生成js创建代码(字符串形式)
6. 将generate函数中生成的字符串形式js代码转化为函数
 
　

　