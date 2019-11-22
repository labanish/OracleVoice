'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoAttachmentComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attachment = require('./attachment.component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts attachment payload to component
 */
var VideoAttachmentComponent = function (_AttachmentComponent) {
  _inherits(VideoAttachmentComponent, _AttachmentComponent);

  function VideoAttachmentComponent(utils, settings, payload) {
    _classCallCheck(this, VideoAttachmentComponent);

    var _this = _possibleConstructorReturn(this, (VideoAttachmentComponent.__proto__ || Object.getPrototypeOf(VideoAttachmentComponent)).call(this, payload));

    _this.utils = utils;
    _this.settings = settings;
    _this.url = payload.url;
    return _this;
  }
  /**
   * Renders dom from component object
   * <video class="attachment-video">
   *    Your browser does not support embedded video. However you can <a href="url">download it</a>.
   * </video>
   * @return {HTMLElement}
   */


  _createClass(VideoAttachmentComponent, [{
    key: 'render',
    value: function render() {
      var element = this.utils.createVideo(this.url, 'attachment-video', this.settings.autoplayVideo);
      element.controls = true;
      element.innerHTML = 'Your browser does not support embedded video. However you can <a href="' + this.url + '">download it</a>.';
      return element;
    }
  }]);

  return VideoAttachmentComponent;
}(_attachment.AttachmentComponent);

exports.VideoAttachmentComponent = VideoAttachmentComponent;
//# sourceMappingURL=video-attachment.component.js.map
