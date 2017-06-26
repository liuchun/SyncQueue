# SyncQueue
同步执行队列

# 用法
```javascript
var syncQueue = new SyncQueue();

function anyPromiseFn(){
  return $.Deferred(function (dtd) {
    dtd.resolve();
  }).promise();
}

// add task
syncQueue.addSyncTask(anyPromiseFn.bind(null));
```
