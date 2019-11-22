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
 * Base class for action components
 */
var ActionComponent = function () {
    function ActionComponent(utils, payload) {
        _classCallCheck(this, ActionComponent);

        this.utils = utils;
        this.disabled = false;
        this.type = payload.type;
        this.label = payload.label;
        this.imageUrl = payload.imageUrl;
    }

    _createClass(ActionComponent, [{
        key: 'render',
        value: function render() {
            this.htmlElement = this.utils.createAnchor();
            this.htmlElement.onclick = this.handleOnClick.bind(this);
            if (this.label) {
                this.htmlElement.innerText = this.label;
            } else {
                var img = this.utils.createImage(this.imageUrl);
                this.htmlElement.appendChild(img);
            }
            return this.htmlElement;
        }
    }, {
        key: 'handleOnClick',
        value: function handleOnClick(event) {
            if (this.onActionClick && !this.disabled) {
                var _event = {
                    type: this.type,
                    getPayload: this.getEventPayload.bind(this),
                    label: this.label
                };
                this.onActionClick(_event);
            }
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.disabled = true;
            this.htmlElement.classList.add(this.utils.getCssClassWithPrefix('disabled'));
        }
    }]);

    return ActionComponent;
}();

exports.ActionComponent = ActionComponent;
//# sourceMappingURL=action.component.js.map
