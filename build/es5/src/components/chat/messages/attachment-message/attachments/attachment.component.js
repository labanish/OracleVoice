"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Base class for attachment components
 */
var AttachmentComponent = function () {
    function AttachmentComponent(payload) {
        _classCallCheck(this, AttachmentComponent);

        this.title = AttachmentComponent.capitalize(payload.type);
    }

    _createClass(AttachmentComponent, null, [{
        key: "capitalize",
        value: function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }]);

    return AttachmentComponent;
}();

exports.AttachmentComponent = AttachmentComponent;
//# sourceMappingURL=attachment.component.js.map
