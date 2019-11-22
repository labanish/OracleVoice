'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Base class for components
 */
var Component = function () {
    function Component(utils) {
        _classCallCheck(this, Component);

        this.utils = utils;
    }
    /**
     * Add css class to the component element
     * @param {string} className
     */


    _createClass(Component, [{
        key: 'addClass',
        value: function addClass(className) {
            this.element.classList.add(this.utils.getCssClassWithPrefix(className));
        }
    }, {
        key: 'hide',

        /**
         * Hide/Show the component
         * @param {boolean} hide
         */
        value: function hide() {
            var _hide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (_hide) {
                this.orgDisplayStyle = this.element.style.display;
                this.element.style.display = 'none';
            } else {
                this.element.style.display = this.orgDisplayStyle;
            }
        }
        /**
         * Remove the element from the DOM
         */

    }, {
        key: 'remove',
        value: function remove() {
            this.element.remove();
        }
        /**
         * Add the component element as a last child to the parent element
         * @param {HTMLElement} parent
         */

    }, {
        key: 'appendToElement',
        value: function appendToElement(parent) {
            parent.appendChild(this.element);
        }
        /**
         * Put current component element as the first child of provided element
         * @param {HTMLElement} parentElement to put as the first child to
         */

    }, {
        key: 'prependToElement',
        value: function prependToElement(parentElement) {
            var firstChild = parentElement.firstChild;
            if (firstChild) {
                parentElement.insertBefore(this.element, firstChild);
            } else {
                parentElement.appendChild(this.element);
            }
        }
        /**
         * Add provided element as last child to the component element
         * @param {HTMLElement} child
         */

    }, {
        key: 'appendContentChildElement',
        value: function appendContentChildElement(child) {
            this.getContentElement().appendChild(child);
        }
    }, {
        key: 'appendContentChild',
        value: function appendContentChild(child) {
            this.getContentElement().appendChild(child.element);
        }
    }, {
        key: 'getContentElement',
        value: function getContentElement() {
            return this.element;
        }
    }]);

    return Component;
}();
//# sourceMappingURL=component.js.map


exports.Component = Component;
