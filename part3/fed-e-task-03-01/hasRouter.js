let _Vue = null;
export default class VueRouter {
    static install (Vue) {
        if (VueRouter.installed) {
            return;
        }
        VueRouter.installed = true;
        _Vue = Vue;
        Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router;
                    this.$options.router.init();
                }
            }
        })
    }
    constructor(options) {
        this.options = options;
        this.routeMap = {};
        this.data = _Vue.observable({
            current: '/'
        })
    }
    init() {
        this.createRouteMap();
        this.initEvent();
        this.initComponents(_Vue);
    }
    createRouteMap() {
        this.options.routes.map(route => {
            this.routeMap[route.path] = route.component;
        });
    }
    initComponents(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', {
                    attrs: {
                        to: this.to
                    },
                    on: {
                        click: this.handleClick
                    }
                }, [this.$slots.default])
            },
            methods: {
                handleClick(e) {
                    e.preventDefault();
                    // history.pushState({}, '', this.to);
                    window.location.hash = this.to;
                    // this.$router.data.current = this.to;
                }
            }
        })
        const self = this;
        Vue.component('router-view', {
            props: {
                to: String
            },
            render(h) {
                console.log(self.data.current, 222)
                const component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }
    initEvent() {
        window.addEventListener('hashchange', (e) => {
            this.data.current = window.location.hash.split('#')[1];
        })
    }
}