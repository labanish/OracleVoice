'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioAttachmentComponent = undefined;

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
var AudioAttachmentComponent = function (_AttachmentComponent) {
  _inherits(AudioAttachmentComponent, _AttachmentComponent);

  function AudioAttachmentComponent(utils, settings, payload) {
    _classCallCheck(this, AudioAttachmentComponent);

    var _this = _possibleConstructorReturn(this, (AudioAttachmentComponent.__proto__ || Object.getPrototypeOf(AudioAttachmentComponent)).call(this, payload));

    _this.utils = utils;
    _this.settings = settings;
    _this.url = payload.url;
    return _this;
  }
  /**
   * Renders dom from component object
   * <audio class="attachment-audio">
   *    Your browser does not support embedded audio. However you can <a href="url">download it</a>.
   * </audio>
   * @return {HTMLElement}
   */


  _createClass(AudioAttachmentComponent, [{
    key: 'render',
    value: function render() {
      var audio = this.utils.createAudio(this.url, 'attachment-audio', this.settings.autoplayAudio);
      audio.controls = true;
      audio.innerHTML = 'Your browser does not support embedded audio. However you can <a href="' + this.url + '">download it</a>.';
      return audio;
    }
  }]);

  return AudioAttachmentComponent;
}(_attachment.AttachmentComponent);

exports.AudioAttachmentComponent = AudioAttachmentComponent;
//# sourceMappingURL=audio-attachment.component.js.map
