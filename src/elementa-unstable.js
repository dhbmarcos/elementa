window.elementa = {
    /**
     * Stores loaded HTML templates, indexed by tag name.
     * 
     * @type {Object.<string, HTMLTemplateElement>}
     */
    "templates": {},
    
    "render": {
        
        /**
         * Renders a template by tag name, applying properties and children.
         * 
         * @param {string} tag                           Tag name of the custom element/template.
         * @param {Object.<string, any>} [properties={}] Object with property values, mapped by id.
         * @param {Array<Node>} [children=[]]            Child nodes to be rendered inside #inner or the root.
         * 
         * @returns {Element|null} The rendered DOM node or null if not found.
         */
        "tag": function(tag, properties, children) {
            if (typeof properties === "undefined") {
                properties = {};
            }
            if (typeof children === "undefined") {
                children = [];
            }

            let template = window.elementa.templates[tag];
            if (!template)
            {
                return null;
            }

            let clone = template.content.cloneNode(true);
            let root  = clone.querySelector(tag);

            for (let property in properties) {
                if (!properties.hasOwnProperty(property)) {
                    continue
                };
                
                let target = root.querySelector("#" + property);
                if (target) {
                    let value = properties[property];
                    if (value instanceof Node) {
                        target.innerHTML = "";
                        target.appendChild(value);
                    } else {
                        target.textContent = value;
                    }
                }
            }

            if (children.length > 0) {
                let container = root.querySelector("#inner") || root;
                for (let child of children) {
                    container.appendChild(child);
                }
            }

            return root;
        },

        /**
         * Loads all templates in the document and renders matching tags.
         * Should be called once after DOM is loaded.
         */        
        "page": function() {
            
            /**
             * Extracts attribute properties from an element as a plain object.
             * 
             * @param {Element} element - The DOM element.
             * 
             * @returns {Object.<string, string>} Object with attribute names and values.
             */
            function extract_properties(element)
            {
                let properties = {};
                for (let attribute of element.attributes) {
                    properties[attribute.name] = attribute.value;
                }
                return properties;
            }

            /**
             * Loads all <template> tags in the document into elementa.templates.
             */
            function load_templates()
            {
                window.elementa.templates = {};
                let templates = document.querySelectorAll("template");

                for (let template of templates) {
                    let element = template.content.firstElementChild;
                    if (element && element.tagName) {
                        window.elementa.templates[element.tagName.toLowerCase()] = template;
                    }
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

                        let properties = extract_properties(original_element);
                        let children   = [];
                        for (let child of original_element.children)
                        {
                            let inner_properties = extract_properties(child);
                            children.push(window.elementa.render.tag(child.tagName.toLowerCase(), inner_properties));
                        }

                        let new_element = window.elementa.render.tag(tag, properties, children);
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
