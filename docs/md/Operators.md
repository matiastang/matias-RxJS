<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-07 21:34:56
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-08 16:00:36
 * @Description: Operators
-->
# Operators

[Observable 多播和单播](https://zhuanlan.zhihu.com/p/33225623)
[RxJS: 6个你必须知道的操作符](https://zhuanlan.zhihu.com/p/27997606)
[RxJS: 如何使用 refCount](https://zhuanlan.zhihu.com/p/33621290)
[RxJS核心解析——Observable](https://zhuanlan.zhihu.com/p/38133091)
[multicasting 变更](https://rxjs.dev/deprecations/multicasting)
[RxJS API](https://rxjs.dev/api)

## 介绍

### concat

按顺序订阅 Observables，但是只有当一个完成并让我知道，然后才会开始下一个
当顺序很重要时，使用此操作符，例如当你需要按顺序的发送 HTTP 请求时。

```ts
/**
 * concat
 */
// 模拟 HTTP 请求
const getPostOne$ = timer(3000).pipe(
    mapTo({id: 1})
)
const getPostTwo$ = timer(1000).pipe(
    mapTo({id: 2})
)
concat(getPostOne$, getPostTwo$).subscribe(res => console.log(res));
```

### forkJoin

`forkJoin` 是 Rx 版的 `Promise.all()` 。
```ts
const getPostOne$ = Rx.Observable.timer(1000).mapTo({id: 1});
const getPostTwo$ = Rx.Observable.timer(2000).mapTo({id: 2});

Rx.Observable.forkJoin(getPostOne$, getPostTwo$).subscribe(res => console.log(res)) 
```
别让我知道直到所有的 Observables 都完成了，然后再一次性的给我所有的值。(以数组的形式)
当你需要并行地运行 Observables 时使用此操作符

### mergeMap
const post$ = Rx.Observable.of({id: 1});
const getPostInfo$ = Rx.Observable.timer(3000).mapTo({title: "Post title"});

const posts$ = post$.mergeMap(post => getPostInfo$).subscribe(res => console.log(res));
首先，我们得理解 Observables 世界中的两个术语:

源 (或外部) Observable - 在本例中就是 `post$` Observable 。
内部 Observable - 在本例中就是 `getPostInfo$` Observable 。
仅当内部 Obervable 发出值时，通过合并值到外部 Observable 来让我知道。

### pairwise
// 追踪页面滚动增量
Rx.Observable
  .fromEvent(document, 'scroll')
  .map(e => window.pageYOffset)
  .pairwise()
  .subscribe(pair => console.log(pair)); // pair[1] - pair[0]
当 Observable 发出值时让我知道，但还得给我前一个值。(以数组的形式)

页面滚动…
**注意**从输入 Observable 的第二个值开始触发。

### switchMap
const clicks$ = Rx.Observable.fromEvent(document, 'click');
const innerObservable$ = Rx.Observable.interval(1000);

clicks$.switchMap(event => innerObservable$)
                    .subscribe(val => console.log(val));
**类似于 mergeMap，但是当源 Observable 发出值时会取消内部 Observable 先前的所有订阅 。**

在我们的示例中，每次我点击页面的时，先前的 `interval` 订阅都会取消，然后开启一个新的。

### combineLatest
const intervalOne$ = Rx.Observable.interval(1000);
const intervalTwo$ = Rx.Observable.interval(2000);

Rx.Observable.combineLatest(
    intervalOne$,
    intervalTwo$ 
).subscribe(all => console.log(all));
**当任意 Observable 发出值时让我知道，但还要给我其他 Observalbes 的最新值。(以数组的形式)**
例如当你需要处理应用中的过滤器时，此操作符非常有用。

### map

map操作符和js数组里的map差不多，都是传入一个callback，执行callback回传新值

### filter

执行函数返回值为false就过滤掉

### mapTo

mapTo是把传进来的值改写成为一个固定值
```ts
const getPostOne$ = timer(3000).pipe(
    mapTo({id: 1})
)
```

### filter

filter操作符和js数组里的filter也差不多，都是传入一个call back，执行callback，根据回传的boolean值过滤源数据，再回传新值。

### publish

### publishReplay

### share

### shareReplay

在 RxJS 5.4.0 版本中引入了 shareReplay 操作符。它与 publishReplay().refCount() 十分相似，只是有一个细微的差别。

与 share 类似， shareReplay 传给 multicast 操作符的也是 subject 的工厂函数。这意味着当重新订阅源 observable 时，会使用工厂函数来创建出一个新的 subject 。但是，只有当前一个被订阅 subject 未完成的情况下，工厂函数才会返回新的 subject 。

publishReplay 传给 multicast 操作符的是 ReplaySubject 实例，而不是工厂函数，这是影响行为不同的原因。

对调用了 publishReplay().refCount() 的 observable 进行重新订阅，subject 会一直重放它的可重放通知。但是，对调用了 shareReplay() 的 observable 进行重新订阅，行为未必如前者一样，如果 subject 还未完成，会创建一个新的 subject 。所以区别在于，使用调用了 shareReplay() 的 observable 的话，当引用计数归零时，如果 subject 还未完成的话，可重放的通知会被冲洗掉。

根据我们看过的这些示例，可以归纳出如下使用准则:

refCount 可以与 publish 及其变种一起使用，从而自动地取消源 observable 的订阅。
当使用 refCount 来自动取消已完成的源 observable 的订阅时，publishReplay 和 publishLast 的行为会如预期一样，但是，对于后来的订阅，publish 和 publishBehavior 的行为并没太大帮助，所以你应该只使用 publish 和 publishBehavior 来自动取消订阅。
当使用 refCount 来自动取消未完成的源 observable 的订阅时，publish、publishBehavior 和 publishRelay 的行为都会如预期一样。
shareReplay() 的行为类似于 publishReplay().refCount()，在对两者进行选择时，应该根据在对源 observable 进行重新订阅时，你是否想要冲洗掉可重放的通知。
上面所描述的 shareReplay 的行为只适用于 RxJS 5.5 之前的版本。在 5.5.0 beta 中，shareReplay 做出了变更: 当引用计数归零时，操作符不再取消源 observable 的订阅。

这项变化立即使得引用计数变得多余，因为只有当源 observable 完成或报错时，源 observable 的订阅才会取消订阅。这项变化也意味着只有在处理错误时，shareReplay 和 publishReplay().refCount() 才有所不同:

如果源 observable 报错，publishReplay().refCount() 返回的 observable 的任何后来订阅者都将收到错误。
但是，shareReplay 返回的 observable 的任何后来订阅者都将产生一个源 observable 的新订阅。

### 选择器

#### take

获取Observable前几个数然后结束（执行complete方法）

#### first

取第一个数然后结束，和take(1)效果一样
first(): 发出首个值和完成通知。

first(predicate): 根据断言函数检查每个值，如果函数返回 `true`，则发出值和完成通知。

#### last

last是take Last（1）的简写，目的是取最后一个值。

#### takeLast

takeLast和take用法一样，区别是该方法是取后边几个值

### 创建Observable

#### create

#### of

#### from

#### fromEvent

#### fromPromise

#### never

#### empty

#### throw

#### interval

#### timer

### 控制数据流

#### takeUntil

参数为一个Observable,当参数Observable订阅发生，终止takeUntil绑定的observable。
```ts
const click = fromEvent(document.body, "click");
const source = interval(1000).pipe(takeUntil(click));

source.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
// 0
// 1
// 2
// 3
// complete 当点击body
```

#### takeWhile

takeWhile(predicate): 通过断言函数来测试发出的值，如果一旦函数返回 `false`，则完成 observable 。

#### skip

使用方式类似take，take是取前几个，skip的意思是跳过前几个，取后边几个。

**注意**获取前三个值的时间还是要等待的。

#### startWith

塞一个初始值给Observable

#### concat
串行
concat和concatAll效果是一样的，区别在于 concat要传递参数，参数必须是Observable类型。
concat 将多个observable串接起来前一个完成好了，再执行下一个。

#### merge
并行
merge使用方式和concat一样，区别就是merge处理的Observable是异步执行的，没有先后顺序。

#### delay

delay会将observable第一次发出订阅的时间延迟

#### delaywhen

delayWhen和delay不同，他的延迟时间由参数函数决定，并且会将主订阅对象发出的值作为

#### throttle
节流
跟 debounce 的不同是 throttle 會先開放送出元素，等到有元素被送出就會`沈默一段時間`，等到時間過了又會继续发送元素,防止某个事件频繁触发，影响效率。

#### debounce
防抖
debounce 在每次收到元素，他会先把元素 cache 住并等待一段时间，如果這段時間內已經沒有收到任何元素，則把元素送出；如果這段時間內又收到新的元素，則會把原本 cache 住的元素釋放掉並重新計時，不斷反覆。

#### distinct

distinct会和已经拿到的数据比较过`滤掉重复的元素`
distinct第一个参数是个函数，函数返回值就是distinct比较的值
但是distinct底层是创建一个set来辅助去重，如果数据很大，可能导致set过大，这个时候就需要设置distinct第二个参数来刷新set，第二个 参数是个observable到发起订阅的时候就会清空set

#### distinctUntilChanged

distinctUntilChanged与distinct不同之处就是，distinctUntilChanged只会比较相邻两次输入

### 错误处理

#### catch

catch当在订阅过程中发现错误后就会调用，然后结果就会发送给订阅者的方法
catch方法结果不一定只能回传observable，还可以回传Promise或者是类数组（迭代器）等

同时catch第二个参数可以传入当前的主Observable，我门可以直接用参数进行操作，完成一些功能，例如重新发起订阅：

#### retry

retry控制Observable发生错误的时候可以重复发起订阅。
当retry传入参数的时候就表示Observable最多重复发起几次，如果还不成功就执行Observable的error方法。

#### retryWhen

retryWhen会将发生的错误封装成一个Observable发送给retryWhen的函数，可以在其中进行很多操作，例如发送错误信息给技术人员，判断哪地方发生错误。下边的例子中为发生错误后延迟一秒在重复订阅

### 操作数据

#### scan

[scan](https://rxjs.dev/api/operators/scan)

用于封装和管理状态。在建立初始状态后，将累加器（或“reducer 函数”）应用于来自源的每个值 - 通过seed值（第二个参数）或来自源的第一个值。
就像reduce，但是每次更新后都会发出当前的累积状态

```ts
scan<V, A, S>(accumulator: (acc: V | A | S, value: V, index: number) => A, seed?: S): OperatorFunction<V, V | A>
```

#### repeat

很多时候如果Observable没有发生错误，我门也希望可以重复发起订阅，这个时候就要用到repeat方法了，repeat用法和retry基本一样

#### groupBy

groupBy类似数据库中的group命令一样

### 协调多个Observable

#### combineLatest

协调多个observable，参数Observable中有一个发生变化都会发起订阅（前提是每个observable都有值）。
当conbineLatest没有传入第二个参数，返回的订阅值是个数组，但是conbineLatest可以传入第二个参数，在发给Observabler进行数据处理。

#### withLatestFrom

withLatestFrom和combineLatest用法很类似，withLatestFrom主要特点是只有在，主Observable发起值的时候才会发动订阅，不过如果副Observable没有发送过值，也不会发起订阅

#### zip

和combineLatest用法基本一样，主要作用也是协调几个observable，zip的特点是只会取几个observable对应的index的值进行计算

#### switchMap

switch在rxjs6中只有switchMap
switch对比merge和concat有个特点就是附属observable发起订阅后会立刻解绑主observable。

#### mergeMap

mergeMap同样是mergeAll加上map

#### concatMap

concatMap就是map加上concatAll

### 改变数据流结构

#### concatAll

将传递过来的Observable进行处理，一个个进行订阅，前边的处理完再处理后边的Observable，这样原本类似为二维数组的结构就变成一维数组了。

#### mergeAll

mergeAll和concatAll用法基本一致，区别在于mergeAll是并行处理Observable

### 缓存

#### buffer

buffer是将主observable发出的值先缓存起来，在依赖的observable发起订阅的时候在将值发出。

#### bufferTime

使用bufferTime更简单,设定时间，在规定时间内缓存值，到时间发出去

#### bufferCount

除了时间控制缓存以外我们还可以用个数控制，这就用到了bufferCount

#### window

和buffer一样都是现缓存数据等到一定条件然后发送数据，不同的是window会缓存数据到observable中

```ts
var click = fromEvent(document.body, "click");
var source = interval(1000);

const example = source.pipe(
  rxjs.operators.window(click
                       ),
  map((o)=> o.pipe(take(3))),
  mergeAll()
)

example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
```

#### windowToggle

windowToggle相对于widnow多了一个参数为回调函数，用来标志结束条件

## 自定义操作符

