# flex-text

[![npm](https://img.shields.io/npm/v/flex-text.svg?style=flat-square)](https://www.npmjs.com/package/flex-text)
[![npm](https://img.shields.io/npm/dt/flex-text.svg?style=flat-square)](https://www.npmjs.com/package/flex-text)
[![npm](https://img.shields.io/npm/l/flex-text.svg?style=flat-square)](https://www.npmjs.com/package/flex-text)

Mastering font-size like flexbox for **IE 8+**:

```
font-size A:B:C:D = 1:2:1:1
```

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
    spacing: 0,
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

You may get white spaces around flex items when they are layouted as `inline-block`, here's a little trick to it:

```css
.container {
    letter-spacing: -0.31em;
}

.item {
    letter-spacing: normal;
}
```

### Canvas vs Legacy Element

This plugin does text measuring with `<span>` element. As a result, the newly created `<span>` element must be inserted into document so that we can measure boundings. Text measuring with canvas is easier and will calculate at a higher performace. However, using legacy elements keeps us away from incompatibility :)

That's also the reason why I wrote it in es5 flavor.

## APIs

### new FlexText()

```ts
type FlexItem = {
    elem: Element,
    flex: number, // flex ratio, likes css `flex-grow` property
}

type FlexTextOptions = {
    container?: Element,
    spacing?: number,
    items?: FlexItem[],
}

class FlexText {
    constructor(options?: FlexTextOptions);

    update(): void;
    setSpacing(value: number): void;
    attachTo(container: Element): void;
    addItem(elem: Element, flex: number = 1): void;
    removeItem(elem: Element): void;
    clear(): void;
    alloc(): Array<{
        elem: Element,
        fontSize: number,
    }>;
}
```

Construct new instance with supported options:

| Field       | Type         | Description            |
| ----------- | ------------ | ---------------------- |
| `container` | `Element`    | The element that contains all flex items. You can set container later by calling `instance.attachTo()`. |
| `spacing`   | `number`     | White space between each item. You can also modify spacing by calling `instance.setSpacing()`. |
| `items`     | `FlexItem[]` | A list of all flex items inside. You can also add single flex item by calling `instance.addItem()`. |

### instance.update()

```ts
instance.update(): void
```

Updates DOM layout at next frame.

### instance.setSpacing()

```ts
instance.setSpacing(value: number): void
```

Changes white space between flex items.

### instance.attachTo()

```ts
instance.attachTo(container: Element): void
```

Sets the container element.

### instance.addItem()

```ts
instance.addItem(elem: Element, flex: number = 1): void
```

Adds single flex item.

### instance.removeItem()

```ts
instance.removeItem(elem: Element): void
```

Removes specified item from list.

### instance.clear()

```ts
instance.clear(): void
```

Removes all flex items.

### instance.alloc()

```ts
instance.alloc(): Array<{
    elem: Element,
    fontSize: number,
}>
```

Calculates font sizes for all flex items. This method **WILL NOT** update DOM layout.

## License

MIT.
