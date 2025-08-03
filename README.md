# Elementa

Elementa – Lightweight and Minimal HTML Microframework

Is a lightweight and extensible client-side template engine for rendering custom HTML tags based on `<template>` elements.
It makes creating reusable, nested UI components in plain HTML and JavaScript simple and elegant—no build tools or frameworks required.

## Features of Elementa

- Declarative custom tags with data binding
- Supports nested components
- Ultra-light, dependency-free **(1kB minified)**
- Simple integration—just include the script

## How Elementa Works

- Templates are defined with `<template>` elements in your HTML.
- Each template's root element tag name (e.g., card) becomes the custom tag you can use.
- Attributes on your custom tags are automatically mapped to elements inside the template with matching id attributes.
- Child elements are rendered recursively.

## Hello World Elementa!

1. Create a simple HTML file.

2. Add content below to the file:

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Elementa Example</title>
            <style>
                card {
                    display:       block;
                    border:        1px solid #999;
                    border-radius: 8px;
                    padding:       1rem;
                    margin:        0.5rem;
                    background:    #f8f8f8;
                }
                card card {
                    background:   #e4f2ff;
                    border-color: #3399cc;
                }
            </style>
            
            <!-- Script included in the head! -->
            <script src="https://elementa.js.org/dist/0.3.0.js"></script>
        </head>
        <body>

            <!-- Template definition -->
            <template id="card" class="card">
                <h1 id="title"></h1>
                <p id="text"></p>
                <div id="inner"></div>
                <small>by Elementa</small>
            </template>

            <!-- Declarative use of custom elements -->
            <card title="Header script" text="Elementa.">
                <card title="Nested card" text="It works perfectly!"></card>
            </card>
        </body>
    </html>
    ```

3. Open the file in your web browser.

## How to Install Elementa

### Online CDN

Use the CDN link for quick setup:

```html
<script src="https://elementa.js.org/dist/0.3.0.js"></script>
```

Replace `0.3.0` with the desired version number. See GitHub repository for available versions.

### Offline

Download [elementa-0.3.0.min.js](dist/elementa-0.3.0.min.js) to your project and include it in your HTML, for example:

```html
<script src="elementa-0.3.0.min.js"></script>
```

## How to Use Elementa

1. Include the Script

    ```html
    <html>
        <head>
            <script src="https://elementa.js.org/dist/0.3.0.js"></script>
        </head>
    </html>
    ```

2. Define a Template in HTML:

    ```html
    <template id="card" class="card">
        <h1 id="title"></h1>
        <p id="text"></p>
        <div id="inner"></div>
        <small>by Elementa</small>
    </template>
    ```

3. Use Declarative Syntax

    ```html
    <card title="Hello!" text="This is a declarative card.">
        <card title="Nested" text="This is a nested card!"></card>
    </card>
    ```

When the page loads, elementa.js automatically replaces every custom tag (like `<card>`) matching a template with the rendered DOM. Use the `id` attribute in the `<template>` to define your custom tag name, like `card` in the example above.

Use the `id` attributes in your template to bind properties from the custom tag attributes. For example, the `title` attribute of `<card>` will populate the `<h1 id="title"></h1>` element inside the template.

Use the `inner` id to render child elements inside the template at position specified. If you not specify `inner`, the children will be appended to the end of the template.

## JavaScript API

You can also generate cards programmatically using JavaScript:

```js
<script>
    window.addEventListener("load", function() {
        // Create a child card
        let child = elementa.render.tag("card", {
            title: "JS Child",
            text: "Created in JavaScript"
        });

        // Create a parent card and nest the child inside
        let parent = elementa.render.tag("card", {
            title: "JS Parent",
            text: "Includes another card"
        }, [child]);

        document.body.appendChild(parent);
    });
</script>
```

# Elementa API

## Rendering Templates

> **elementa.render.tag**(*tag*, *properties*, *children*)

Renders a component by template tag name.

Parameters:

- *string* **tag**: (required) The tag name of your custom element, e.g. "card".
- *Object* **properties**: (optional) Object mapping property names to values.
- *Array*  **children**: (optional) Array of child Nodes.

Returns: The rendered DOM Element or *null*.

# About Elementa

## Versioning

> Currently, Elementa is in **unstable** state. It is ready for testing and production in limited scope, but not recommended for critical applications yet.

Elementa uses [Semantic Versioning](https://semver.org/) for releases. The version number is in the format `MAJOR.MINOR.PATCH`. Elementa uses STRL (Simplest Readiness Level) for versioning definitions of maturity level, like below:

- **undefided**: Have a indefinitions in code, product or market. Not ready for production.
- **unstable**: In development. Ready for tests or production in limited scope.
- **stable**: Ready for production in general use.

## License

### MIT License

Copyright (c) 2025 D. H. B. Marcos. Deo omnis gloria.

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
