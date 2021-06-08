/*
 * @Author: tangdaoyong
 * @Date: 2021-06-07 22:33:14
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-08 09:21:08
 * @Description: file content
 */
import { Observable, timer, concat } from 'rxjs';
import { map, mapTo, filter, publish } from 'rxjs/operators';

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
