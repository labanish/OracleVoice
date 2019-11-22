"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require("../message.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates HTML elements for the text message type.
 * The text scanned for the links and embedded videos, all the link replaced with HTML.
 * <span>{content}</span>
 */
var TextMessageComponent = function (_MessageComponent) {
    _inherits(TextMessageComponent, _MessageComponent);

    function TextMessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, TextMessageComponent);

        var _this = _possibleConstructorReturn(this, (TextMessageComponent.__proto__ || Object.getPrototypeOf(TextMessageComponent)).call(this, utils, settings, payload, side));

        _this.text = payload.text;
        return _this;
    }

    _createClass(TextMessageComponent, [{
        key: "getContent",
        value: function getContent() {
            var span = this.utils.createSpan();
            span.innerHTML = this.utils.linkify(this.text, this.settings.embeddedVideo);
            if (this.side === "left") {
                var msg = new SpeechSynthesisUtterance(this.text);
                window.speechSynthesis.speak(msg);
                console.log(this.side);
            }
            return span;
        }
    }]);

    return TextMessageComponent;
}(_message.MessageComponent);

exports.TextMessageComponent = TextMessageComponent;
//# sourceMappingURL=text-message.component.js.map
