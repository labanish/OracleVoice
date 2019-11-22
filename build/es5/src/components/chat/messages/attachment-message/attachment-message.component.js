"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttachmentMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _message = require("../message.component");

var _attachmentPayload = require("../../../../model/common/payloads/attachment-payload.interface");

var _imageAttachment = require("./attachments/image-attachment.component");

var _videoAttachment = require("./attachments/video-attachment.component");

var _audioAttachment = require("./attachments/audio-attachment.component");

var _fileAttachment = require("./attachments/file-attachment.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts attachment message payload to component
 */
var AttachmentMessageComponent = function (_MessageComponent) {
    _inherits(AttachmentMessageComponent, _MessageComponent);

    function AttachmentMessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, AttachmentMessageComponent);

        var _this = _possibleConstructorReturn(this, (AttachmentMessageComponent.__proto__ || Object.getPrototypeOf(AttachmentMessageComponent)).call(this, utils, settings, payload, side));

        _this.payload = payload;
        _this.attachment = AttachmentMessageComponent.fromPayload(utils, settings, payload.attachment);
        return _this;
    }
    /**
     * Renders dom from component object
     * @param {HTMLElement} [messageContent] - message content
     * @return {HTMLElement}
     */


    _createClass(AttachmentMessageComponent, [{
        key: "render",
        value: function render(messageContent) {
            var div = this.utils.createDiv();
            div.appendChild(_get(AttachmentMessageComponent.prototype.__proto__ || Object.getPrototypeOf(AttachmentMessageComponent.prototype), "render", this).call(this));
            return div;
        }
    }, {
        key: "getContent",
        value: function getContent() {
            return this.attachment.render();
        }
    }], [{
        key: "fromPayload",
        value: function fromPayload(utils, settings, payload) {
            switch (payload.type) {
                case _attachmentPayload.ATTACHMENT_TYPE.IMAGE:
                    return new _imageAttachment.ImageAttachmentComponent(utils, payload);
                case _attachmentPayload.ATTACHMENT_TYPE.VIDEO:
                    return new _videoAttachment.VideoAttachmentComponent(utils, settings, payload);
                case _attachmentPayload.ATTACHMENT_TYPE.AUDIO:
                    return new _audioAttachment.AudioAttachmentComponent(utils, settings, payload);
                case _attachmentPayload.ATTACHMENT_TYPE.FILE:
                    return new _fileAttachment.FileAttachmentComponent(utils, payload);
                default:
                    throw Error('Payload contains wrong attachment type');
            }
        }
    }]);

    return AttachmentMessageComponent;
}(_message.MessageComponent);

exports.AttachmentMessageComponent = AttachmentMessageComponent;
//# sourceMappingURL=attachment-message.component.js.map
