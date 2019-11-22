"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _message = require("../message.component");

var _card = require("./card.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts card message payload to component
 */
var CardMessageComponent = function (_MessageComponent) {
    _inherits(CardMessageComponent, _MessageComponent);

    function CardMessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, CardMessageComponent);

        var _this = _possibleConstructorReturn(this, (CardMessageComponent.__proto__ || Object.getPrototypeOf(CardMessageComponent)).call(this, utils, settings, payload, side));

        _this.cards = [];
        _this.layout = payload.layout;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = payload.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var card = _step.value;

                _this.cards.push(new _card.CardComponent(_this.utils, card));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return _this;
    }
    /**
     * Renders dom from component object
     * <div class="card-message card-message-horizontal | card-message-vertical">
     *    <div class="card-message-content">
     *        <div class="card-message-cards">
     *            {cards}
     *        </div>
     *        <div class="message-actions">{actions}</div>
     *    </div>
     *    <div class="message-global-actions">{globalActions}</div>
     * </div>
     * @return {HTMLElement}
     */


    _createClass(CardMessageComponent, [{
        key: "render",
        value: function render() {
            var message = this.utils.createDiv(['card-message', 'card-message-' + this.layout, this.side]);
            var content = this.utils.createDiv(['card-message-content']);
            var cards = this.utils.createDiv(['card-message-cards']);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.cards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var card = _step2.value;

                    var cardComponent = card;
                    cardComponent.onActionClick = this.handleOnActionClick.bind(this);
                    cards.appendChild(cardComponent.render());
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            cards.appendChild(this.utils.createDiv(['clear']));
            content.appendChild(cards);
            message.appendChild(content);
            this.appendGlobalActions(message, this.actions);
            this.appendGlobalActions(message, this.globalActions);
            return message;
        }
    }, {
        key: "disableActions",
        value: function disableActions() {
            _get(CardMessageComponent.prototype.__proto__ || Object.getPrototypeOf(CardMessageComponent.prototype), "disableActions", this).call(this);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.cards[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var card = _step3.value;

                    card.disableActions();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return CardMessageComponent;
}(_message.MessageComponent);

exports.CardMessageComponent = CardMessageComponent;
//# sourceMappingURL=card-message.component.js.map
