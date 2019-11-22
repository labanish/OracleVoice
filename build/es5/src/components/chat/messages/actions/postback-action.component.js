"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PostbackActionComponent = undefined;

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
 */
var PostbackActionComponent = function (_ActionComponent) {
    _inherits(PostbackActionComponent, _ActionComponent);

    function PostbackActionComponent(utils, payload) {
        _classCallCheck(this, PostbackActionComponent);

        var _this = _possibleConstructorReturn(this, (PostbackActionComponent.__proto__ || Object.getPrototypeOf(PostbackActionComponent)).call(this, utils, payload));

        _this.postback = payload.postback;
        return _this;
    }

    _createClass(PostbackActionComponent, [{
        key: "render",
        value: function render() {
            var link = _get(PostbackActionComponent.prototype.__proto__ || Object.getPrototypeOf(PostbackActionComponent.prototype), "render", this).call(this);
            link.classList.add(this.utils.getCssClassWithPrefix('action-postback'));
            return link;
        }
    }, {
        key: "getEventPayload",
        value: function getEventPayload() {
            return Promise.resolve(this.postback);
        }
    }]);

    return PostbackActionComponent;
}(_action.ActionComponent);

exports.PostbackActionComponent = PostbackActionComponent;
//# sourceMappingURL=postback-action.component.js.map
