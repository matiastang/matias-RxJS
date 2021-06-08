/*
 * @Author: tangdaoyong
 * @Date: 2021-06-07 16:40:36
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-07 21:21:03
 * @Description: index
 */
import { Observable, of, Subject } from 'rxjs';

// 转换成 observables
of('a', 'b', 'c').subscribe({
    next: (value) => console.log('next:', value),
    error: (err) => console.log('error:', err),
    complete: () => console.log('the end')
});
/*
next: a
next: b
next: c
the end
 */

// 创建一个可观察对象
const observable = new Observable<number>((subscribe) => {
    // 内部产生的新事件
    subscribe.next(1)
    setTimeout(() => {
        subscribe.next(2)
    })
    subscribe.next(3)
})
// 可观察对象添加监听
observable.subscribe((value) => {
    console.log(`value=${value}`)
})
/*
value=1
value=3
value=2
*/

// 外部产生的新事件
const subject = new Subject<string>();
subject.next('外部产生的新事件-1');
subject.subscribe((value) => {
    console.log(`value=${value}`)
})
subject.next('外部产生的新事件-2');
/*
value=1
value=3
value=外部产生的新事件-2
value=2
*/