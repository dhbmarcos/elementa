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
         * Renders a template by tag name, applying attributes and children.
         *
         * @param {string} tag                           Tag name of the custom element/template.
         * @param {Object.<string, any>} [attributes={}] Object with attribute values, mapped by id.
         * @param {Array<Node>} [children=[]]            Child nodes to be rendered inside #inner or the root.
         *
         * @returns {Element|null} The rendered DOM node or null if not found.
         */
        "tag": function(tag, attributes, children) {
            if (typeof attributes === "undefined") {
                attributes = {};
            }
            if (typeof children === "undefined") {
                children = [];
            }

            let template = window.elementa.templates[tag.toUpperCase()];
            if (!template)
            {
                return null;
            }

            let clone = template.cloneNode(true);

            for (let attribute in attributes) {
                let target = clone.querySelector("#" + attribute);
                if (target) {
                    let value = attributes[attribute];
                    if (value instanceof Node) {
                        target.innerHTML = "";
                        target.appendChild(value);
                    } else {
                        target.textContent = value;
                    }
                }
            }

            if (children.length > 0) {
                let container = clone.querySelector("#inner") || clone;
                for (let child of children) {
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
                let templates = document.querySelectorAll("template");

                for (let template of templates) {
                    let id = template.getAttribute("id");
                    if (!id) {
                        continue;
                    }
                    let tag = document.createElement(id);

                    let attributes = template.attributes;
                    for (let attribute of attributes) {
                        if (attribute.name == "id") {
                            continue;
                        }
                        tag.setAttribute(attribute.id, attribute.value);
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
                let tags = Object.keys(window.elementa.templates);
                for (let tag of tags) {
                    let original_elements = document.querySelectorAll(tag);
                    for (let original_element of original_elements) {
                        if (original_element.closest("template")) {
                            continue;
                        }

                        let attributes = extract_attributes(original_element);
                        let children   = [];
                        for (let child of original_element.children)
                        {
                            let inner_attributes = extract_attributes(child);
                            children.push(window.elementa.render.tag(child.tagName, inner_attributes));
                        }

                        let new_element = window.elementa.render.tag(tag, attributes, children);
                        original_element.replaceWith(new_element);
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
