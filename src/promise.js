/**
 * const p1 = new Promsise(()=>{})
 */
class MyPromsise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    this.status = MyPromsise.PENDING;
    this.result = null;
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    }catch(err) {
      this.resolve(err);
    }
  }
  resolve(result) {
    if (this.status === MyPromsise.PENDING) {
      this.status = MyPromsise.FULFILLED;
      this.result = result;

      this.fulfilledCallbacks.forEach(fn => fn())
    }
  }
  reject(result) {
    if (this.status === MyPromsise.PENDING) {
      this.status = MyPromsise.REJECTED;
      this.result = result;

      this.rejectedCallbacks.forEach(fn => fn())
    }
  }
  resolvePromise(promise1, x, resolve, reject) {
    if (promise1 === x) {
      return reject('错误');
    }
    // 只执行一次
    let called;
    if ((typeof x === 'object' && x !== null) || x === 'function') {
      try{
        let then = x.then;
        if (typeof then === 'function') {
          then.call(x, y => {
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise1, y, resolve, reject); 
          }, r => {
            if (called) return;
            called = true;
            reject(r);
          })
        } else {
          resolve(x);
        }
      }catch(err) {
        if (called) return;
          called = true;
          reject(err)
      }
    } else {
      resolve(x);
    }
  }
  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ?  onResolved : v => v;
      onRejected = typeof onRejected === 'function' ? onRejected : err => { throw Error(err)};
    const promise1 = new MyPromsise((resolve, reject) => {

      if (this.status === MyPromsise.PENDING) {
        this.fulfilledCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x = onResolved(this.result);
              this.resolvePromise(promise1, x, resolve, reject);
            }catch(err) {
              reject(err)
            }
          })
        });
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x = onRejected(this.result);
              this.resolvePromise(promise1, x, resolve, reject);
            }catch(err) {
              reject(err)
            }
          })
        });
      }
      if (this.status === MyPromsise.FULFILLED) {
        setTimeout(() => {
          try{
            let x = onResolved(this.result);
            this.resolvePromise(promise1, x, resolve, reject);
          }catch(err){
            reject(err);
          }
        })
      }
      if (this.status === MyPromsise.REJECTED) {
        setTimeout(() => {
          try{
            let x = onRejected(this.result);
            this.resolvePromise(promise1, x, resolve, reject)
          }catch(err) {
            reject(err);
          }
        })
      }
    })
    return promise1;
  }
}

console.log('第一')

const p1 = new MyPromsise((resolve, reject) => {
  console.log('第二')
  setTimeout(() => {
    // reject('失败')
    resolve('成功')
  })
})

console.log('第三')

p1.then().then((result) => {
  console.log('--->',result)
}, (result) => {
  console.log(result);
})

// 组合式api、option api
// 有methods、computed、watch、data等页面语法处理页面逻辑
// 随着组件功能增大时，关联性大大降低，代码阅读困难
// 逻辑过多时会出现this指向不明
// 代码出错时，自动检测和类型检测是失效的，因为本身不是有效的js代码

// 有利于代码重用，没有对this的使用
// 不受模版和组件范围限制，可以准确的知道我们可以使用哪些属性
// 几乎是函数，编辑器可以帮我们进行类型检查和建议
// 代码可读性更高，后期维护性也更高