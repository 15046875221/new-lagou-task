class Vue {
    constructor(options) {
        this.$options = options || {};
        this.$data = options.data || {};
        this.$methods = options.methods || {};
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
        this._proxyData(this.$data);
        this._proxyData(this.$methods);
        console.log(this, 7777)
        new Observer(this.$data);
        // 调用Complier
        new Complier(this);
    }
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key];
                },
                set(newValue) {
                    if (newValue === data[key]) {
                        return;
                    }
                    data[key] = newValue;
                }
            })
        })
    }
}