"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../component");

var _spinner = require("./spinner.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates full screen loading element.
 <div id="loading">
     <div class="backdrop"></div>
     <div class="loading-wrapper">
        {SpinnerComponent}
         <div class="content"></div>
     </div>
 </div>
 */
var LoadingComponent = exports.LoadingComponent = function (_Component) {
    _inherits(LoadingComponent, _Component);

    function LoadingComponent(utils) {
        _classCallCheck(this, LoadingComponent);

        var _this = _possibleConstructorReturn(this, (LoadingComponent.__proto__ || Object.getPrototypeOf(LoadingComponent)).call(this, utils));

        _this.element = _this._createElement();
        _this.hide();
        return _this;
    }

    _createClass(LoadingComponent, [{
        key: "render",
        value: function render(element) {}
    }, {
        key: "_createElement",
        value: function _createElement() {
            var loading = this.utils.createDiv(['loading']);
            loading.appendChild(this.utils.createDiv(['backdrop']));
            var wrapper = loading.appendChild(this.utils.createDiv(['wrapper']));
            wrapper.appendChild(new _spinner.SpinnerComponent(this.utils).render());
            this.content = wrapper.appendChild(this.utils.createDiv(['content']));
            return loading;
        }
    }, {
        key: "present",
        value: function present(message) {
            this.hide(false);
            this.setContent(message);
        }
    }, {
        key: "dismiss",
        value: function dismiss() {
            this.hide();
            this.setContent('');
        }
    }, {
        key: "getContentElement",
        value: function getContentElement() {
            return this.element;
        }
    }, {
        key: "setContent",
        value: function setContent(message) {
            this.content.innerHTML = message;
        }
    }]);

    return LoadingComponent;
}(_component.Component);
//# sourceMappingURL=loading.component.js.map
