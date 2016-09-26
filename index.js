(function umdDefine(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'b'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('b'));
    } else {
        // Browser globals
        factory(root, root.b);
    }
}(this, function factory(exports, b) {
    'use strict';

    exports.FlexText = FlexText;

    // init measuring element
    var span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.top = '99999999px';

    document.body.appendChild(span);

    var BASE_FONT_SIZE = 100;
    var DEFAULT_STYLES = {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
        spacing: 0,
    };

    function async(fn) {
        if (typeof window.requestAnimationFrame === 'function') {
            requestAnimationFrame(fn);
        } else {
            setTimeout(fn, 0);
        }
    }

    function checkElem(elem, name) {
        if (!elem || elem.nodeType !== 1) {
            throw new TypeError('expect `' + (name || 'elem') + '` to be an Element, but got ' + typeof elem);
        }

        return true;
    }

    function extend() {
        if (typeof Object.assign === 'function') {
            return Object.assign.apply(Object, arguments);
        }

        var dest = arguments[0];

        for (var i = 1, max = arguments.length; i < max; i++) {
            var src = arguments[i];

            if (!src) {
                continue;
            }

            for (var prop in src) {
                dest[prop] = src[prop];
            }
        }

        return dest;
    }

    function forEach(arr, fn) {
        if (typeof arr.forEach === 'function') {
            return arr.forEach(fn);
        }

        for (var i = 0, max = arr.length; i < max; i++) {
            fn(arr[i], i, arr);
        }
    }

    function map(arr, fn) {
        if (typeof arr.map === 'function') {
            return arr.map(fn);
        }

        var res = [];

        for (var i = 0, max = arr.length; i < max; i++) {
            res.push(fn(arr[i], i, arr));
        }

        return res;
    }

    function FlexText(options) {
        options = options || {};

        this.items = [];
        this.styles = extend({}, DEFAULT_STYLES);

        if (options.styles) {
            this.extendStyles(options.styles);
        }

        if (options.items && options.items.length) {
            var self = this;

            forEach(options.items, function (v) {
                self.addItem(v);
            });
        }

        if (options.container) {
            this.attachTo(options.container);
        }
    }

    FlexText.setDefaultStyles = function setDefaultStyles(styles) {
        return extend(DEFAULT_STYLES, styles);
    };

    FlexText.prototype.extendStyles = function extendStyles(styles) {
        extend(this.styles, styles);
        return extend({}, this.styles);
    };

    FlexText.prototype.attachTo = function attachTo(container) {
        checkElem(container, 'container');

        this.container = container;
        this.update();
    };

    FlexText.prototype.addItem = function addItem(item) {
        if (!item) return;

        checkElem(item.elem, 'elem');

        if (item.flex <= 0) {
            throw new Error('expect flex to be greater than 0, but got ' + item.flex);
        }

        this.items.push(extend({}, item));
    };

    FlexText.prototype.removeItem = function removeItem(elem) {
        checkElem(elem, 'elem');

        forEach(this.items, function (v, i, a) {
            if (elem === v.elem) {
                a.splice(i, 1);
            }
        });
    };

    FlexText.prototype.alloc = function alloc() {
        var items = this.items;
        var styles = this.styles;
        var container = this.container;

        var totalSpace = container.getBoundingClientRect().width;

        var widths = [];
        var totalWidth = 0;

        var whiteSpaceCount = items.length - 1;

        span.style.fontWeight = styles.fontWeight;
        span.style.fontFamily = styles.fontFamily;

        forEach(items, function (item) {
            var elem = item.elem;
            var flex = item.flex;

            var text = elem.textContent;
            var fontSize = BASE_FONT_SIZE * flex;

            if (!text && whiteSpaceCount > 0) {
                whiteSpaceCount--;
            }

            span.textContent = text;
            span.style.fontSize = fontSize + 'px';

            var width = span.getBoundingClientRect().width;

            widths.push(width);
            totalWidth += width;
        });

        totalSpace -= parseFloat(styles.spacing) * whiteSpaceCount;

        return map(widths, function (w, i) {
            var flex = items[i].flex;

            var fontSize = BASE_FONT_SIZE * flex;
            var targetWidth = (w / totalWidth) * totalSpace;

            return fontSize / (w / targetWidth);
        });
    };

    FlexText.prototype.render = function render() {
        var spacing = this.styles.spacing;
        var fontFamily = this.styles.fontFamily;

        var result = this.alloc();

        forEach(this.items, function (item, idx) {
            var elem = item.elem;

            elem.style.fontFamily = fontFamily;
            elem.style.fontSize = Math.floor(result[idx]) + 'px';

            if (idx > 0) {
                elem.style.paddingLeft = spacing + 'px';
            }
        });
    };

    FlexText.prototype.update = function update() {
        var self = this;

        async(function () {
            self.render();
        });
    };
}));
