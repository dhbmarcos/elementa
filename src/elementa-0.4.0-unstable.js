/*
 * Copyright (c) 2025 D. H. B. Marcos. Deo omnis gloria.
*/

window.elementa = {
    /**
     * Stores loaded HTML templates, indexed by tag name.
     *
     * @type {Object.<string, HTMLTemplateElement>}
     */
    "templates": {},

    "render": {

        /**
         * Renders a template by template idetification, applying attributes and children.
         *
         * @param {string} template                      Template idetification of the custom element/template.
         * @param {Object.<string, any>} [attributes={}] Object with attribute values, mapped by id.
         * @param {Array<Node>} [children=[]]            Child nodes to be rendered inside #inner or the root.
         *
         * @returns {Element|null} The rendered DOM node or null if not found.
         */
        "tag": function(template, attributes, children) {
            if (!attributes) {
                attributes = {};
            }
            if (!children) {
                children = [];
            }

            template = window.elementa.templates[template.toUpperCase()];
            if (!template)
            {
                return null;
            }

            let clone = template.cloneNode(true);

            for (let attribute in attributes) {
                let target = clone.querySelector("#" + attribute);
                if (target) {
                    let value = attributes[attribute];
                    target.innerHTML = value;
                }
            }

            if (children.length > 0) {
                let container = clone.querySelector("#inner") || clone;
                if (children instanceof Array) {
                    for (let child of children) {
                        container.appendChild(child);
                    }
                } else if (children instanceof Node) {
                    container.appendChild(children);
                } else {
                    let child = document.createElement("spam", children);
                    child.innerHTML = children;
                    container.appendChild(child);
                }
            }

            return clone;
        },

        /**
         * Loads all templates in the document and renders matching tags.
         * Should be called once after DOM is loaded.
         */
        "page": function() {

            /**
             * Extracts attribute attributes from an element as a plain object.
             *
             * @param {Element} element - The DOM element.
             *
             * @returns {Object.<string, string>} Object with attribute names and values.
             */
            function extract_attributes(element)
            {
                let attributes = {};
                for (let attribute of element.attributes) {
                    attributes[attribute.name] = attribute.value;
                }
                return attributes;
            }

            /**
             * Loads all <template> tags in the document into elementa.templates.
             */
            function load_templates()
            {
                window.elementa.templates = {};
                for (let template of document.querySelectorAll("template")) {
                    let id  = template.getAttribute("id");
                    let tag = template.getAttribute("tag");
                    if (!id && !tag) {
                        continue;
                    }
                    if (!tag) {
                        tag = id;
                    }
                    tag = document.createElement(tag);

                    for (let attribute of template.attributes) {
                        if (attribute.name == "id") {
                            continue;
                        }
                        tag.setAttribute(attribute.name, attribute.value);
                    }

                    let content = template.innerHTML;
                    if (content) {
                        tag.innerHTML = content;
                    }

                    window.elementa.templates[id.toUpperCase()] = tag;
                }
            }

            /**
             * Processes all declarative custom tags in the document,
             * rendering them using the corresponding template and replacing them in the DOM.
             */
            function render_tags()
            {
                for (let template of Object.keys(window.elementa.templates)) {
                    for (let tag of document.querySelectorAll(template)) {
                        if (tag.closest("template")) {
                            continue;
                        }

                        let attributes = extract_attributes(tag);
                        let children   = [];
                        for (let child of tag.children)
                        {
                            let inner_attributes = extract_attributes(child);
                            children.push(window.elementa.render.tag(child.tagName, inner_attributes));
                        }

                        let new_content = window.elementa.render.tag(template, attributes, children);
                        tag.replaceWith(new_content);
                    }
                }
            }

            load_templates();
            render_tags();
        }
    }
}

/**
 * Automatically loads and renders declarative custom tags when the window loads.
 */
window.addEventListener("load", elementa.render.page);
