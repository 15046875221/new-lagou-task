class Complier {
    constructor(vm) {
        this.el = vm.$el;
        this.vm = vm;
        this.complie(this.el)
    }
    complie(el) {
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isTextNode(node)) {
                this.complieText(node)
            }
            else if(this.isElementNode(node)) {
                this.complieElemet(node)
            }

            if (node.childNodes && node.childNodes.length) {
                this.complie(node);
            }
        })
    }
    complieElemet(node) {
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                attrName = attrName.substr(2);
                let key = attr.value;
                if (this.isEventDirective(attrName)) {
                    attrName = attrName.substr(3);
                    this.update(node, key, 'on', attrName);
                }
                else {
                    this.update(node, key, attrName);
                }
            }
        })
    }
    update(node, key, attrName, event) {
        let updateFn = this[attrName + 'Updater'];
        updateFn && updateFn.call(this, node, this.vm[key], key, event);
    }
    textUpdater(node, value, key) {
        node.textContent = value;
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue;
        })
    }
    modelUpdater(node, value, key) {
        node.value = value;
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        node.addEventListener('input', () => {
            this.vm[key] = node.value;
        })
    }
    htmlUpdater(node, value, key) {
        node.innerHTML = value;
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }
    onUpdater(node, value, key, event) {
        node.addEventListener(event, () => {
            value.call(this.vm)
        })
    }
    complieText(node) {
        let reg = /\{\{(.+?)\}\}/;
        let value = node.textContent;
        if (reg.test(value)) {
            let key = RegExp.$1.trim();
            node.textContent = value.replace(reg, this.vm[key]);

            //创建watcher
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    isDirective(attrName) {
        return attrName.startsWith('v-');
    }
    isEventDirective(attrName) {
        console.log(attrName)
        return attrName.startsWith('on:');
    }
    isTextNode(node) {
        return node.nodeType === 3;
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
}