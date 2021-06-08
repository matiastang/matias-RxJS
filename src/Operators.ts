/*
 * @Author: tangdaoyong
 * @Date: 2021-06-07 22:33:14
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-08 15:41:24
 * @Description: file content
 */
import { Observable, timer, concat, interval } from 'rxjs';
import { map, mapTo, filter } from 'rxjs/operators';

/*
自定义操作符
*/

/**
 * 获取间隔n的值
 * @param n 
 * @returns 
 */
const takeEveryNth = (n: number) => <T>(source: Observable<T>) => {
    return new Observable<T>((observer) => {
        let count = 0
        return source.subscribe({
            next: (value: T) => {
                if (count++ % n === 0) {
                    observer.next(value)
                }
            },
            error: (err: any) => {
                observer.error(err)
            },
            complete: () => {
                observer.complete()
            }
        })
    })
}

interval


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


