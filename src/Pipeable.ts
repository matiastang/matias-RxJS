/*
 * @Author: tangdaoyong
 * @Date: 2021-06-08 10:58:53
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-08 11:13:56
 * @Description: Pipeble
 */
import { range } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

const source$ = range(0, 10);

source$.pipe(
  filter((x: number) => {
      return x % 2 === 0
  }),
  map((x: number) => {
    return x + x
  }),
  scan((acc: number, x: number) => {
    return acc + x
  }, 0)
)
.subscribe(x => console.log(x))