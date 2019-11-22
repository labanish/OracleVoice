'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _actionComponent = require('../../../../core/factories/action-component.factory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts card message payload to component.
 */
var CardComponent = function () {
    function CardComponent(utils, payload) {
        _classCallCheck(this, CardComponent);

        this.utils = utils;
        this.actions = [];
        this.title = payload.title;
        this.description = payload.description;
        this.imageUrl = payload.imageUrl;
        this.url = payload.url;
        if (payload.actions) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = payload.actions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var action = _step.value;

                    var actionComponent = _actionComponent.ActionComponentFactory.fromActionPayload(utils, action);
                    if (actionComponent) {
                        actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                        this.actions.push(actionComponent);
                    }
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
        }
    }

    _createClass(CardComponent, [{
        key: 'handleOnActionClick',
        value: function handleOnActionClick(event) {
            if (this.onActionClick) {
                this.onActionClick(event);
            }
        }
        /**
         * Renders dom from component object
         * <div class="card">
         *   <img src="imageUrl"/>
         *   <div class="card-content">
         *       <span class="card-title">{title}</span>
         *       <p>{description}</p>
         *   </div>
         *   <div class="card-actions">
         *      {actions}
         *   </div>
         *   <div class="clear"></div>
         * </div>
         * @return {HTMLElement}
         */

    }, {
        key: 'render',
        value: function render() {
            var card = this.utils.createDiv(['card']);
            if (this.imageUrl) {
                card.appendChild(this.utils.createImage(this.imageUrl));
            }
            var content = this.utils.createDiv(['card-content']);
            var title = this.utils.createSpan(['card-title']);
            title.innerText = this.title;
            content.appendChild(title);
            var desc = this.utils.createParagraph();
            desc.innerText = this.description;
            content.appendChild(desc);
            card.appendChild(content);
            if (this.actions.length > 0) {
                var actions = this.utils.createDiv(['card-actions']);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.actions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var action = _step2.value;

                        actions.appendChild(action.render());
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

                card.appendChild(actions);
            }
            return card;
        }
        /**
         * Disable actions buttons
         */

    }, {
        key: 'disableActions',
        value: function disableActions() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.actions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var action = _step3.value;

                    action.disable();
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

    return CardComponent;
}();

exports.CardComponent = CardComponent;
//# sourceMappingURL=card.component.js.map
