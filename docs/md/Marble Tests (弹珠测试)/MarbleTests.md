<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-08 14:41:58
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-08 16:36:46
 * @Description: Marble Tests (弹珠测试)
-->
# Marble Tests (弹珠测试)

[弹珠测试](https://cn.rx.js.org/manual/usage.html#h12)

## 介绍

中期与前期最显著的一道分水岭就是对于 `Marble Tests (弹珠测试)` 的掌握。

弹珠测试是个什么鬼？它其实是专门负责 `RxJS` 单元测试的 `DLS (Domain Specific Language 领域专用语言)`。它大概长成这个样子：

var e1 = hot('----a--^--b-------c--|');
var e2 = hot(  '---d-^--e---------f-----|');
var expected =      '---(be)----c-f-----|';

expectObservable(e1.merge(e2)).toBe(expected);
不会弹珠测试你讲面临以下情况：

* 完全看不懂别人写的操作符的单元测试代码
* 无法完全深入透彻的了解每个操作符
* 没有办法为自己写的新操作符编写单元测试代码
* 无法向 RxJS 官方库贡献操作符
所以，必须要学会弹珠测试，才能在 RxJS 这条路上继续走下去。

但目前由于这方面的资料很少，唯一可以参考的就是官方提供的 [编写弹珠测试](https://link.zhihu.com/?target=http%3A//cn.rx.js.org/manual/usage.html) ，后面我们 [RxJS 中文社区](https://link.zhihu.com/?target=https%3A//github.com/RxJS-CN) 也会出相关文章，以帮助大家更好的理解弹珠测试。

## 基础方法

单元测试添加了一些辅助方法，以使创建测试更容易。

* `hot(marbles: string, values?: object, error?: any)` - 创建一个“热的” Observable (Subject)，它将在测试开始时表现得 好像已经在“运行中”了。一个有趣的不同点是 hot 弹珠允许使用^字符来标志“零帧”所在处。这正是 Observables 订阅的起始点， 同时也是测试的起始点。
* `cold(marbles: string, values?: object, error?: any)` - 创建一个“冷的” Observable ，当测试开始时它便开始订阅。
* `expectObservable(actual: Observable<T>).toBe(marbles: string, values?: object, error?: any)` - 当 TestScheduler flush时， 安排一个断言。在 jasmine 的 it 块结束处 TestScheduler 会自动进行 flush 。
* `expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]).toBe(subscriptionMarbles: string)` - 类似 expectObservable ，当 TestScheduler flush时，安排一个断言。cold() 和 hot() 都返回带有subscriptions 属性 (类型为 SubscriptionLog[])的 Observable 。将 subscriptions 作为参数传给 expectSubscriptions 以断言是否匹配在 toBe() 中 给定的 expectObservable 弹珠图。Subscription 的弹珠图与 Observable 的弹珠图略有不同。详情请参见下面。

## hot 和 cold 的默认行为是符合人类认知的

在 hot 和 cold 方法中，弹珠图中指定的值的字符都会作为字符串发出，除非将 values 参数传给了方法。因此：

hot('--a--b') 会发出 "a" 和 "b" ，但

hot('--a--b', { a: 1, b: 2 }) 会发出 1 和 2 。

同样的，未指明的错误就只发出默认字符串 "error"，所以：

hot('---#') 会发出错误 "error" , 但

hot('---#', null, new SpecialError('test')) 会发出 new SpecialError('test') 。

## 弹珠语法
弹珠语法是用字符串表示随“时间”流逝而发生的事件。任何弹珠字符串的首字符永远都表示“零帧”。“帧”是有点类似于虚拟毫秒的概念。

* "-" 时间: 10“帧”的时间段。
* "|" 完成: 表示 Observalbe 成功完成。这是 Observable 生产者所发出的 complete() 信号。
* "#" 错误: 终止 Observable 的错误。 这是 Observable 生产者所发出的 error() 信号。
* "a" 任意字符: 所有其他字符表示由 Observalbe 生产者所发出的 next() 信号的值。
* "()" 同步分组: 当多个事件需要在同一帧中同步地发出，用圆括号来将这些事件聚集在一起。你可以以这种形式来聚合值、完成或错误。 起始 ( 的位置决定了值发出的时间。
* "^" 订阅时间点: (只适用于热的 Observabe) 显示测试 Observable 订阅热的 Observable 的点。它是此 Observable 的“零帧”，在 ^ 前的所有帧都将是无效的。

## 示例
'-' 或 '------': 相当于 Observable.never()，或一个从不发出值或完成的 Observable

|: 相当于 Observable.empty()

#: 相当于 Observable.throw()

'--a--': 此 Observable 等待20“帧”后发出值 a ，然后永远不发出 complete

'--a--b--|: 在20帧处发出 a，在50帧处发出 b，然后在80帧处发出 complete

'--a--b--#: 在20帧处发出 a，在50帧处发出 b，然后在80帧处发出 error

'-a-^-b--|: 这是个热的 Observable ，在-20帧处发出 a，然后在20帧处发出 b ，在50帧出发出 complete

'--(abc)-|': 在20帧处发出 a、b 和 c，然后在80帧处发出 complete

'-----(a|)': 在50帧处发出 a 和 complete

## Subscription 的弹珠语法
Subscription 的弹珠语法与常见的弹珠语法略有不同。它表示随“时间”流逝而发生的订阅和取消订阅的时间点。在此类图中不应该出现其他类型的事件。

"-" 时间: 10“帧”的时间段。
"^" 订阅时间点: 显示订阅发生的时间点。
"!" 取消订阅时间点: 显示取消订阅发生的时间点。
在 Subscription 的弹珠语法中 ^ 和 ! 时间点最多只有一个。 除此之外，- 字符是唯一允许出现的字符。

## 示例
'-' 或 '------': 没有订阅发生。

'--^--': 在20帧处发生了订阅，并且订阅没有被取消。

'--^--!-: 在20帧处发生了订阅，在50帧处订阅被取消了