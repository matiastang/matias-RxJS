/*
 * @Author: tangdaoyong
 * @Date: 2021-06-09 11:01:44
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-09 11:43:29
 * @Description: Schedulers调度
 */
import { of, from, asapScheduler, asyncScheduler, queueScheduler, animationFrameScheduler, scheduled } from 'rxjs'
import { combineLatestWith, map } from 'rxjs/operators'

/**
 * 递归调度器
 */

const a$ = of(1, 2)
const b$ = of(3)

const c$ = a$.pipe(
    combineLatestWith(b$),
    map(([value1, value2]) => {
        return value1 + value2
    })
)

c$.subscribe((value) => {
    console.log(`递归调度器${value}`)
})

/**
 * asap 调度器
 */

const d$ = scheduled(from([1, 2]), asapScheduler)
const e$ = of(3)

const f$ = d$.pipe(
    combineLatestWith(e$),
    map(([value1, value2]) => {
        return value1 + value2
    })
)

f$.subscribe((value) => {
    console.log(`asap 调度器${value}`)
})