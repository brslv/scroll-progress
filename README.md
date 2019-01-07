# Scroll Progress · [![install size](https://packagephobia.now.sh/badge?p=@brslv/scroll-progress)](https://packagephobia.now.sh/result?p=@brslv/scroll-progress) ![](https://img.shields.io/github/license/brslv/scroll-progress.svg) ![](https://img.shields.io/github/issues/brslv/scroll-progress.svg) ![](https://img.shields.io/badge/dependencies-0-brightgreen.svg) ![](https://img.shields.io/badge/custom%20elements-hell%20yeah!-yellow.svg)

A tiny vanilla custom component, which renders a small progress bar on the top of a vertical scrolling page.

Zero dependencies. 👌

No node, browser only.

### Usage

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

### Configurations
| **Prop**    | **Possible values**       |
| ----------- |---------------------------|
| color       | any valid css color prop  |
| height      | any valid css height prop |
| position    | `top` / `bottom`          |

Example:

```html
<scroll-progress color="#333222" height="3px" position="bottom"></scroll-progress>
```

### FAQ
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

### License

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