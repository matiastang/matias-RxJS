<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-01 17:09:34
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-09 14:55:18
 * @Description: RxJS
-->
# RxJS

[RxJS](https://github.com/ReactiveX/RxJS)
[RxJS 7 中文开发文档](https://github.com/zlq4863947/rxjs-cn)
[RxJS优秀翻译文章](https://github.com/RxJS-CN/rxjs-articles-translation)
[RxJS 学习线路推荐](https://zhuanlan.zhihu.com/p/27877381)
[译】RxJS 入门](https://zhuanlan.zhihu.com/p/62098043)
[RxJS 学习](https://www.zhihu.com/column/learing-rxjs)
[[译] RxJS 高级缓存](https://zhuanlan.zhihu.com/p/42264563)
[RxJS 实战篇（一）拖拽](https://zhuanlan.zhihu.com/p/27518034)

[Ben Lesh](https://link.zhihu.com/?target=https%3A//github.com/benlesh) : RxJS 5 领导者、布道者，常出没于各种公开场合公然宣讲 RxJS
[André Staltz](https://link.zhihu.com/?target=https%3A//github.com/staltz) : 简称 staltz，RxJS 5 核心贡献者、布道者、响应式编程先驱者，RxJS 模范导师

## 介绍

"everything is a stream"

RxJS 是一个库，它通过使用 observable 序列来编写异步和基于事件的程序。它提供了一个核心类型 Observable，附属类型 (Observer、 Schedulers、 Subjects) 和受 [Array#extras] 启发的操作符 (map、filter、reduce、every, 等等)，这些数组操作符可以把异步事件作为集合来处理。

> 可以把 RxJS 当做是用来处理事件的 Lodash 。

Rxjs的内容可以概括为`一个核心三个重点`，核心就是`Observable`和`Operators`，三个重点分别是：
* observer
* Subject
* schedulers

`operator`一直是我门学习`Rxjs`路上的拦路虎，文章主体内容也将是围绕这部分内容讲解。

## 基本概念

### Observable (可观察对象)

* 表示一个概念，这个概念是一个可调用的未来值或事件的集合。

### Observer (观察者)

* 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。

### Subscription (订阅)

* 表示 Observable 的执行，主要用于取消 Observable 的执行。

### Operators (操作符)

* 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。

### Subject (主体)

* 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。

### Schedulers (调度器)

* 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他。