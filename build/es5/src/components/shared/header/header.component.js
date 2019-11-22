'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require('../../component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 *  <div class="header">
 *      <left-button class="left"></left-button>
 *      <span class="header-title">{title}</span>
 *      <span class="header-sub-title">{sub title}</span>
 *      <right-button class="right"></right-button>
 *  </div>
 */
var HeaderComponent = exports.HeaderComponent = function (_Component) {
    _inherits(HeaderComponent, _Component);

    function HeaderComponent(utils, title) {
        var subTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var rightButton = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var leftButton = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

        _classCallCheck(this, HeaderComponent);

        var _this = _possibleConstructorReturn(this, (HeaderComponent.__proto__ || Object.getPrototypeOf(HeaderComponent)).call(this, utils));

        _this.title = title;
        _this.subTitle = subTitle;
        _this.className = className;
        _this.rightButton = rightButton;
        _this.leftButton = leftButton;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(HeaderComponent, [{
        key: 'render',
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: '_createElement',
        value: function _createElement() {
            var header = this.utils.createDiv(['header', this.className]);
            if (this.leftButton) {
                this.leftButton.addClass('left');
                header.appendChild(this.leftButton.element);
            }
            var titleElem = this.utils.createSpan(['header-title']);
            titleElem.innerText = this.title;
            header.appendChild(titleElem);
            if (this.subTitle) {
                var subTitleElem = this.utils.createSpan(['header-sub-title']);
                subTitleElem.innerText = this.subTitle;
                header.appendChild(subTitleElem);
            }
            if (this.rightButton) {
                this.rightButton.addClass('right');
                header.appendChild(this.rightButton.element);
            }
            return header;
        }
    }]);

    return HeaderComponent;
}(_component.Component);
//# sourceMappingURL=header.component.js.map
