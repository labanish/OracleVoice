"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileAttachmentComponent = undefined;

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
var FileAttachmentComponent = function (_AttachmentComponent) {
  _inherits(FileAttachmentComponent, _AttachmentComponent);

  function FileAttachmentComponent(utils, payload) {
    _classCallCheck(this, FileAttachmentComponent);

    var _this = _possibleConstructorReturn(this, (FileAttachmentComponent.__proto__ || Object.getPrototypeOf(FileAttachmentComponent)).call(this, payload));

    _this.utils = utils;
    _this.url = payload.url;
    return _this;
  }
  /**
   * Renders dom from component object
   * <a class="attachment-file" href="url">url</a>
   * @return {HTMLElement}
   */


  _createClass(FileAttachmentComponent, [{
    key: "render",
    value: function render() {
      return this.utils.createAnchor(this.url, null, ['attachment-file']);
    }
  }]);

  return FileAttachmentComponent;
}(_attachment.AttachmentComponent);

exports.FileAttachmentComponent = FileAttachmentComponent;
//# sourceMappingURL=file-attachment.component.js.map
