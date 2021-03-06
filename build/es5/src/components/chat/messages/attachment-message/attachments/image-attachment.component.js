"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageAttachmentComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attachment = require("./attachment.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts attachment payload to component
 */
var ImageAttachmentComponent = function (_AttachmentComponent) {
  _inherits(ImageAttachmentComponent, _AttachmentComponent);

  function ImageAttachmentComponent(utils, payload) {
    _classCallCheck(this, ImageAttachmentComponent);

    var _this = _possibleConstructorReturn(this, (ImageAttachmentComponent.__proto__ || Object.getPrototypeOf(ImageAttachmentComponent)).call(this, payload));

    _this.utils = utils;
    _this.url = payload.url;
    return _this;
  }
  /**
   * Renders dom from component object
   * <img class="attachment-image" src="url"/>
   * @return {HTMLElement}
   */


  _createClass(ImageAttachmentComponent, [{
    key: "render",
    value: function render() {
      return this.utils.createImage(this.url, ['attachment-image']);
    }
  }]);

  return ImageAttachmentComponent;
}(_attachment.AttachmentComponent);

exports.ImageAttachmentComponent = ImageAttachmentComponent;
//# sourceMappingURL=image-attachment.component.js.map
