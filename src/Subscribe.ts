/*
 * @Author: tangdaoyong
 * @Date: 2021-06-07 21:22:49
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-07 21:27:18
 * @Description: Subscribe
 */
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
