"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocationActionComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _action = require("./action.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts action payload to component
 * Request browser for location, browser may in turn ask user for permission.
 * Location information is then sent to the Bot as a LocationMessagePayload.
 * If a location cannot be obtained from the browser, a pre-set location is sent to the Bot to allow testing to continue.
 */
var LocationActionComponent = function (_ActionComponent) {
    _inherits(LocationActionComponent, _ActionComponent);

    function LocationActionComponent(utils, payload) {
        _classCallCheck(this, LocationActionComponent);

        return _possibleConstructorReturn(this, (LocationActionComponent.__proto__ || Object.getPrototypeOf(LocationActionComponent)).call(this, utils, payload));
    }

    _createClass(LocationActionComponent, [{
        key: "render",
        value: function render() {
            var link = _get(LocationActionComponent.prototype.__proto__ || Object.getPrototypeOf(LocationActionComponent.prototype), "render", this).call(this);
            link.classList.add(this.utils.getCssClassWithPrefix('action-location'));
            return link;
        }
    }, {
        key: "getCurrentPosition",
        value: function getCurrentPosition() {
            return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                }, function (error) {
                    reject(error);
                });
            });
        }
    }, {
        key: "getEventPayload",
        value: function getEventPayload() {
            return this.getCurrentPosition();
        }
    }]);

    return LocationActionComponent;
}(_action.ActionComponent);

exports.LocationActionComponent = LocationActionComponent;
//# sourceMappingURL=location-action.component.js.map
