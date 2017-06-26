/**
 * 同步队列，添加到该队列的方法都会同步执行，使用new来创建多个同步队列，依赖jQuery
 *
 * @version 1.0
 * @author liuchun on 2017/06/18
 * @example:
 *
 */
 
  function SyncQueue() {
    this.syncQueue = [];
    this.tickTimer = null;
  }

  SyncQueue.prototype = {
    nextTick: function () {
      var self = this;
      if (!self.tickTimer && self.syncQueue && self.syncQueue.length) {
        self.tickTimer = setTimeout(function () {
          if (self.syncQueue && self.syncQueue.length) {
            $.when(self.syncQueue.shift()()).always(function () {
              self.tickTimer = null;
              self.nextTick();
            });
          } else {
            self.tickTimer = null;
          }
        }, 1);
      }
    },
    // 添加同步加载任务
    addSyncTask: function (fn) {
      this.syncQueue.push(fn);
      this.nextTick();
    }
  };
