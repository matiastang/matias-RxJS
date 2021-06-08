<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-07 21:22:01
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-07 21:34:10
 * @Description: Subscribe
-->
# Subscribe

## 介绍

## Subscribe

调用`Subscribe`注册监听。
**注意**`Subscribe`是同步执行的。

```ts
import { Observable } from 'rxjs';

// Subscribe是同步执行的
const observable = new Observable<number>((observer) => {
    observer.next(520)
})
console.log(`Subscribe是同步执行的=start`);
const subscription = observable.subscribe((value) => {
    console.log(`Subscribe是同步执行的=${value}`);
})
console.log(`Subscribe是同步执行的=end`);
// subscription.unsubscribe() // 可以取消
```

## Subscription

调用`Subscribe`注册监听后，返回的值是`Subscription`可以用来取消监听。
```ts
// 添加监听
const subscription = observable.subscribe((value) => {
    console.log(`${value}`);
})
// 取消监听
subscription.unsubscribe()
```

