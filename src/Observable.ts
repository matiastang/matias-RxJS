/*
 * @Author: tangdaoyong
 * @Date: 2021-06-07 16:40:36
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-08 10:59:14
 * @Description: Observable
 */
import { Observable, Observer } from 'rxjs';

/**
 * 取消订阅函数
 */
const observableOne$ = new Observable<number>((observer) => {
    console.log('setInterval')
    let number = 0
    let id = setInterval(() => {
        observer.next(number++)
    }, 1000)
    return () => {
        console.log('clearInterval')
        clearInterval(id)
    }
})

let subscriptionOne  = observableOne$.subscribe({
    next: (value: number) => {
        console.log(`observer1${value}`)
    },
    error: (err: any) => {
        console.log(`observer1${err}`)
    },
    complete: () => {
        console.log('完成1')
    }
})

setTimeout(() => {
    subscriptionOne.unsubscribe()
}, 5000);

// 创建 观察者 实现 Observer 接口
class observer implements Observer<number> {
    next = (value: number) => {
        console.log(`observer2${value}`)
    }
    error = (err: any) => {
        console.log(`observer2${err}`)
    }
    complete = () => {
        console.log('完成2')
    }
}
let subscriptionTwo = observableOne$.subscribe(new observer)
setTimeout(() => {
    subscriptionTwo.unsubscribe()
}, 5000);

/*
冷源
*/
// const count$ = new Observable((observer) => {
//     observer.next(`时间${Date.now()}`)
// })
// count$.subscribe((value) => {
//     console.log(`冷源value1=${value}}`)
// })
// setTimeout(() => {
//     count$.subscribe((value) => {
//         console.log(`冷源value2=${value}`)
//     })
// }, 1000);
/*
第一个先订阅，先执行。第二个后订阅，后执行，同样是从开始执行。
value1=0
value1=1
value2=0
value1=2
value2=1
value1=3
value2=2
value1=4
value2=3
value1=5
value2=4
value1=6
value2=5
value1=7
value2=6
value1=8
value2=7
*/

/*
热源 
 */
// let number = 0
// const countHot$ = new Observable((observer) => {
//     setInterval(() => {
//         observer.next(number++);
//     }, 1000);
// })
// countHot$.subscribe((value) => {
//     console.log(`热源value3=${value}`)
    
// })
// setTimeout(() => {
//     countHot$.subscribe((value) => {
//         console.log(`热源value4=${value}`)
//     })
// }, 1000);