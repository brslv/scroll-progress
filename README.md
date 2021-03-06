# Scroll Progress · [![install size](https://packagephobia.now.sh/badge?p=@brslv/scroll-progress)](https://packagephobia.now.sh/result?p=@brslv/scroll-progress) ![](https://img.shields.io/github/license/brslv/scroll-progress.svg) ![](https://img.shields.io/github/issues/brslv/scroll-progress.svg) ![](https://img.shields.io/badge/dependencies-0-brightgreen.svg) ![](https://img.shields.io/badge/custom%20elements-hell%20yeah!-yellow.svg)

A tiny vanilla custom component, which renders a small progress bar on the top of a vertical scrolling page.

Zero dependencies. 👌

No node, browser only.

## Usage

Import the package.

```javascript
import '@brslv/scroll-progress';
```

Then, simply use it in your DOM (just bellow the `<body>` tag, for example).

```html
<body>
    <scroll-progress></scroll-progress>

    <!-- Other stuff... -->
</body>
```

That's it. 👍

## Configurations

### color
Any valid css color prop. For example, `red`, `#333` or `#acacac`.

### height
Any valid css height prop: `5px`, `10%`, `5em`.

### position
`top` or `bottom`.

### Example configuration:

```html
<scroll-progress color="#333222" height="3px" position="bottom"></scroll-progress>
```

## API

### [element].pause()

Pause the scroll-progress updates.

```javascript
const element = document.querySelector('scroll-progress');

element.pause();
```

### [element].resume()

Resume the scroll-progress updates.

```javascript
element.resume();
```

### [element].show()
Show the scroll-progress bar.

```javascript
element.show();
```

### [element].hide()
Hide the scroll-progress bar.

```javascript
element.hide();
```

### [element].toggleHidden()
Toggle the hidden status of the scroll-progress bar.

```javascript
element.toggleHidden();
```

## Events

The `<scroll-element>` emits the following events:

### scroll-detected

Dispatches, when the scroll-progress detects a window scroll event.

Resulting `event.detail` object contains:

* `percentage` - the scroll percentage, when the event occured
* `paused` - if the scroll-progress updates are being paused, when the event occured
* `hidden` - if the scroll-progress bar is hidden 

```javascript
const element = document.querySelector('scroll-progress');
element.addEventListener('scroll-detected', ({ detail }) => {
    const { percentage, paused, hidden } = detail;
});
```

### update

Dispatches, when the scroll-progress bar updates. The difference between `scroll-detected` and `update` events is that the `update` happens when the scroll-progress is not paused. If it's paused, then only `scroll-detected` is fired, but `update` is not.

Resulting `event.detail` object contains:

* `percentages` - the scroll percentage, when the event occured
* `hidden` - if the scroll-progress bar is hidden

```javascript
const element = document.querySelector('scroll-progress');
element.addEventListener('update', ({ detail }) => {
    const { percentage, hidden } = detail;

    /* You don't have the paused prop here (like in the "scroll-detected" event), because updates happen only when the scroll-progress is not being paused. */
});
```

## FAQ
**Can I use this with React/Angular/Vue/Whatever-modern-framework?**

Yep, you can.
For example, in a react application, you can simply render this as any other built-in DOM element:
```html
<div>
    <scroll-progress></scroll-progress>

    {/* Other components bellow */}

    <MyCustomComponent />
</div>
```

**Which browsers do you support.**

This is built on top of the [custom elements specification](https://www.webcomponents.org/specs). That's why you should take into consideration the following [browser support table](https://caniuse.com/#feat=custom-elementsv1) for *Custom Elements v1*.

Enjoy! ⭐️

## License

MIT License

Copyright (c) 2019 Borislav Grigorov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.