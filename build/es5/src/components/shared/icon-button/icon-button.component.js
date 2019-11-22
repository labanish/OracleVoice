"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconButtonComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../../component");

var _icon = require("../icon/icon.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates a button with icon element
 * <button class="button icon-button {className}">
 *     <IconComponent>
 * </button>
 */
var IconButtonComponent = exports.IconButtonComponent = function (_Component) {
    _inherits(IconButtonComponent, _Component);

    function IconButtonComponent(utils, onClick, imgSrc) {
        var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

        _classCallCheck(this, IconButtonComponent);

        var _this = _possibleConstructorReturn(this, (IconButtonComponent.__proto__ || Object.getPrototypeOf(IconButtonComponent)).call(this, utils));

        _this.onClick = onClick;
        _this.imgSrc = imgSrc;
        _this.className = className;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(IconButtonComponent, [{
        key: "render",
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: "_createElement",
        value: function _createElement() {
            var _this2 = this;

            var button = this.utils.createButton(['button', 'icon-button', this.className]);
            button.onclick = function () {
                return _this2.onClick(button.innerText);
            };
            var icon = new _icon.IconComponent(this.utils, this.imgSrc);
            button.appendChild(icon.element);
            return button;
        }
    }]);

    return IconButtonComponent;
}(_component.Component);
//# sourceMappingURL=icon-button.component.js.map
