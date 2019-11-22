"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OpenButtonComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../component");

var _iconButton = require("../shared/icon-button/icon-button.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * The component create open chat button element on the web page
 * <IconButtonComponent class="chat-button">
 */
var OpenButtonComponent = exports.OpenButtonComponent = function (_Component) {
    _inherits(OpenButtonComponent, _Component);

    function OpenButtonComponent(utils, settings, onOpen) {
        _classCallCheck(this, OpenButtonComponent);

        var _this = _possibleConstructorReturn(this, (OpenButtonComponent.__proto__ || Object.getPrototypeOf(OpenButtonComponent)).call(this, utils));

        _this.settings = settings;
        _this.onOpen = onOpen;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(OpenButtonComponent, [{
        key: "render",
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: "_createElement",
        value: function _createElement() {
            var openButton = new _iconButton.IconButtonComponent(this.utils, this.onOpen.bind(this), this.settings.openIcon, 'chat-button');
            return openButton.element;
        }
    }]);

    return OpenButtonComponent;
}(_component.Component);
//# sourceMappingURL=open-button.component.js.map
