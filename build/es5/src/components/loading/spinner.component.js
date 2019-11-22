'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This component creates loading animation element
 * <div class="spinner">
 *     <svg/>
 * </div>
 */
var SpinnerComponent = function () {
    function SpinnerComponent(utils) {
        _classCallCheck(this, SpinnerComponent);

        this.utils = utils;
    }

    _createClass(SpinnerComponent, [{
        key: 'render',
        value: function render() {
            var spinner = this.utils.createDiv(['spinner']);
            spinner.innerHTML = '<svg viewBox="0 0 64 64"><circle transform="translate(32,32)" r="26"></circle></svg>';
            return spinner;
        }
    }]);

    return SpinnerComponent;
}();

exports.SpinnerComponent = SpinnerComponent;
//# sourceMappingURL=spinner.component.js.map
