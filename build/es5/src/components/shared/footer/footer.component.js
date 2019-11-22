'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FooterComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require('../../component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * The component creates footer toolbar element
 *  <div class="footer">
 *      <div class="toolbar">
 *          {content}
 *      </div>
 *  </div>
 */
var FooterComponent = exports.FooterComponent = function (_Component) {
    _inherits(FooterComponent, _Component);

    function FooterComponent(utils, className) {
        _classCallCheck(this, FooterComponent);

        var _this = _possibleConstructorReturn(this, (FooterComponent.__proto__ || Object.getPrototypeOf(FooterComponent)).call(this, utils));

        _this.className = className;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(FooterComponent, [{
        key: 'render',
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: '_createElement',
        value: function _createElement() {
            var footer = this.utils.createDiv(['footer']);
            var toolbar = this.utils.createDiv(['toolbar']);
            this.content = toolbar;
            footer.appendChild(toolbar);
            return footer;
        }
    }, {
        key: 'getContentElement',
        value: function getContentElement() {
            return this.content;
        }
    }]);

    return FooterComponent;
}(_component.Component);
//# sourceMappingURL=footer.component.js.map
