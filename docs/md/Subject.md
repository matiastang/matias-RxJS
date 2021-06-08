<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-07 18:09:40
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-08 13:53:25
 * @Description: Subject
-->
# Subject

## 介绍

`Subject`即使`observable`，因为它可以`subscribe observer`。
也是`observer`,因为它可以被`observable subscribe`。

**注意**`subject`是一个`hot observable`。

`Subject`分为`ReplaySubject`和`BehaviorSubject`。
1. `ReplaySubject`：这种`Subject`会保留最新的`n`个值，把过去发生的事件进行重播。
2. `BehaviorSubject`：是`ReplaySubject`的特殊形式。 保留`最新的一个值`。只记住最新的值。

## 特殊的Subject

### AsyncSubject

只有在订阅complete时候调用，在结束的时候会传送一下最后的一个值

### ReplaySubject

在新订阅的时候会发送最后几个值，参数就是返回最后的几个

### BehaviorSubject
每次有新订阅的时候都会发送给它当前的最新值

## Subject多播

### multicast

利用multicast这个operator方法直接就可以利用subject的广播特性，需要注意的是使用multicast，只有配合connect方法，才会发起订阅

### refount

使用multicast方法后**只有取消订阅multicast产生的observable才会终止订阅。
使用refcount后的observable当上边有订阅后会自动打开广播功能，当没有订阅后，会自动关闭。这样就不需要特意关闭广播Observable，也不需要刻意使用connect。

### publish

multicast(new Rx.Subject())在rxjs中有个方法punish。
publish也可以配合subject三种变形，rxjs分别封装了对应的方法：publishReplay、publishBehavior、publishLast

### share

另外 publish + refCount 可以在簡寫成 share

