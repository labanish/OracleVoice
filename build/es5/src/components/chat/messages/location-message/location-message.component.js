"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocationMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _message = require("../message.component");

var _urlAction = require("../actions/url-action.component");

var _actionPayload = require("../../../../model/common/payloads/action-payload/action-payload.interface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates HTML elements for the location message type.
 */
var LocationMessageComponent = function (_MessageComponent) {
    _inherits(LocationMessageComponent, _MessageComponent);

    function LocationMessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, LocationMessageComponent);

        var _this = _possibleConstructorReturn(this, (LocationMessageComponent.__proto__ || Object.getPrototypeOf(LocationMessageComponent)).call(this, utils, settings, payload, side));

        _this.title = payload.location.title;
        _this.url = payload.location.url;
        _this.longitude = payload.location.longitude;
        _this.latitude = payload.location.latitude;
        return _this;
    }
    /**
     * Renders dom from component object
     * @return {HTMLElement}
     */


    _createClass(LocationMessageComponent, [{
        key: "render",
        value: function render() {
            if (this.actions.length === 0) {
                var payload = {
                    type: _actionPayload.ACTION_TYPE.URL,
                    label: 'Open Map',
                    url: this.url || 'https://www.google.com/maps?z=12&t=m&q=loc:' + this.latitude + '+' + this.longitude
                };
                this.actions.push(new _urlAction.UrlActionComponent(this.utils, payload));
            }
            return _get(LocationMessageComponent.prototype.__proto__ || Object.getPrototypeOf(LocationMessageComponent.prototype), "render", this).call(this);
        }
    }, {
        key: "getContent",
        value: function getContent() {
            var span = this.utils.createSpan();
            if (this.title) {
                span.innerText = this.title;
            }
            return span;
        }
    }]);

    return LocationMessageComponent;
}(_message.MessageComponent);

exports.LocationMessageComponent = LocationMessageComponent;
//# sourceMappingURL=location-message.component.js.map
