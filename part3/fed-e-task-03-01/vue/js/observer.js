class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk (data) {
        // 判断data是否为对象
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    }
    defineReactive(obj, key, val) {
        this.walk(val);
        const that = this;
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return val;
            },
            set(newValue) {
                if (newValue === val) {
                    return;
                }
                val = newValue;
                that.walk(newValue);
                dep.notify();
            }
        })
    }
}