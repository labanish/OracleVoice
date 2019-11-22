'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageComponent = exports.MESSAGE_SIDE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actionComponent2 = require('../../../core/factories/action-component.factory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MESSAGE_SIDE = {
    RIGHT: 'right',
    LEFT: 'left'
};
exports.MESSAGE_SIDE = MESSAGE_SIDE;
/**
 * Base class for the messages components
 * Converts message payload to component.
 */

var MessageComponent = function () {
    function MessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, MessageComponent);

        this.utils = utils;
        this.settings = settings;
        this.side = side;
        this.actions = [];
        this.globalActions = [];
        // Create the message actions components
        if (payload.actions) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = payload.actions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var action = _step.value;

                    var actionComponent = _actionComponent2.ActionComponentFactory.fromActionPayload(utils, action);
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
        // Create the message global actions components
        if (payload.globalActions) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = payload.globalActions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _action = _step2.value;

                    var _actionComponent = _actionComponent2.ActionComponentFactory.fromActionPayload(utils, _action);
                    if (_actionComponent) {
                        _actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                        this.globalActions.push(_actionComponent);
                    }
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
        }
    }
    /**
     * Renders dom from component object
     * <div class="message">
     *    <div class="message-wrapper">
     *        <img class="message-profile-pic right | left" src="{PROFILE_PICTURE}"/>
     *        <div class="message-bubble right | left">
     *             <div class="message-content">{messageContent | getContent()}</div>
     *             <div class="message-actions">{actions}</div>
     *        </div>
     *    <div>
     *    <div class="message-global-actions">{globalActions}</div>
     *    <div class="clear"></div>
     * </div>
     * @param {HTMLElement} [messageContent] - message content
     * @return {HTMLElement}
     */


    _createClass(MessageComponent, [{
        key: 'render',
        value: function render(messageContent) {
            var message = this.utils.createDiv(['message', this.side]);
            var messageWrapper = this.utils.createDiv(['message-wrapper']);
            message.appendChild(messageWrapper);
            var profilePicUrl = this.side === MESSAGE_SIDE.LEFT ? this.settings.botIcon : this.settings.personIcon;
            if (profilePicUrl) {
                messageWrapper.classList.add(this.utils.getCssClassWithPrefix('has-profile-pic'));
                messageWrapper.appendChild(this.utils.createImage(profilePicUrl, ['message-profile-pic']));
            }
            var bubble = this.utils.createDiv(['message-bubble']);
            var content = this.utils.createDiv(['message-content']);
            content.appendChild(messageContent || this.getContent());
            bubble.appendChild(content);
            if (this.actions) {
                this.appendActions(bubble, this.actions);
            }
            messageWrapper.appendChild(bubble);
            messageWrapper.appendChild(this.utils.createDiv(['clear']));
            if (this.globalActions) {
                this.appendGlobalActions(message, this.globalActions);
            }
            message.appendChild(this.utils.createDiv(['clear']));
            return message;
        }
        /**
         * Method that returns this message content.
         * @return {HTMLElement}
         */

    }, {
        key: 'getContent',
        value: function getContent() {
            throw new Error("Method not implemented.");
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

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.globalActions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _action2 = _step4.value;

                    _action2.disable();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
        /**
         * Handles the action button click
         * @param {IActionEvent} event
         */

    }, {
        key: 'handleOnActionClick',
        value: function handleOnActionClick(event) {
            if (this.onActionClick) {
                var messageEvent = event;
                messageEvent.messageComponent = this;
                this.onActionClick(messageEvent);
            }
        }
    }, {
        key: 'appendActions',
        value: function appendActions(parent, actions) {
            if (actions.length > 0) {
                var actionsElement = this.utils.createDiv(['message-actions']);
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = actions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var action = _step5.value;

                        actionsElement.appendChild(action.render());
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                parent.appendChild(actionsElement);
            }
        }
    }, {
        key: 'appendGlobalActions',
        value: function appendGlobalActions(parent, actions) {
            if (actions.length > 0) {
                var actionsElement = this.utils.createDiv(['message-global-actions']);
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = actions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var action = _step6.value;

                        actionsElement.appendChild(action.render());
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                parent.appendChild(actionsElement);
            }
        }
    }]);

    return MessageComponent;
}();

exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map
