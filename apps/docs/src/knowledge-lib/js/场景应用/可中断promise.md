# 可以中断的Promise
> 通过Promise.race，我们能够达到当传入的Promise数组中的任意一个Promise达到了解决或拒绝时，就无视Promise数组中的其他Promise的结果的目的。

```ts
interface CancellablePromiseFactory<T = unknown> extends Promise<T> {
  abort?: (reasonToAbort: any) => void;
}

function cancellablePromiseFactory(executor) {
  //用于中断Promise的方法
  let abort;
  //构造一个原始的Promise实例
  const originPromise = new Promise(executor);
  //构造一个专门用来中断的Promise实例
  const promiseToAbort = new Promise(
    //将promiseToAbort的reject赋值给abort
    (_, reject) => (abort = reasonToAbort => reject(reasonToAbort)),
  );

  //使用originPromise和promiseToAbort构造一个Promise Array，并使用Promise.race构造cancellablePromise
  const cancellablePromise: CancellablePromiseFactory = Promise.race([
    originPromise,
    promiseToAbort,
  ]);

  //将abort方法挂载到cancellablePromise上
  cancellablePromise.abort = abort;

  return cancellablePromise;
}

```