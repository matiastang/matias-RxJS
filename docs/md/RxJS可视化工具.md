<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-09 14:57:45
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-09 15:05:39
 * @Description: 可视化工具
-->
# 可视化工具

[可视化工具](https://zhuanlan.zhihu.com/p/27795028)

## RxViz

[RxViz](https://link.zhihu.com/?target=https%3A//github.com/moroshko/rxviz)

这款可视化工具是由 facebook 的 Misha Moroshko 开发。RxViz 可以简洁的可视化给定的 Observable. 你提供的 RxJS 代码会被执行，如果最后一个表达式是 Observable， 一个带着动画的可视化会出现在眼前。同时，你可以通过修改时间窗口来控制动画的速率，也可以将可视化 svg 复制下来用于你想用的地方，你同样可以将可视化分享给其他人。

## RxMarbles

[RxMarbles](https://github.com/staltz/rxmarbles)
[演示地址](https://rxmarbles.com/#delay)

这个库不得不推荐啊，这是响应式大神 staltz 的作品。和前面库最大的不同是, Observable 的每个 item 是可交互的，你可以拖拽，然后整个 Observable 都会做出相应的改变。

## RxVision

[RxVision](https://link.zhihu.com/?target=https%3A//github.com/jaredly/rxvision)

推荐这款 RxVision 可视化的工具时，我的内心是纠结的。个人来讲，我非常喜欢它，但是，尴尬的是作者已经不维护了，擦。但是，它还有一个不得不推荐的理由。请容我慢慢道来。

相信[这篇文章](https://link.zhihu.com/?target=https%3A//gist.github.com/staltz/868e7e9bc2a7b8c1f754)是所有前端响应式的殿堂级入门文章，中文也有人翻译再加工过。文章中的例子，也是经典，详细阐述了如何用“响应式”的思想构建业务逻辑，而 RxVision 对这个例子进行了可视化，没错，是下图这个样子的。
所以，我们可以结合这篇文章 和 RxVision 更好的理解 RxJS 的开发模式。