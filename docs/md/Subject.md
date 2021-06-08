<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-07 18:09:40
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-07 18:15:45
 * @Description: Subject
-->
# Subject

`Subject`即使`observable`，因为它可以`subscribe observer`。
也是`observer`,因为它可以被`observable subscribe`。

**注意**`subject`是一个`hot observable`。

`Subject`分为`ReplaySubject`和`BehaviorSubject`。
1. `ReplaySubject`：这种`Subject`会保留最新的`n`个值，把过去发生的事件进行重播。
2. `BehaviorSubject`：是`ReplaySubject`的特殊形式。 保留`最新的一个值`。只记住最新的值。