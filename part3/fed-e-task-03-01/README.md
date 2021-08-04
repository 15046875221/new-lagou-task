## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
答：非响应式，可通过this.$set方法设置，使用$set是会对属性进行响应式处理（通告defineReactive函数）然后通过notify()方法通知观察者
 　

　

　



### 2、请简述 Diff 算法的执行过程
1.diff 算法接受新旧vnode两个参数
2.判断新旧节点是否有text属性,如果新节点有text属性，赋值给新节点的textContent属性，同时判断老节点是否有children属性,如果有的化删除老节点对子元素
3.判断新老节点是否有children属性，当新老节点有children切不相等时，对比所有子节点并更新dom
节点对比四种情况：
3.1 旧开始，新开始： 对比开始节点，如果相同则，开始索引++，继续对比， 不同则进入第二种情况
3.2 旧结束，新结束： 对比结束节点， 相同， 结束索引--， 继续对比， 不同进入第三中
3.3 旧开始，新结束： 对比开始节点与技术节点，相同，则将旧开始节点移到末尾，更新索引， 不同向下执行
3.4 旧结束，新开始： 对比节点，相同则间结束节点移到开通，更新索引，不同继续向下，
3.5 将新节点与老节点进行依次对比，相同则将老节点移动至开始索引处
3.6 若遍历最终新节点有剩余，插入至末尾
3.7 老节点有剩余，则删除多余
4.如果只有新节点有children属性，清空对应dome元素的textContent，添加所有子节点
5.只有老节点有children熟悉，移除所有老节点，
6. 只有老节点有text属性，清除对应dom元素的textContent


　

　


## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

 　

　

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

 　

　

### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

<img src="images/Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449.png" alt="Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449" style="zoom:50%;" />

