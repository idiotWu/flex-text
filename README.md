# flex-text

Mastering font-size like flexbox for **IE 8+**!

![screenshot](https://raw.githubusercontent.com/idiotWu/flex-text/master/demo/screenshot.gif)

## Demo

[http://idiotwu.github.io/flex-text/](http://idiotwu.github.io/flex-text/)

## Install

```
npm install flex-text
```

## Usage

```javascript
import FlexText from 'flex-text';

const flexText = new FlexText({
    container: document.querySelector('.container'),
    styles: {
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        spacing: 0,
    },
    items: [{
        elem: document.querySelector('.first'),
        flex: 1,
    }, {
        elem: document.querySelector('.second'),
        flex: 2,
    }, ...]
});
```

## Important Notes

### Unwanted white space:

You may get white spaces around flex items when they're layouted as `inline-block`, here's a little trick to it:

```css
.container {
    letter-spacing: -0.31em;
}

.item {
    letter-spacing: normal;
}
```

### Canvas vs Legacy Element

This plugin does text measuring with `<span>` element. As a result, the created `<span>` element must be inserted into document so that we can measure boundings. Text measuring with canvas is easier and will calculate at a higher performace. However, using legacy elements keeps us from incompatibility :)

That's also the reason why I wrote it in es5 flavor.

## APIs

### new FlexText(options: object)

Construct new instance with supported options:

#### container: element

The element that holds all flex items.

#### styles: object

Basic styles for text rendering:

```javascript
{
    fontFamily: string,  // css font-family string
    fontWeight: string,  // css font-weight string
    spacing: number,     // spacing around each flex item
}
```

You can also extend styles by calling `instance#extendStyles()`.

#### items: array

A list of flex items:

```javascript
[{
    elem: element,  // the flex item
    flex: number,   // flex factor, like css flex-grow property
}, ...]

You can also add single flex item by calling `instance#addItem()`.

### FlexText.setDefaultStyles(styles: object)

Extend the default styles which is:

```javascript
{
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    spacing: 0,
}
```

### instance#extendStyles(styles: object)

Extend styles on current instance.

### instance#addItem(item: object)

Add single flex item.

### instance#alloc()

Measuring font-size and returning the result like:

```javascipt
[16.123124, 68.12351, ...]
```

### instance#update()

Update DOM layout at next frame.

## License

MIT.
