'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spinner = require('../../../loading/spinner.component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents loading component
 */
var LoadingMessageComponent = function () {
    function LoadingMessageComponent(text, side, utils) {
        _classCallCheck(this, LoadingMessageComponent);

        this.text = text;
        this.side = side;
        this.utils = utils;
    }
    /**
     * Renders the loading message elements
     * <div class="loading-message">
     *     <div class="message-bubble right | left">
     *        <div class="message-content">
     *             {SpinnerComponent}
     *            <span>{text}</span>
     *        </div>
     *     </div>
     *     <div class="clear"></div>
     * </div>
     * @return {HTMLElement}
     */


    _createClass(LoadingMessageComponent, [{
        key: 'render',
        value: function render() {
            this.element = this.utils.createDiv(['loading-message', this.side]);
            var bubble = this.utils.createDiv(['message-bubble']);
            var content = this.utils.createDiv(['message-content']);
            content.appendChild(new _spinner.SpinnerComponent(this.utils).render());
            var text = this.utils.createSpan();
            text.innerText = this.text;
            content.appendChild(text);
            bubble.appendChild(content);
            this.element.appendChild(bubble);
            this.element.appendChild(this.utils.createDiv(['clear']));
            return this.element;
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.element.remove();
        }
    }]);

    return LoadingMessageComponent;
}();

exports.LoadingMessageComponent = LoadingMessageComponent;
//# sourceMappingURL=loading-message.component.js.map
