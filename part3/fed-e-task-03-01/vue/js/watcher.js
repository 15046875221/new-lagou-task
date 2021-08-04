class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        Dep.target = this;
        // 触发get方法，在get方法中会调用addSub
        this.oldValue = vm[key];
        Dep.target = null;
    }
    update() {
        let newValue = this.vm[this.key];
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue);
    }
}