# Elementa

Elementa – Lightweight and Minimal HTML Microframework

Is a lightweight and extensible client-side template engine for rendering custom HTML tags based on `<template>` elements.
It makes creating reusable, nested UI components in plain HTML and JavaScript simple and elegant—no build tools or frameworks required.

## Features

- Declarative custom tags with data binding
- Supports nested components
- Ultra-light, dependency-free **(1kB minified)**
- Simple integration—just include the script

## How it Works

- Templates are defined with `<template>` elements in your HTML.
- Each template's root element tag name (e.g., card) becomes the custom tag you can use.
- Attributes on your custom tags are automatically mapped to elements inside the template with matching id attributes.
- Child elements are rendered recursively.

## Installation

Copy `elementa.js` to your project and include it in your HTML, for example:

```html
<html>
    <head>
        <!-- Your header content here -->

        <script src="elementa.js"></script>
    </head>
    <body>
        <!-- Your body content here -->
    </body>
</html>
```

You can use the CDN link for quick setup:

```html
<html>
    <head>
        <script src="https://dhbmarcos.github.io/elementa/src/elementa.min.js"></script>
    </head>
</html>
```

For specific versions, use `https://github.com/dhbmarcos/elementa/releases/download/0.1.0/elementa.min.js` .Replace `0.1.0` with the desired version number. See releases on GitHub for available versions.

## Quick Start Example

1. Include the Script

```html
<html>
    <head>
        <script src="elementa.js"></script>
    </head>
</html>
```

2. Define a Template in HTML:

```html
<template>
  <card class="card">
    <h1 id="title"></h1>
    <p id="text"></p>
    <div id="inner"></div>
    <small>by Elementa</small>
  </card>
</template>
```

3. Use Declarative Syntax

```html
<card title="Hello!" text="This is a declarative card.">
  <card title="Nested" text="This is a nested card!"></card>
</card>
```

When the page loads, elementa.js automatically replaces every custom tag (like `<card>`) matching a template with the rendered DOM.

Use the `id` attributes in your template to bind properties from the custom tag attributes. For example, the `title` attribute of `<card>` will populate the `<h1 id="title"></h1>` element inside the template.

Use the `inner` id to render child elements inside the template at position specified. If you not specify `inner`, the children will be appended to the end of the template.

## Hello World Example

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Elementa Example</title>
        <style>
            card.card {
                display:       block;
                border:        1px solid #999;
                border-radius: 8px;
                padding:       1rem;
                margin:        0.5rem;
                background:    #f8f8f8;
            }
            card.card card.card {
                background:   #e4f2ff;
                border-color: #3399cc;
            }
        </style>
        
        <!-- Script included in the head! -->
        <script src="https://dhbmarcos.github.io/elementa/src/elementa.min.js"></script>
    </head>
    <body>

        <!-- Template definition -->
        <template>
            <card class="card">
                <h1 id="title"></h1>
                <p id="text"></p>
                <div id="inner"></div>
                <small>by Elementa</small>
            </card>
        </template>

        <!-- Declarative use of custom elements -->
        <card title="Header script" text="Elementa.">
            <card title="Nested card" text="It works perfectly!"></card>
        </card>
    </body>
</html>
```

## Manual Rendering Example (via JavaScript)

You can also generate cards programmatically using JavaScript:

```javascript
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

# API

> **elementa.render.tag**(*tag*, *properties*, *children*)

Renders a component by template tag name.

Parameters:

- *string* **tag**: (required) The tag name of your custom element, e.g. "card".
- *Object* **properties**: (optional) Object mapping property names to values.
- *Array*  **children**: (optional) Array of child Nodes.

Returns: The rendered DOM Element or *null*.

# License

MIT License.
