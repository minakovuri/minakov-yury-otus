async function promiseReduce(asyncFunctions, reduce, initialValue) {
    let memo = initialValue
  
    const iterator = asyncFunctions[Symbol.iterator]()
    
    async function callOneAsyncFn() {
        const next = iterator.next()
        const asyncFn = next.value
        const done = next.done
        
        if (done) {
            return memo
        }
        
        try {
            const asyncFnResult = await asyncFn()
            memo = reduce(memo, asyncFnResult)
            return callOneAsyncFn()
        } catch {
            return memo
        }
    }
    
    return callOneAsyncFn()
  }