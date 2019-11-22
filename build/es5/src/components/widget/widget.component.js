"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WidgetComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../component");

var _loading = require("../loading/loading.component");

var _chat = require("../chat/chat.component");

var _openButton = require("../open-button/open-button.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates wrapper for the widget.
 * <div class="widget" style="{bottom, left, top, right}">
 *     <LoadingComponent/>
 *     <OpenButtonComponent/>
 *     <ChatComponent>
 * </div>
 */
var WidgetComponent = exports.WidgetComponent = function (_Component) {
    _inherits(WidgetComponent, _Component);

    function WidgetComponent(utils, settings, dataService) {
        _classCallCheck(this, WidgetComponent);

        var _this = _possibleConstructorReturn(this, (WidgetComponent.__proto__ || Object.getPrototypeOf(WidgetComponent)).call(this, utils));

        _this.settings = settings;
        _this.dataService = dataService;
        _this.isOpen = false;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(WidgetComponent, [{
        key: "render",
        value: function render(element) {}
    }, {
        key: "_createElement",
        value: function _createElement() {
            var _this2 = this;

            var div = this.utils.createDiv(['widget']);
            // set widget position
            if (this.settings.position.bottom) {
                div.style.bottom = this.settings.position.bottom;
            }
            if (this.settings.position.left) {
                div.style.left = this.settings.position.left;
            }
            if (this.settings.position.top) {
                div.style.top = this.settings.position.top;
            }
            if (this.settings.position.right) {
                div.style.right = this.settings.position.right;
            }
            this.loadingComponent = new _loading.LoadingComponent(this.utils);
            div.appendChild(this.loadingComponent.element);
            this.chatButtonComponent = new _openButton.OpenButtonComponent(this.utils, this.settings, function () {
                return _this2.showChat();
            });
            div.appendChild(this.chatButtonComponent.element);
            this.chatComponent = new _chat.ChatComponent(this.utils, this.settings, this.dataService, this.loadingComponent);
            div.appendChild(this.chatComponent.element);
            return div;
        }
    }, {
        key: "showChat",
        value: function showChat() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.element.classList.add(this.utils.getCssClassWithPrefix('open'));
                this.element.classList.remove(this.utils.getCssClassWithPrefix('close'));
            } else {
                this.element.classList.add(this.utils.getCssClassWithPrefix('close'));
                this.element.classList.remove(this.utils.getCssClassWithPrefix('open'));
            }
        }
    }]);

    return WidgetComponent;
}(_component.Component);
//# sourceMappingURL=widget.component.js.map
