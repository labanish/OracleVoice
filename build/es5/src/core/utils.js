'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class contains widget helper methods
 */
var Utils = function () {
    function Utils(settings) {
        _classCallCheck(this, Utils);

        this.settings = settings;
    }
    /**
     * Creates a deep clone of the provided object
     */


    _createClass(Utils, [{
        key: 'clone',
        value: function clone(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        /**
         * Converts urls in text to the HTML links
         */

    }, {
        key: 'linkify',
        value: function linkify(inputText, embeddedVideo) {
            var _this = this;

            var replacedText = void 0,
                replacePattern1 = void 0,
                replacePattern2 = void 0,
                replacePattern3 = void 0;
            //URLs starting with http://, https://, or ftp://
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1, function (match, $1, $2) {
                var id = embeddedVideo ? _this.getYouTubeVideoId($1) : null;
                if (id) {
                    return '<iframe width="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
                } else {
                    return '<a href="' + $1 + '" target="_blank">' + $1 + '</a>';
                }
            });
            //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
            replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, function (match, $1, $2) {
                var id = embeddedVideo ? _this.getYouTubeVideoId('http://' + $2) : null;
                if (id) {
                    return '<iframe width="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
                } else {
                    return $1 + '<a href="http://' + $2 + '" target="_blank">' + $2 + '</a>';
                }
            });
            return replacedText;
        }
        /**
         * extracts the youtube id from the link
         */

    }, {
        key: 'getYouTubeVideoId',
        value: function getYouTubeVideoId(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return null;
            }
        }
        /**
         * adds the widget project name as the prefix to the css class
         */

    }, {
        key: 'getCssClassWithPrefix',
        value: function getCssClassWithPrefix(cssClass) {
            return this.settings.name + '-' + cssClass;
        }
        /**
         * creates HTML button element
         */

    }, {
        key: 'createButton',
        value: function createButton(classNames) {
            var element = document.createElement('button');
            if (classNames) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = classNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var className = _step.value;

                        element.classList.add(this.getCssClassWithPrefix(className));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return element;
        }
        /**
         * creates HTML anchor element
         */

    }, {
        key: 'createAnchor',
        value: function createAnchor(url, text, classNames) {
            var element = document.createElement('a');
            if (url) {
                element.href = url;
            }
            if (text) {
                element.innerText = text;
            } else if (url) {
                element.innerText = url;
            }
            if (classNames) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = classNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var className = _step2.value;

                        element.classList.add(this.getCssClassWithPrefix(className));
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            return element;
        }
        /**
         * creates HTML div element
         */

    }, {
        key: 'createDiv',
        value: function createDiv(classNames) {
            var element = document.createElement('div');
            if (classNames) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = classNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var className = _step3.value;

                        element.classList.add(this.getCssClassWithPrefix(className));
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
            return element;
        }
        /**
         * creates HTML paragraph element
         */

    }, {
        key: 'createParagraph',
        value: function createParagraph(classNames) {
            var element = document.createElement('p');
            if (classNames) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = classNames[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var className = _step4.value;

                        element.classList.add(this.getCssClassWithPrefix(className));
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
            return element;
        }
        /**
         * creates HTML span element
         */

    }, {
        key: 'createSpan',
        value: function createSpan(classNames) {
            var element = document.createElement('span');
            if (classNames) {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = classNames[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var className = _step5.value;

                        element.classList.add(this.getCssClassWithPrefix(className));
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }
            }
            return element;
        }
        /**
         * creates HTML input element
         */

    }, {
        key: 'createInput',
        value: function createInput(classNames) {
            var element = document.createElement('input');
            if (classNames) {
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = classNames[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var className = _step6.value;

                        element.classList.add(this.getCssClassWithPrefix(className));
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }
            }
            return element;
        }
        /**
         * creates HTML image element
         */

    }, {
        key: 'createImage',
        value: function createImage(url, classNames) {
            var element = document.createElement('img');
            if (url) {
                element.src = url;
            }
            if (classNames) {
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = classNames[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var className = _step7.value;

                        element.classList.add(this.getCssClassWithPrefix(className));
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            }
            return element;
        }
        /**
         * creates HTML audio element
         */

    }, {
        key: 'createAudio',
        value: function createAudio(url, className, autoplay) {
            var element = document.createElement('audio');
            if (url) {
                element.src = url;
            }
            element.autoplay = typeof autoplay === 'undefined' ? false : autoplay;
            if (className) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
            return element;
        }
        /**
         * creates HTML video element
         */

    }, {
        key: 'createVideo',
        value: function createVideo(url, className, autoplay) {
            var element = document.createElement('video');
            if (url) {
                element.src = url;
            }
            element.autoplay = typeof autoplay === 'undefined' ? false : autoplay;
            if (className) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
            return element;
        }
        /**
         * creates HTML div element with the HTML as child elements
         */

    }, {
        key: 'createHTML',
        value: function createHTML(html) {
            var div = this.createDiv();
            div.innerHTML = html;
            return div;
        }
        /**
         * creates HTML style element
         */

    }, {
        key: 'createStyle',
        value: function createStyle(style) {
            var element = document.createElement('style');
            element.type = 'text/css';
            element.appendChild(document.createTextNode(style));
            return element;
        }
    }]);

    return Utils;
}();

exports.Utils = Utils;
//# sourceMappingURL=utils.js.map
