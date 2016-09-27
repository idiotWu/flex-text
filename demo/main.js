'use strict';
var width = document.querySelector('#width');
var dollar = document.querySelector('#dollar');
var spacing = document.querySelector('#spacing');
var container = document.querySelector('.dollar');

var widthVal = document.querySelector('#width-val');
var dollarVal = document.querySelector('#dollar-val');
var spacingVal = document.querySelector('#spacing-val');
var ratioVal = document.querySelector('#ratio-val');

var intPart = document.querySelector('.integer');
var floatPart = document.querySelector('.float');
var dotPart = document.querySelector('.dot');

var flexText = new FlexText({
    container: container,
    items: [
        {
            elem: document.querySelector('.symbol'),
            flex: 1,
        },
        {
            elem: intPart,
            flex: 2,
        },
        {
            elem: dotPart,
            flex: 1,
        },
        {
            elem: floatPart,
            flex: 1,
        },
    ],
});

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

function attachEvent(elem, type, handler) {
    if (typeof elem.addEventListener === 'function') {
        return elem.addEventListener(type, handler);
    }

    elem.attachEvent('on' + type, handler);
}

forEach([
    'input',
    'change',
], function (type) {
    attachEvent(width, type, function () {
        var value = width.value;
        container.style.width = value + 'px';
        widthVal.textContent = widthVal.innerText = value;
        flexText.update();
    });
    attachEvent(spacing, type, function () {
        var value = spacing.value;
        spacingVal.textContent = spacingVal.innerText = value;
        flexText.setSpacing(value);
        flexText.update();
    });
    attachEvent(dollar, type, function () {
        var value = dollar.value;
        var p = value.split('.');
        dollarVal.textContent = dollarVal.innerText = value;
        intPart.textContent = intPart.innerText = p[0] || '';
        floatPart.textContent = floatPart.innerText = p[1] || '';
        dotPart.textContent = dotPart.innerText = p[1] ? '.' : '';
        flexText.update();
    });
});

var ratios = document.querySelectorAll('.flex-ratio');

forEach(ratios, function (el) {
    forEach([
        'input',
        'change',
    ], function (type) {
        attachEvent(el, type, function () {
            var vals = map(ratios, function (e, i) {
                flexText.items[i].flex = parseFloat(e.value);

                return e.value;
            });

            ratioVal.textContent = ratioVal.innerText = vals.join(':');

            flexText.update();
        });
    });
});
