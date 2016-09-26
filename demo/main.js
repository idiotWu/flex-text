'use strict';
var size = document.querySelector('#size');
var dollar = document.querySelector('#dollar');
var spacing = document.querySelector('#spacing');
var container = document.querySelector('.dollar');

var sizeVal = document.querySelector('#size-val');
var dollarVal = document.querySelector('#dollar-val');
var spacingVal = document.querySelector('#spacing-val');

var intPart = document.querySelector('.integer');
var floatPart = document.querySelector('.float');
var dotPart = document.querySelector('.dot');

var flexText = new FlexText({
    container: container,
    styles: { fontFamily: 'Helvetica, Arial, "Hiragino Sans GB", "Microsoft YaHei", "WenQuan Yi Micro Hei", sans-serif' },
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
    attachEvent(size, type, function () {
        var value = size.value;
        container.style.width = value + 'px';
        sizeVal.textContent = sizeVal.innerText = value;
        flexText.update();
    });
    attachEvent(spacing, type, function () {
        var value = spacing.value;
        spacingVal.textContent = spacingVal.innerText = value;
        flexText.extendStyles({ spacing: value });
        flexText.update();
    });
    attachEvent(dollar, type, function () {
        var value = dollar.value;
        var p = value.split('.');
        dollarVal.textContent = dollarVal.innerText = value;
        intPart.textContent = intPart.innerText = p[0];
        floatPart.textContent = floatPart.innerText = p[1];
        dotPart.textContent = dotPart.innerText = p[1] ? '.' : '';
        flexText.update();
    });
});
