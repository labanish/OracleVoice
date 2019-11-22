/**
* Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
 * Oracle Chat Widget Web - Oracle bot chat client example, Release: 2.0.1
*/



(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatFooterComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../../component");

var _iconButton = require("../../shared/icon-button/icon-button.component");

var _footer = require("../../shared/footer/footer.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Chat footer component creates the message input and the send button elements for the footer of the chat window
 *  <Footer>
 *      <input class="input">
 *      <IconButton>
 *  </Footer>
 */
var outerScopeInput;
var started = false;

var ChatFooterComponent = exports.ChatFooterComponent = function (_Component) {
    _inherits(ChatFooterComponent, _Component);

    function ChatFooterComponent(utils, onSend, sendButtonImgSrc, stopButtonImgSrc, inputPlaceholder) {
        _classCallCheck(this, ChatFooterComponent);

        var _this = _possibleConstructorReturn(this, (ChatFooterComponent.__proto__ || Object.getPrototypeOf(ChatFooterComponent)).call(this, utils));

        _this.onSend = onSend;
        _this.sendButtonImgSrc = sendButtonImgSrc;
        _this.stopButtonImgSrc = stopButtonImgSrc;
        _this.inputPlaceholder = inputPlaceholder;
        _this.element = _this._createElement();
        outerScopeInput = _this.input;
        window.onkeypress = function (ev) {
            console.log("onkeypress:" + ev.key);
            if (ev.key === '`') {
                startButton(null, function (input) {
                    _this.onSend(input);
                });
            }
        };
        return _this;
    }

    _createClass(ChatFooterComponent, [{
        key: "render",
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: "_createElement",
        value: function _createElement() {
            this.input = this.utils.createInput(['input']);
            this.input.onkeypress = this.onInputKeyPress.bind(this);
            this.input.placeholder = this.inputPlaceholder;
            this.sendButton = new _iconButton.IconButtonComponent(this.utils, this.onClick.bind(this), this.sendButtonImgSrc);
            this.stopButton = new _iconButton.IconButtonComponent(this.utils, this.onClick.bind(this), this.stopButtonImgSrc);
            var footer = new _footer.FooterComponent(this.utils);
            footer.appendContentChildElement(this.input);
            footer.appendContentChild(this.sendButton);
            footer.appendContentChild(this.stopButton);
            this.stopButton.hide(true);
            return footer.element;
        }
    }, {
        key: "onInputKeyPress",
        value: function onInputKeyPress(event) {
            if (event.key === 'Enter' && this.input.value !== '') {
                this._onSend();
            }
        }
    }, {
        key: "onClick",
        value: function onClick() {
            var _this2 = this;

            this.toggleButton();
            startButton(null, function (input) {
                //alert(input)
                console.log('In startButton callback');
                _this2.sendButton.hide(false);
                _this2.stopButton.hide(true);
                if (_this2.input.value !== '') {
                    _this2.onSend(input);
                }
            });
            /*         if (this.input.value !== '') {
                        this._onSend();
                    } */
        }
    }, {
        key: "toggleButton",
        value: function toggleButton() {
            if (!started) {
                console.log("Toggle stop button off and start on");
                this.sendButton.hide(true);
                this.stopButton.hide(false);
            }
        }
    }, {
        key: "_onSend",
        value: function _onSend() {
            this.onSend(this.input.value);
            this.input.value = '';
        }
    }]);

    return ChatFooterComponent;
}(_component.Component);

var wind = Window;
var callback = null;
var start_timestamp;
var ignore_onend;
var final_transcript = '';
var recognizing = false;
var s_recognition = null;
var startRecoTime = 0;
var first_char = /\S/;
wind.recording = false;
wind.audioContext = null; //new AudioContext();
var BUFF_SIZE = 16384;
var audioInput = null;
var processor = null;
var microphoneStream = null;
var gain = null;
var connection = null;
var host = "wss://speech-1.data.digitalassistant.oci.oc-test.com/v1/stream/recognize?culture=en-us&domain=generic&version=201909040000&partial=true&encoding=audio%2Fraw%3Brate%3D16000%3Bcoding%3Dlinear%3Bbyteorder%3DLE";
var token = null;
var maxConnectionRetryCount = 5;
var connectionRetry = 0;
var connectionError = false;
// update the variable due to browser differences
if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.getUserMedia; //|| navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}
function connectToWebSocket() {
    console.log("connecting to '" + host + "'");
    //document.cookie = "x-vbt-culture: en-us";
    connection = new WebSocket(host);
    connection.onopen = connection_onopen;
    connection.onmessage = connection_onmessage;
    connection.onclose = connection_onclose;
    connection.onerror = connection_error;
}
function connection_onopen() {
    console.log("connection to '" + host + "' open");
    connectionError = false;
    if (navigator.getUserMedia == null) {}
    //start_img.src = '/images/mic-slash.gif';

    //else 
    //{
    //	start_img.src = '/images/mic.gif';
    //}
}
function connection_onclose(event) {
    console.log("connection to '" + host + "' closed: " + event);
    //if (!connectionError)
    //{
    //	// reopen the connection
    //	connectToWebSocket();
    //}
}
function connection_onmessage(message) {
    console.log("message received: '" + message.data + "'");
    var data = data = JSON.parse(message.data);
    if (data != null && data['nbest'] != null && data.event === 'finalResult') {
        var clearInput = function clearInput() {
            outerScopeInput.value = '';
        };

        outerScopeInput.value = data['nbest'][0]['utterance'];
        var input = data['nbest'][0]['utterance'];
        // close the connection
        //connection.close();
        if (input != null) {
            //alert(input);
            callback(input);
            //sendQuery(input);
        }
        setTimeout(clearInput, 2000);
    } else if (data != null && data['nbest'] != null && data.event === 'partialResult') {
        // this.inputPlaceholder = data['nbest'][0]['utterance']
        // console.log(this.inputPlaceholder)
        console.log(data['nbest'][0]['utterance']);
        outerScopeInput.value = data['nbest'][0]['utterance'];
    }
}
function connection_error() {
    console.log("error connecting to '" + host + "'");
    //start_img.src = '/images/mic-slash.gif';
    connectionError = true;
}
function downsampleBuffer(buffer, sampleRate, outSampleRate) {
    if (outSampleRate === sampleRate) {
        return buffer;
    }
    if (outSampleRate > sampleRate) {
        throw new Error('downsampling rate show be smaller than original sample rate');
    }
    var sampleRateRatio = sampleRate / outSampleRate;
    var newLength = Math.round(buffer.length / sampleRateRatio);
    var result = new Int16Array(newLength);
    var offsetResult = 0;
    var offsetBuffer = 0;
    while (offsetResult < result.length) {
        var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        var accum = 0;
        var count = 0;
        for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }
        result[offsetResult] = Math.min(1, accum / count) * 0x7FFF;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return result.buffer;
}
function processAudioBuffer(event) {
    //if (wind.recording)
    //{
    // invoked by event loop
    var samples = event.inputBuffer.getChannelData(0); // just mono 
    //console.log(wind.audioContext.sampleRate);
    var outBuffer = downsampleBuffer(samples, event.inputBuffer.sampleRate, 16000);
    if (connection.readyState == 1) {
        connection.send(outBuffer);
    }
    //}
    //console.log(wind.recording);
}
function stopMicrophone() {
    if (connection.readyState === 1) {
        console.log("sending done to asr service");
        connection.send('Done');
    }
    console.log("stopping microphone");
    microphoneStream.mediaStream.getAudioTracks().forEach(function (track) {
        track.stop();
        microphoneStream.mediaStream.removeTrack(track);
    });
    wind.audioContext.close();
    wind.audioContext = null;
    started = false;
    //start_img.src = '/images/mic.gif';
}
function startMicrophone(stream) {
    connectToWebSocket();
    console.log("starting microphone");
    wind.audioContext = new AudioContext();
    // create the stream
    microphoneStream = wind.audioContext.createMediaStreamSource(stream);
    // create the audio processor with the given buffer size
    processor = wind.audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);
    // handle onaudioprocess events
    processor.onaudioprocess = processAudioBuffer;
    // connect the stream to the processor
    microphoneStream.connect(processor);
    // connect the processor to the audioContext destination
    processor.connect(wind.audioContext.destination);
    startVAD(microphoneStream, true);
    started = true;
    //start_img.src = '/images/mic-animate.gif';
}
function startVAD(s, debug) {
    var localVars = {};
    localVars.source = s;
    localVars.context = localVars.source.context;
    localVars.fftSize = 512;
    localVars.bufferLen = 512;
    localVars.smoothingTimeConstant = 0.99;
    localVars.energy_offset = 1e-8; // The initial offset.
    localVars.energy_threshold_ratio_pos = 2; // Signal must be twice the offset
    localVars.energy_threshold_ratio_neg = 0.8; // Signal must be half the offset
    localVars.energy_integration = 1; // Size of integration change compared to the signal per second.
    localVars.filter = [{ f: 200, v: 0 }, { f: 2000, v: 1 // 200 -> 2k is 1
    }];
    localVars.hertzPerBin = localVars.context.sampleRate / localVars.fftSize;
    localVars.iterationFrequency = localVars.context.sampleRate / localVars.bufferLen;
    localVars.iterationPeriod = 1 / localVars.iterationFrequency;
    if (debug) console.log('Vad' + ' | sampleRate: ' + localVars.context.sampleRate + ' | hertzPerBin: ' + localVars.hertzPerBin + ' | iterationFrequency: ' + localVars.iterationFrequency + ' | iterationPeriod: ' + localVars.iterationPeriod);
    localVars.setFilter = function (shape) {
        localVars.filter = [];
        for (var i = 0, iLen = localVars.fftSize / 2; i < iLen; i++) {
            localVars.filter[i] = 0;
            for (var j = 0, jLen = shape.length; j < jLen; j++) {
                if (i * localVars.hertzPerBin < shape[j].f) {
                    localVars.filter[i] = shape[j].v;
                    break; // Exit j loop
                }
            }
        }
    };
    localVars.setFilter(localVars.filter);
    localVars.ready = {};
    localVars.vadState = false; // True when Voice Activity Detected
    localVars.energy_threshold_pos = localVars.energy_offset * localVars.energy_threshold_ratio_pos;
    localVars.energy_threshold_neg = localVars.energy_offset * localVars.energy_threshold_ratio_neg;
    localVars.voiceTrend = 0;
    localVars.voiceTrendMax = 10;
    localVars.voiceTrendMin = -10;
    localVars.voiceTrendStart = 5;
    localVars.voiceTrendEnd = -5;
    localVars.analyser = localVars.context.createAnalyser();
    localVars.analyser.smoothingTimeConstant = localVars.smoothingTimeConstant; // 0.99;
    localVars.analyser.fftSize = localVars.fftSize;
    localVars.floatFrequencyData = new Float32Array(localVars.analyser.frequencyBinCount);
    // Setup local storage of the Linear FFT data
    localVars.floatFrequencyDataLinear = new Float32Array(localVars.floatFrequencyData.length);
    // Connect this.analyser
    localVars.source.connect(localVars.analyser);
    // Create ScriptProcessorNode
    localVars.scriptProcessorNode = localVars.context.createScriptProcessor(localVars.bufferLen, 1, 1);
    // Connect scriptProcessorNode (Theretically, not required)
    localVars.scriptProcessorNode.connect(localVars.context.destination);
    // Create callback to update/analyze floatFrequencyData
    var self = localVars;
    localVars.scriptProcessorNode.onaudioprocess = function (event) {
        self.analyser.getFloatFrequencyData(self.floatFrequencyData);
        self.update();
        self.monitor();
    };
    // Connect scriptProcessorNode
    localVars.source.connect(localVars.scriptProcessorNode);
    localVars.update = function () {
        // Update the local version of the Linear FFT
        var fft = localVars.floatFrequencyData;
        for (var i = 0, iLen = fft.length; i < iLen; i++) {
            localVars.floatFrequencyDataLinear[i] = Math.pow(10, fft[i] / 10);
        }
        localVars.ready = {};
    };
    localVars.getEnergy = function () {
        if (localVars.ready.energy) {
            return localVars.energy;
        }
        var energy = 0;
        var fft = localVars.floatFrequencyDataLinear;
        for (var i = 0, iLen = fft.length; i < iLen; i++) {
            energy += localVars.filter[i] * fft[i] * fft[i];
        }
        localVars.energy = energy;
        localVars.ready.energy = true;
        return energy;
    };
    localVars.disconnect = function () {
        localVars.source.disconnect(localVars.scriptProcessorNode);
        localVars.source.disconnect(localVars.analyser);
        localVars.scriptProcessorNode.disconnect(localVars.context.destination);
    };
    localVars.monitor = function () {
        var energy = localVars.getEnergy();
        var signal = energy - localVars.energy_offset;
        if (signal > localVars.energy_threshold_pos) {
            localVars.voiceTrend = localVars.voiceTrend + 1 > localVars.voiceTrendMax ? localVars.voiceTrendMax : localVars.voiceTrend + 1;
        } else if (signal < -localVars.energy_threshold_neg) {
            localVars.voiceTrend = localVars.voiceTrend - 1 < localVars.voiceTrendMin ? localVars.voiceTrendMin : localVars.voiceTrend - 1;
        } else {
            // voiceTrend gets smaller
            if (localVars.voiceTrend > 0) {
                localVars.voiceTrend--;
            } else if (localVars.voiceTrend < 0) {
                localVars.voiceTrend++;
            }
        }
        var start = false,
            end = false;
        if (localVars.voiceTrend > localVars.voiceTrendStart) {
            // Start of speech detected
            start = true;
        } else if (localVars.voiceTrend < localVars.voiceTrendEnd) {
            // End of speech detected
            end = true;
        }
        // Integration brings in the real-time aspect through the relationship with the frequency this functions is called.
        var integration = signal * localVars.iterationPeriod * localVars.energy_integration;
        // Idea?: The integration is affected by the voiceTrend magnitude? - Not sure. Not doing atm.
        // The !end limits the offset delta boost till after the end is detected.
        if (integration > 0 || !end) {
            localVars.energy_offset += integration;
        } else {
            localVars.energy_offset += integration * 10;
        }
        localVars.energy_offset = localVars.energy_offset < 0 ? 0 : localVars.energy_offset;
        localVars.energy_threshold_pos = localVars.energy_offset * localVars.energy_threshold_ratio_pos;
        localVars.energy_threshold_neg = localVars.energy_offset * localVars.energy_threshold_ratio_neg;
        // Broadcast the messages
        if (start && !localVars.vadState) {
            localVars.vadState = true;
            //this.options.voice_start();
            console.log("start");
            wind.recording = true;
        }
        if (end && localVars.vadState) {
            localVars.vadState = false;
            //this.options.voice_stop();
            stopMicrophone();
            console.log("stop");
        }
        return signal;
    };
}
function startButton(event, cb) {
    callback = cb;
    if (navigator.getUserMedia) {
        if (started) {
            stopMicrophone();
        } else {
            navigator.getUserMedia({ audio: true }, function (stream) {
                startMicrophone(stream);
            }, function (e) {
                alert('Error capturing audio.');
            });
        }
    } else {
        //start_img.src = '/images/mic-slash.gif';
        alert('getUserMedia not supported in this browser.');
    }
}
function capitalize(s) {
    return s.replace(first_char, function (m) {
        return m.toUpperCase();
    });
}
function submitUtterance() {
    //sendQuery($('#data').val());
    alert("result");
    /* 		$('#data').val('');
            $('#logicaldiv').html("&nbsp;");
            $('#parsediv').html("&nbsp;"); */
}


},{"../../component":21,"../../shared/footer/footer.component":25,"../../shared/icon-button/icon-button.component":27}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require("../component");

var _header = require("../shared/header/header.component");

var _message = require("./messages/message.component");

var _messagePayload = require("../../model/common/payloads/message-payload/message-payload.interface");

var _loadingMessage = require("./messages/loading-message/loading-message.component");

var _actionPayload = require("../../model/common/payloads/action-payload/action-payload.interface");

var _message2 = require("../../model/common/message");

var _messageComponent = require("../../core/factories/message-component.factory");

var _logger = require("../../core/logger");

var _chatFooter = require("./chat-footer/chat-footer.component");

var _chatActions = require("../../providers/chat-actions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * The component creates chat scrollable window
 * <HeaderComponent>
 * <div class="chat">
 *     <div id="ochat_widget_messages" class="scroll-content">
 *     </div>
 * </div>
 * <ChatFooterComponent>
 */
var ChatComponent = exports.ChatComponent = function (_Component) {
    _inherits(ChatComponent, _Component);

    function ChatComponent(utils, settings, dataService, loadingComponent) {
        _classCallCheck(this, ChatComponent);

        var _this = _possibleConstructorReturn(this, (ChatComponent.__proto__ || Object.getPrototypeOf(ChatComponent)).call(this, utils));

        _this.settings = settings;
        _this.dataService = dataService;
        _this.loadingComponent = loadingComponent;
        _this._logger = new _logger.Logger('ChatComponent');
        _this.element = _this._createElement();
        loadingComponent.present('Please wait ...');
        // load history messages
        dataService.loadChat().then(function (messages) {
            // free the main thread
            setTimeout(function () {
                _this.renderMessages(messages.slice());
                _this.scrollToBottom();
                loadingComponent.dismiss();
                dataService.onMessage = _this.onMessageReceived.bind(_this);
            });
        });
        _this.chatActions = new _chatActions.ChatActions(_this.onMessageReceived.bind(_this), _this.onClear.bind(_this));
        return _this;
    }

    _createClass(ChatComponent, [{
        key: "onClear",
        value: function onClear() {
            this.dataService.clear();
        }
        /**
         * Inherit form Component
         * @return {HTMLElement}
         */

    }, {
        key: "_createElement",
        value: function _createElement() {
            var chat = this.utils.createDiv(['chat']);
            this.scrollContent = this.utils.createDiv(['scroll-content']);
            this.scrollContent.id = ChatComponent.MESSAGES_ID;
            chat.appendChild(this.scrollContent);
            var footer = new _chatFooter.ChatFooterComponent(this.utils, this.sendMessage.bind(this), this.settings.sendIcon, this.settings.stopIcon, this.settings.chatInputPlaceholder);
            footer.appendToElement(chat);
            var header = new _header.HeaderComponent(this.utils, this.settings.chatTitle, this.settings.chatSubTitle, 'chat-title', null, null);
            header.prependToElement(chat);
            return chat;
        }
    }, {
        key: "render",
        value: function render(element) {}
        /**
         * Remove the element
         */

    }, {
        key: "remove",
        value: function remove() {
            _get(ChatComponent.prototype.__proto__ || Object.getPrototypeOf(ChatComponent.prototype), "remove", this).call(this);
            this.dataService.onMessage = function () {};
        }
        /**
         * Render messages in the chat
         * @param {IMessage[]} messages
         */

    }, {
        key: "renderMessages",
        value: function renderMessages(messages) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var message = _step.value;

                    var messageComponent = _messageComponent.MessageComponentFactory.fromMessage(this.utils, this.settings, message);
                    messageComponent.onActionClick = this.onMessageActionClicked.bind(this);
                    this.scrollContent.appendChild(messageComponent.render());
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
        /**
         * Called when message action button was clicked
         * @param {IMessageActionEvent} event
         */

    }, {
        key: "onMessageActionClicked",
        value: function onMessageActionClicked(event) {
            var _this2 = this;

            event.messageComponent.disableActions();
            if (event.type === _actionPayload.ACTION_TYPE.POST_BACK) {
                event.getPayload().then(function (payload) {
                    var message = (0, _message2.createUserMessage)({
                        type: _messagePayload.PAYLOAD_TYPE.POSTBACK,
                        text: event.label,
                        postback: payload
                    }, _this2.settings.channel);
                    _this2.sendMessageToServer(message);
                });
            } else if (event.type === _actionPayload.ACTION_TYPE.LOCATION) {
                // add loading element to the chat
                var messagesElement = document.getElementById(ChatComponent.MESSAGES_ID);
                var loading = new _loadingMessage.LoadingMessageComponent('Loading location', _message.MESSAGE_SIDE.RIGHT, this.utils);
                messagesElement.appendChild(loading.render());
                this.scrollToBottom();
                // get event payload
                event.getPayload().then(function (payload) {
                    loading.remove();
                    var message = (0, _message2.createUserMessage)({
                        type: _messagePayload.PAYLOAD_TYPE.LOCATION,
                        location: {
                            title: event.label === '@Share Location' ? '@demo location' : undefined,
                            longitude: payload.longitude,
                            latitude: payload.latitude
                        }
                    }, _this2.settings.channel);
                    _this2.sendMessageToServer(message);
                });
            }
        }
        /**
         * Called when message received from the server
         * @param {IMessage} message
         */

    }, {
        key: "onMessageReceived",
        value: function onMessageReceived(message) {
            this._logger.debug('onMessageReceived', message);
            this.renderMessages([message]);
            this.scrollToBottom();
        }
        /**
         * Create and send user message
         * @param {string} text
         */

    }, {
        key: "sendMessage",
        value: function sendMessage(text) {
            var payload = {
                type: _messagePayload.PAYLOAD_TYPE.TEXT,
                text: text
            };
            var message = (0, _message2.createUserMessage)(payload, this.settings.channel);
            this.sendMessageToServer(message);
        }
        /**
         * Send message to the server
         * @param message
         */

    }, {
        key: "sendMessageToServer",
        value: function sendMessageToServer(message) {
            // Check if the message is chat action and application in debug mode
            if (!this.settings.isDebugMode || !this.chatActions.process(message)) {
                this.dataService.send(message);
            }
        }
        /**
         * Scroll all the chat content to the last message
         */

    }, {
        key: "scrollToBottom",
        value: function scrollToBottom() {
            setTimeout(function () {
                var element = document.getElementById(ChatComponent.MESSAGES_ID);
                element.scrollTop = element.scrollHeight - 300;
            });
        }
    }]);

    return ChatComponent;
}(_component.Component);

ChatComponent.MESSAGES_ID = 'ochat_widget_messages';


},{"../../core/factories/message-component.factory":32,"../../core/logger":33,"../../model/common/message":42,"../../model/common/payloads/action-payload/action-payload.interface":43,"../../model/common/payloads/message-payload/message-payload.interface":46,"../../providers/chat-actions":49,"../component":21,"../shared/header/header.component":26,"./chat-footer/chat-footer.component":1,"./messages/loading-message/loading-message.component":16,"./messages/message.component":18}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Base class for action components
 */
var ActionComponent = function () {
    function ActionComponent(utils, payload) {
        _classCallCheck(this, ActionComponent);

        this.utils = utils;
        this.disabled = false;
        this.type = payload.type;
        this.label = payload.label;
        this.imageUrl = payload.imageUrl;
    }

    _createClass(ActionComponent, [{
        key: 'render',
        value: function render() {
            this.htmlElement = this.utils.createAnchor();
            this.htmlElement.onclick = this.handleOnClick.bind(this);
            if (this.label) {
                this.htmlElement.innerText = this.label;
            } else {
                var img = this.utils.createImage(this.imageUrl);
                this.htmlElement.appendChild(img);
            }
            return this.htmlElement;
        }
    }, {
        key: 'handleOnClick',
        value: function handleOnClick(event) {
            if (this.onActionClick && !this.disabled) {
                var _event = {
                    type: this.type,
                    getPayload: this.getEventPayload.bind(this),
                    label: this.label
                };
                this.onActionClick(_event);
            }
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.disabled = true;
            this.htmlElement.classList.add(this.utils.getCssClassWithPrefix('disabled'));
        }
    }]);

    return ActionComponent;
}();

exports.ActionComponent = ActionComponent;


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CallActionComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _action = require('./action.component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts action payload to component
 */
var CallActionComponent = function (_ActionComponent) {
    _inherits(CallActionComponent, _ActionComponent);

    function CallActionComponent(utils, payload) {
        _classCallCheck(this, CallActionComponent);

        var _this = _possibleConstructorReturn(this, (CallActionComponent.__proto__ || Object.getPrototypeOf(CallActionComponent)).call(this, utils, payload));

        _this.phoneNumber = payload.phoneNumber;
        return _this;
    }

    _createClass(CallActionComponent, [{
        key: 'render',
        value: function render() {
            var link = _get(CallActionComponent.prototype.__proto__ || Object.getPrototypeOf(CallActionComponent.prototype), 'render', this).call(this);
            link.classList.add(this.utils.getCssClassWithPrefix('action-call'));
            link.href = 'tel:' + this.phoneNumber;
            return link;
        }
    }, {
        key: 'getEventPayload',
        value: function getEventPayload() {
            return Promise.resolve(this.phoneNumber);
        }
    }]);

    return CallActionComponent;
}(_action.ActionComponent);

exports.CallActionComponent = CallActionComponent;


},{"./action.component":3}],5:[function(require,module,exports){
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


},{"./action.component":3}],6:[function(require,module,exports){
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


},{"./action.component":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UrlActionComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _action = require('./action.component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts action payload to component
 */
var UrlActionComponent = function (_ActionComponent) {
    _inherits(UrlActionComponent, _ActionComponent);

    function UrlActionComponent(utils, payload) {
        _classCallCheck(this, UrlActionComponent);

        var _this = _possibleConstructorReturn(this, (UrlActionComponent.__proto__ || Object.getPrototypeOf(UrlActionComponent)).call(this, utils, payload));

        _this.url = payload.url;
        return _this;
    }

    _createClass(UrlActionComponent, [{
        key: 'render',
        value: function render() {
            var link = _get(UrlActionComponent.prototype.__proto__ || Object.getPrototypeOf(UrlActionComponent.prototype), 'render', this).call(this);
            link.classList.add(this.utils.getCssClassWithPrefix('action-url'));
            link.target = '_blank';
            link.href = this.url;
            return link;
        }
    }, {
        key: 'getEventPayload',
        value: function getEventPayload() {
            return Promise.resolve(this.url);
        }
    }]);

    return UrlActionComponent;
}(_action.ActionComponent);

exports.UrlActionComponent = UrlActionComponent;


},{"./action.component":3}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttachmentMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _message = require("../message.component");

var _attachmentPayload = require("../../../../model/common/payloads/attachment-payload.interface");

var _imageAttachment = require("./attachments/image-attachment.component");

var _videoAttachment = require("./attachments/video-attachment.component");

var _audioAttachment = require("./attachments/audio-attachment.component");

var _fileAttachment = require("./attachments/file-attachment.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts attachment message payload to component
 */
var AttachmentMessageComponent = function (_MessageComponent) {
    _inherits(AttachmentMessageComponent, _MessageComponent);

    function AttachmentMessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, AttachmentMessageComponent);

        var _this = _possibleConstructorReturn(this, (AttachmentMessageComponent.__proto__ || Object.getPrototypeOf(AttachmentMessageComponent)).call(this, utils, settings, payload, side));

        _this.payload = payload;
        _this.attachment = AttachmentMessageComponent.fromPayload(utils, settings, payload.attachment);
        return _this;
    }
    /**
     * Renders dom from component object
     * @param {HTMLElement} [messageContent] - message content
     * @return {HTMLElement}
     */


    _createClass(AttachmentMessageComponent, [{
        key: "render",
        value: function render(messageContent) {
            var div = this.utils.createDiv();
            div.appendChild(_get(AttachmentMessageComponent.prototype.__proto__ || Object.getPrototypeOf(AttachmentMessageComponent.prototype), "render", this).call(this));
            return div;
        }
    }, {
        key: "getContent",
        value: function getContent() {
            return this.attachment.render();
        }
    }], [{
        key: "fromPayload",
        value: function fromPayload(utils, settings, payload) {
            switch (payload.type) {
                case _attachmentPayload.ATTACHMENT_TYPE.IMAGE:
                    return new _imageAttachment.ImageAttachmentComponent(utils, payload);
                case _attachmentPayload.ATTACHMENT_TYPE.VIDEO:
                    return new _videoAttachment.VideoAttachmentComponent(utils, settings, payload);
                case _attachmentPayload.ATTACHMENT_TYPE.AUDIO:
                    return new _audioAttachment.AudioAttachmentComponent(utils, settings, payload);
                case _attachmentPayload.ATTACHMENT_TYPE.FILE:
                    return new _fileAttachment.FileAttachmentComponent(utils, payload);
                default:
                    throw Error('Payload contains wrong attachment type');
            }
        }
    }]);

    return AttachmentMessageComponent;
}(_message.MessageComponent);

exports.AttachmentMessageComponent = AttachmentMessageComponent;


},{"../../../../model/common/payloads/attachment-payload.interface":44,"../message.component":18,"./attachments/audio-attachment.component":10,"./attachments/file-attachment.component":11,"./attachments/image-attachment.component":12,"./attachments/video-attachment.component":13}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
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


},{"./attachment.component":9}],11:[function(require,module,exports){
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


},{"./attachment.component":9}],12:[function(require,module,exports){
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


},{"./attachment.component":9}],13:[function(require,module,exports){
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


},{"./attachment.component":9}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _message = require("../message.component");

var _card = require("./card.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Converts card message payload to component
 */
var CardMessageComponent = function (_MessageComponent) {
    _inherits(CardMessageComponent, _MessageComponent);

    function CardMessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, CardMessageComponent);

        var _this = _possibleConstructorReturn(this, (CardMessageComponent.__proto__ || Object.getPrototypeOf(CardMessageComponent)).call(this, utils, settings, payload, side));

        _this.cards = [];
        _this.layout = payload.layout;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = payload.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var card = _step.value;

                _this.cards.push(new _card.CardComponent(_this.utils, card));
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

        return _this;
    }
    /**
     * Renders dom from component object
     * <div class="card-message card-message-horizontal | card-message-vertical">
     *    <div class="card-message-content">
     *        <div class="card-message-cards">
     *            {cards}
     *        </div>
     *        <div class="message-actions">{actions}</div>
     *    </div>
     *    <div class="message-global-actions">{globalActions}</div>
     * </div>
     * @return {HTMLElement}
     */


    _createClass(CardMessageComponent, [{
        key: "render",
        value: function render() {
            var message = this.utils.createDiv(['card-message', 'card-message-' + this.layout, this.side]);
            var content = this.utils.createDiv(['card-message-content']);
            var cards = this.utils.createDiv(['card-message-cards']);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.cards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var card = _step2.value;

                    var cardComponent = card;
                    cardComponent.onActionClick = this.handleOnActionClick.bind(this);
                    cards.appendChild(cardComponent.render());
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

            cards.appendChild(this.utils.createDiv(['clear']));
            content.appendChild(cards);
            message.appendChild(content);
            this.appendGlobalActions(message, this.actions);
            this.appendGlobalActions(message, this.globalActions);
            return message;
        }
    }, {
        key: "disableActions",
        value: function disableActions() {
            _get(CardMessageComponent.prototype.__proto__ || Object.getPrototypeOf(CardMessageComponent.prototype), "disableActions", this).call(this);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.cards[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var card = _step3.value;

                    card.disableActions();
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
    }]);

    return CardMessageComponent;
}(_message.MessageComponent);

exports.CardMessageComponent = CardMessageComponent;


},{"../message.component":18,"./card.component":15}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _actionComponent = require('../../../../core/factories/action-component.factory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts card message payload to component.
 */
var CardComponent = function () {
    function CardComponent(utils, payload) {
        _classCallCheck(this, CardComponent);

        this.utils = utils;
        this.actions = [];
        this.title = payload.title;
        this.description = payload.description;
        this.imageUrl = payload.imageUrl;
        this.url = payload.url;
        if (payload.actions) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = payload.actions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var action = _step.value;

                    var actionComponent = _actionComponent.ActionComponentFactory.fromActionPayload(utils, action);
                    if (actionComponent) {
                        actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                        this.actions.push(actionComponent);
                    }
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
    }

    _createClass(CardComponent, [{
        key: 'handleOnActionClick',
        value: function handleOnActionClick(event) {
            if (this.onActionClick) {
                this.onActionClick(event);
            }
        }
        /**
         * Renders dom from component object
         * <div class="card">
         *   <img src="imageUrl"/>
         *   <div class="card-content">
         *       <span class="card-title">{title}</span>
         *       <p>{description}</p>
         *   </div>
         *   <div class="card-actions">
         *      {actions}
         *   </div>
         *   <div class="clear"></div>
         * </div>
         * @return {HTMLElement}
         */

    }, {
        key: 'render',
        value: function render() {
            var card = this.utils.createDiv(['card']);
            if (this.imageUrl) {
                card.appendChild(this.utils.createImage(this.imageUrl));
            }
            var content = this.utils.createDiv(['card-content']);
            var title = this.utils.createSpan(['card-title']);
            title.innerText = this.title;
            content.appendChild(title);
            var desc = this.utils.createParagraph();
            desc.innerText = this.description;
            content.appendChild(desc);
            card.appendChild(content);
            if (this.actions.length > 0) {
                var actions = this.utils.createDiv(['card-actions']);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.actions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var action = _step2.value;

                        actions.appendChild(action.render());
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

                card.appendChild(actions);
            }
            return card;
        }
        /**
         * Disable actions buttons
         */

    }, {
        key: 'disableActions',
        value: function disableActions() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.actions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var action = _step3.value;

                    action.disable();
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
    }]);

    return CardComponent;
}();

exports.CardComponent = CardComponent;


},{"../../../../core/factories/action-component.factory":31}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spinner = require('../../../loading/spinner.component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents loading component
 */
var LoadingMessageComponent = function () {
    function LoadingMessageComponent(text, side, utils) {
        _classCallCheck(this, LoadingMessageComponent);

        this.text = text;
        this.side = side;
        this.utils = utils;
    }
    /**
     * Renders the loading message elements
     * <div class="loading-message">
     *     <div class="message-bubble right | left">
     *        <div class="message-content">
     *             {SpinnerComponent}
     *            <span>{text}</span>
     *        </div>
     *     </div>
     *     <div class="clear"></div>
     * </div>
     * @return {HTMLElement}
     */


    _createClass(LoadingMessageComponent, [{
        key: 'render',
        value: function render() {
            this.element = this.utils.createDiv(['loading-message', this.side]);
            var bubble = this.utils.createDiv(['message-bubble']);
            var content = this.utils.createDiv(['message-content']);
            content.appendChild(new _spinner.SpinnerComponent(this.utils).render());
            var text = this.utils.createSpan();
            text.innerText = this.text;
            content.appendChild(text);
            bubble.appendChild(content);
            this.element.appendChild(bubble);
            this.element.appendChild(this.utils.createDiv(['clear']));
            return this.element;
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.element.remove();
        }
    }]);

    return LoadingMessageComponent;
}();

exports.LoadingMessageComponent = LoadingMessageComponent;


},{"../../../loading/spinner.component":23}],17:[function(require,module,exports){
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


},{"../../../../model/common/payloads/action-payload/action-payload.interface":43,"../actions/url-action.component":7,"../message.component":18}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageComponent = exports.MESSAGE_SIDE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actionComponent2 = require('../../../core/factories/action-component.factory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MESSAGE_SIDE = {
    RIGHT: 'right',
    LEFT: 'left'
};
exports.MESSAGE_SIDE = MESSAGE_SIDE;
/**
 * Base class for the messages components
 * Converts message payload to component.
 */

var MessageComponent = function () {
    function MessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, MessageComponent);

        this.utils = utils;
        this.settings = settings;
        this.side = side;
        this.actions = [];
        this.globalActions = [];
        // Create the message actions components
        if (payload.actions) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = payload.actions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var action = _step.value;

                    var actionComponent = _actionComponent2.ActionComponentFactory.fromActionPayload(utils, action);
                    if (actionComponent) {
                        actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                        this.actions.push(actionComponent);
                    }
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
        // Create the message global actions components
        if (payload.globalActions) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = payload.globalActions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _action = _step2.value;

                    var _actionComponent = _actionComponent2.ActionComponentFactory.fromActionPayload(utils, _action);
                    if (_actionComponent) {
                        _actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                        this.globalActions.push(_actionComponent);
                    }
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
    }
    /**
     * Renders dom from component object
     * <div class="message">
     *    <div class="message-wrapper">
     *        <img class="message-profile-pic right | left" src="{PROFILE_PICTURE}"/>
     *        <div class="message-bubble right | left">
     *             <div class="message-content">{messageContent | getContent()}</div>
     *             <div class="message-actions">{actions}</div>
     *        </div>
     *    <div>
     *    <div class="message-global-actions">{globalActions}</div>
     *    <div class="clear"></div>
     * </div>
     * @param {HTMLElement} [messageContent] - message content
     * @return {HTMLElement}
     */


    _createClass(MessageComponent, [{
        key: 'render',
        value: function render(messageContent) {
            var message = this.utils.createDiv(['message', this.side]);
            var messageWrapper = this.utils.createDiv(['message-wrapper']);
            message.appendChild(messageWrapper);
            var profilePicUrl = this.side === MESSAGE_SIDE.LEFT ? this.settings.botIcon : this.settings.personIcon;
            if (profilePicUrl) {
                messageWrapper.classList.add(this.utils.getCssClassWithPrefix('has-profile-pic'));
                messageWrapper.appendChild(this.utils.createImage(profilePicUrl, ['message-profile-pic']));
            }
            var bubble = this.utils.createDiv(['message-bubble']);
            var content = this.utils.createDiv(['message-content']);
            content.appendChild(messageContent || this.getContent());
            bubble.appendChild(content);
            if (this.actions) {
                this.appendActions(bubble, this.actions);
            }
            messageWrapper.appendChild(bubble);
            messageWrapper.appendChild(this.utils.createDiv(['clear']));
            if (this.globalActions) {
                this.appendGlobalActions(message, this.globalActions);
            }
            message.appendChild(this.utils.createDiv(['clear']));
            return message;
        }
        /**
         * Method that returns this message content.
         * @return {HTMLElement}
         */

    }, {
        key: 'getContent',
        value: function getContent() {
            throw new Error("Method not implemented.");
        }
        /**
         * Disable actions buttons
         */

    }, {
        key: 'disableActions',
        value: function disableActions() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.actions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var action = _step3.value;

                    action.disable();
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

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.globalActions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _action2 = _step4.value;

                    _action2.disable();
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
        /**
         * Handles the action button click
         * @param {IActionEvent} event
         */

    }, {
        key: 'handleOnActionClick',
        value: function handleOnActionClick(event) {
            if (this.onActionClick) {
                var messageEvent = event;
                messageEvent.messageComponent = this;
                this.onActionClick(messageEvent);
            }
        }
    }, {
        key: 'appendActions',
        value: function appendActions(parent, actions) {
            if (actions.length > 0) {
                var actionsElement = this.utils.createDiv(['message-actions']);
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = actions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var action = _step5.value;

                        actionsElement.appendChild(action.render());
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

                parent.appendChild(actionsElement);
            }
        }
    }, {
        key: 'appendGlobalActions',
        value: function appendGlobalActions(parent, actions) {
            if (actions.length > 0) {
                var actionsElement = this.utils.createDiv(['message-global-actions']);
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = actions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var action = _step6.value;

                        actionsElement.appendChild(action.render());
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

                parent.appendChild(actionsElement);
            }
        }
    }]);

    return MessageComponent;
}();

exports.MessageComponent = MessageComponent;


},{"../../../core/factories/action-component.factory":31}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RawMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require("../message.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates HTML elements for the raw message type.
 * <span>{content}</span>
 */
var RawMessageComponent = function (_MessageComponent) {
    _inherits(RawMessageComponent, _MessageComponent);

    function RawMessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, RawMessageComponent);

        var _this = _possibleConstructorReturn(this, (RawMessageComponent.__proto__ || Object.getPrototypeOf(RawMessageComponent)).call(this, utils, settings, payload, side));

        _this.payload = JSON.stringify(payload.payload);
        return _this;
    }

    _createClass(RawMessageComponent, [{
        key: "getContent",
        value: function getContent() {
            var span = this.utils.createSpan();
            span.innerText = this.payload;
            return span;
        }
    }]);

    return RawMessageComponent;
}(_message.MessageComponent);

exports.RawMessageComponent = RawMessageComponent;


},{"../message.component":18}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextMessageComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require("../message.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates HTML elements for the text message type.
 * The text scanned for the links and embedded videos, all the link replaced with HTML.
 * <span>{content}</span>
 */
var TextMessageComponent = function (_MessageComponent) {
    _inherits(TextMessageComponent, _MessageComponent);

    function TextMessageComponent(utils, settings, payload, side) {
        _classCallCheck(this, TextMessageComponent);

        var _this = _possibleConstructorReturn(this, (TextMessageComponent.__proto__ || Object.getPrototypeOf(TextMessageComponent)).call(this, utils, settings, payload, side));

        _this.text = payload.text;
        return _this;
    }

    _createClass(TextMessageComponent, [{
        key: "getContent",
        value: function getContent() {
            var span = this.utils.createSpan();
            span.innerHTML = this.utils.linkify(this.text, this.settings.embeddedVideo);
            if (this.side === "left") {
                var msg = new SpeechSynthesisUtterance(this.text);
                window.speechSynthesis.speak(msg);
                console.log(this.side);
            }
            return span;
        }
    }]);

    return TextMessageComponent;
}(_message.MessageComponent);

exports.TextMessageComponent = TextMessageComponent;


},{"../message.component":18}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Base class for components
 */
var Component = function () {
    function Component(utils) {
        _classCallCheck(this, Component);

        this.utils = utils;
    }
    /**
     * Add css class to the component element
     * @param {string} className
     */


    _createClass(Component, [{
        key: 'addClass',
        value: function addClass(className) {
            this.element.classList.add(this.utils.getCssClassWithPrefix(className));
        }
    }, {
        key: 'hide',

        /**
         * Hide/Show the component
         * @param {boolean} hide
         */
        value: function hide() {
            var _hide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (_hide) {
                this.orgDisplayStyle = this.element.style.display;
                this.element.style.display = 'none';
            } else {
                this.element.style.display = this.orgDisplayStyle;
            }
        }
        /**
         * Remove the element from the DOM
         */

    }, {
        key: 'remove',
        value: function remove() {
            this.element.remove();
        }
        /**
         * Add the component element as a last child to the parent element
         * @param {HTMLElement} parent
         */

    }, {
        key: 'appendToElement',
        value: function appendToElement(parent) {
            parent.appendChild(this.element);
        }
        /**
         * Put current component element as the first child of provided element
         * @param {HTMLElement} parentElement to put as the first child to
         */

    }, {
        key: 'prependToElement',
        value: function prependToElement(parentElement) {
            var firstChild = parentElement.firstChild;
            if (firstChild) {
                parentElement.insertBefore(this.element, firstChild);
            } else {
                parentElement.appendChild(this.element);
            }
        }
        /**
         * Add provided element as last child to the component element
         * @param {HTMLElement} child
         */

    }, {
        key: 'appendContentChildElement',
        value: function appendContentChildElement(child) {
            this.getContentElement().appendChild(child);
        }
    }, {
        key: 'appendContentChild',
        value: function appendContentChild(child) {
            this.getContentElement().appendChild(child.element);
        }
    }, {
        key: 'getContentElement',
        value: function getContentElement() {
            return this.element;
        }
    }]);

    return Component;
}();



exports.Component = Component;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../component");

var _spinner = require("./spinner.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates full screen loading element.
 <div id="loading">
     <div class="backdrop"></div>
     <div class="loading-wrapper">
        {SpinnerComponent}
         <div class="content"></div>
     </div>
 </div>
 */
var LoadingComponent = exports.LoadingComponent = function (_Component) {
    _inherits(LoadingComponent, _Component);

    function LoadingComponent(utils) {
        _classCallCheck(this, LoadingComponent);

        var _this = _possibleConstructorReturn(this, (LoadingComponent.__proto__ || Object.getPrototypeOf(LoadingComponent)).call(this, utils));

        _this.element = _this._createElement();
        _this.hide();
        return _this;
    }

    _createClass(LoadingComponent, [{
        key: "render",
        value: function render(element) {}
    }, {
        key: "_createElement",
        value: function _createElement() {
            var loading = this.utils.createDiv(['loading']);
            loading.appendChild(this.utils.createDiv(['backdrop']));
            var wrapper = loading.appendChild(this.utils.createDiv(['wrapper']));
            wrapper.appendChild(new _spinner.SpinnerComponent(this.utils).render());
            this.content = wrapper.appendChild(this.utils.createDiv(['content']));
            return loading;
        }
    }, {
        key: "present",
        value: function present(message) {
            this.hide(false);
            this.setContent(message);
        }
    }, {
        key: "dismiss",
        value: function dismiss() {
            this.hide();
            this.setContent('');
        }
    }, {
        key: "getContentElement",
        value: function getContentElement() {
            return this.element;
        }
    }, {
        key: "setContent",
        value: function setContent(message) {
            this.content.innerHTML = message;
        }
    }]);

    return LoadingComponent;
}(_component.Component);


},{"../component":21,"./spinner.component":23}],23:[function(require,module,exports){
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


},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OpenButtonComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../component");

var _iconButton = require("../shared/icon-button/icon-button.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * The component create open chat button element on the web page
 * <IconButtonComponent class="chat-button">
 */
var OpenButtonComponent = exports.OpenButtonComponent = function (_Component) {
    _inherits(OpenButtonComponent, _Component);

    function OpenButtonComponent(utils, settings, onOpen) {
        _classCallCheck(this, OpenButtonComponent);

        var _this = _possibleConstructorReturn(this, (OpenButtonComponent.__proto__ || Object.getPrototypeOf(OpenButtonComponent)).call(this, utils));

        _this.settings = settings;
        _this.onOpen = onOpen;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(OpenButtonComponent, [{
        key: "render",
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: "_createElement",
        value: function _createElement() {
            var openButton = new _iconButton.IconButtonComponent(this.utils, this.onOpen.bind(this), this.settings.openIcon, 'chat-button');
            return openButton.element;
        }
    }]);

    return OpenButtonComponent;
}(_component.Component);


},{"../component":21,"../shared/icon-button/icon-button.component":27}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FooterComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require('../../component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * The component creates footer toolbar element
 *  <div class="footer">
 *      <div class="toolbar">
 *          {content}
 *      </div>
 *  </div>
 */
var FooterComponent = exports.FooterComponent = function (_Component) {
    _inherits(FooterComponent, _Component);

    function FooterComponent(utils, className) {
        _classCallCheck(this, FooterComponent);

        var _this = _possibleConstructorReturn(this, (FooterComponent.__proto__ || Object.getPrototypeOf(FooterComponent)).call(this, utils));

        _this.className = className;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(FooterComponent, [{
        key: 'render',
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: '_createElement',
        value: function _createElement() {
            var footer = this.utils.createDiv(['footer']);
            var toolbar = this.utils.createDiv(['toolbar']);
            this.content = toolbar;
            footer.appendChild(toolbar);
            return footer;
        }
    }, {
        key: 'getContentElement',
        value: function getContentElement() {
            return this.content;
        }
    }]);

    return FooterComponent;
}(_component.Component);


},{"../../component":21}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require('../../component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 *  <div class="header">
 *      <left-button class="left"></left-button>
 *      <span class="header-title">{title}</span>
 *      <span class="header-sub-title">{sub title}</span>
 *      <right-button class="right"></right-button>
 *  </div>
 */
var HeaderComponent = exports.HeaderComponent = function (_Component) {
    _inherits(HeaderComponent, _Component);

    function HeaderComponent(utils, title) {
        var subTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var rightButton = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var leftButton = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

        _classCallCheck(this, HeaderComponent);

        var _this = _possibleConstructorReturn(this, (HeaderComponent.__proto__ || Object.getPrototypeOf(HeaderComponent)).call(this, utils));

        _this.title = title;
        _this.subTitle = subTitle;
        _this.className = className;
        _this.rightButton = rightButton;
        _this.leftButton = leftButton;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(HeaderComponent, [{
        key: 'render',
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: '_createElement',
        value: function _createElement() {
            var header = this.utils.createDiv(['header', this.className]);
            if (this.leftButton) {
                this.leftButton.addClass('left');
                header.appendChild(this.leftButton.element);
            }
            var titleElem = this.utils.createSpan(['header-title']);
            titleElem.innerText = this.title;
            header.appendChild(titleElem);
            if (this.subTitle) {
                var subTitleElem = this.utils.createSpan(['header-sub-title']);
                subTitleElem.innerText = this.subTitle;
                header.appendChild(subTitleElem);
            }
            if (this.rightButton) {
                this.rightButton.addClass('right');
                header.appendChild(this.rightButton.element);
            }
            return header;
        }
    }]);

    return HeaderComponent;
}(_component.Component);


},{"../../component":21}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconButtonComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../../component");

var _icon = require("../icon/icon.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates a button with icon element
 * <button class="button icon-button {className}">
 *     <IconComponent>
 * </button>
 */
var IconButtonComponent = exports.IconButtonComponent = function (_Component) {
    _inherits(IconButtonComponent, _Component);

    function IconButtonComponent(utils, onClick, imgSrc) {
        var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

        _classCallCheck(this, IconButtonComponent);

        var _this = _possibleConstructorReturn(this, (IconButtonComponent.__proto__ || Object.getPrototypeOf(IconButtonComponent)).call(this, utils));

        _this.onClick = onClick;
        _this.imgSrc = imgSrc;
        _this.className = className;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(IconButtonComponent, [{
        key: "render",
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: "_createElement",
        value: function _createElement() {
            var _this2 = this;

            var button = this.utils.createButton(['button', 'icon-button', this.className]);
            button.onclick = function () {
                return _this2.onClick(button.innerText);
            };
            var icon = new _icon.IconComponent(this.utils, this.imgSrc);
            button.appendChild(icon.element);
            return button;
        }
    }]);

    return IconButtonComponent;
}(_component.Component);


},{"../../component":21,"../icon/icon.component":28}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require('../../component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates icon element.
 * <i class="icon {className}"/>
 */
var IconComponent = exports.IconComponent = function (_Component) {
    _inherits(IconComponent, _Component);

    function IconComponent(utils, imgSrc) {
        var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        _classCallCheck(this, IconComponent);

        var _this = _possibleConstructorReturn(this, (IconComponent.__proto__ || Object.getPrototypeOf(IconComponent)).call(this, utils));

        _this.imgSrc = imgSrc;
        _this.className = className;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(IconComponent, [{
        key: 'render',
        value: function render(element) {
            element.appendChild(this.element);
        }
    }, {
        key: '_createElement',
        value: function _createElement() {
            var i = document.createElement('i');
            if (this.className) {
                i.classList.add(this.utils.getCssClassWithPrefix(this.className));
            }
            i.classList.add(this.utils.getCssClassWithPrefix('icon'));
            i.style.backgroundImage = 'url(\'' + this.imgSrc + '\')';
            return i;
        }
    }]);

    return IconComponent;
}(_component.Component);


},{"../../component":21}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Creates style element with the widget styles
 */
var StyleComponent = function () {
    function StyleComponent(utils) {
        _classCallCheck(this, StyleComponent);

        this.utils = utils;
    }

    _createClass(StyleComponent, [{
        key: 'render',
        value: function render() {
            return this.utils.createStyle(StyleComponent.STYLE);
        }
    }]);

    return StyleComponent;
}();

StyleComponent.STYLE = '@keyframes shadow-pulse{0%{box-shadow:0 0 0 0 rgba(255,0,0,.2)}100%{box-shadow:0 0 0 10px rgba(255,0,0,0)}}.chat-sample-custom-web-chat .chat-sample-custom-web-input{-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;margin:6px;appearance:none;display:block;width:100%;border:0;font-family:inherit;height:auto;font-weight:400;line-height:3rem;color:#403c38;background:transparent 8px center;border-bottom:1px solid #403c38}.chat-sample-custom-web-chat .chat-sample-custom-web-input:focus{border-bottom:1px solid #403c38;-webkit-box-shadow:0 1px 0 0 #403c38;box-shadow:0 1px 0 0 #403c38}.chat-sample-custom-web-chat .chat-sample-custom-web-toolbar .chat-sample-custom-web-button{background:0 0;border:none!important;font-size:0;box-shadow:none;box-sizing:content-box;display:block;width:35px;height:35px;padding:2px;cursor:pointer;position:absolute;right:3px;top:6px}.chat-sample-custom-web-chat .chat-sample-custom-web-toolbar .chat-sample-custom-web-icon-button{vertical-align:middle}.chat-sample-custom-web-chat{position:absolute;color:#000;bottom:10px;right:80px;display:block;width:350px;height:450px;contain:layout size style;transform:scale(0)}.chat-sample-custom-web-chat .chat-sample-custom-web-scroll-content{background-image:url(/chatbg.png);background-size:400px 400px;background-repeat:repeat;-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);margin-top:50px;position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;display:block;contain:size style layout;height:348px;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:auto;will-change:initial}.chat-sample-custom-web-open .chat-sample-custom-web-chat{animation:bouncein .4s ease-out forwards .2s;transform:scale(0)}.chat-sample-custom-web-close .chat-sample-custom-web-chat{transform:scale(1);animation:bounceout .25s ease-out forwards .2s}@keyframes bouncein{0%{transform:scale(0)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes bounceout{0%{transform:scale(1)}40%{transform:scale(1.1)}100%{transform:scale(0)}}.chat-sample-custom-web-card-actions{border-top:1px solid #e6e5eb}.chat-sample-custom-web-card-actions,.chat-sample-custom-web-message-actions{background-color:#fff;margin:10px -17px -9px;z-index:2;position:relative;border-radius:0 0 23px 1px}.chat-sample-custom-web-card-actions a,.chat-sample-custom-web-message-actions a{border-bottom:1px solid #e6e5eb;display:block;text-decoration:none;color:#000;cursor:pointer;padding:12px}.chat-sample-custom-web-right .chat-sample-custom-web-message-actions a{border-bottom-color:#158ffe}.chat-sample-custom-web-card-actions a:hover,.chat-sample-custom-web-message-actions a:hover{text-decoration:none}.chat-sample-custom-web-card-actions a:last-child,.chat-sample-custom-web-message-actions a:last-child{border-bottom:0;margin-bottom:0;border-radius:0 0 23px 1px}.chat-sample-custom-web-message .chat-sample-custom-web-message-global-actions{margin:7px}.chat-sample-custom-web-message-global-actions a{display:inline-block;border:1px solid #e6e5eb;border-radius:4px;margin:.4rem .2rem;padding:1px 13px;text-decoration:none;color:#000;cursor:pointer}.chat-sample-custom-web-card-actions a.chat-sample-custom-web-disabled,.chat-sample-custom-web-message-actions a.chat-sample-custom-web-disabled,.chat-sample-custom-web-message-global-actions a.chat-sample-custom-web-disabled{cursor:default;background-color:#f8f8f8;pointer-events:none}.chat-sample-custom-web-attachment-image,.chat-sample-custom-web-attachment-video{width:100%}.chat-sample-custom-web-attachment-file{word-break:break-all}.chat-sample-custom-web-attachment-audio{width:190px}.chat-sample-custom-web-card{margin:10px 10px 10px 10px;width:calc(100% - 20px);border-radius:2px;background:#fff;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);display:block;overflow:hidden;padding:13px 16px 13px 16px}.chat-sample-custom-web-card img{width:100%}.chat-sample-custom-web-card-message-horizontal .chat-sample-custom-web-card-message-cards{overflow-x:scroll;white-space:nowrap}.chat-sample-custom-web-card-message-horizontal .chat-sample-custom-web-card{width:266px;display:inline-block}.chat-sample-custom-web-message{position:relative}.chat-sample-custom-web-attachment-image,.chat-sample-custom-web-attachment-video{width:100%}.chat-sample-custom-web-attachment-file{word-break:break-all}.chat-sample-custom-web-attachment-audio{width:190px}.chat-sample-custom-web-message-bubble{border-radius:24px;display:inline-block;padding:10px 18px;position:relative;margin:10px;max-width:80%;box-shadow:0 2px 16px 0 rgba(33,31,28,.24)}.chat-sample-custom-web-message-bubble:before{content:"";display:block;height:16px;width:9px;position:absolute;bottom:-7.5px;z-index:1}.chat-sample-custom-web-message-content{overflow:hidden;word-wrap:break-word}.chat-sample-custom-web-left .chat-sample-custom-web-message-bubble{background-color:#57504a;color:#fff;float:left;border-bottom-left-radius:0}.chat-sample-custom-web-left .chat-sample-custom-web-has-profile-pic .chat-sample-custom-web-message-bubble{margin-left:40px}.chat-sample-custom-web-right .chat-sample-custom-web-message-bubble{background-color:#fff;color:#000;float:right;border-bottom-right-radius:0}.chat-sample-custom-web-right .chat-sample-custom-web-has-profile-pic .chat-sample-custom-web-message-bubble{margin-right:40px}.chat-sample-custom-web-message-profile-pic{display:inline-block;width:25px;height:25px;border-radius:50%;position:absolute;bottom:6px;background-color:rgba(20,0,0,.12)}.chat-sample-custom-web-left .chat-sample-custom-web-message-profile-pic{left:10px}.chat-sample-custom-web-right .chat-sample-custom-web-message-profile-pic{right:10px}.chat-sample-custom-web-message-wrapper{position:relative}.chat-sample-custom-web-loading{display:none;z-index:10001;position:absolute;top:0;right:0;bottom:0;left:0;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;contain:strict}.chat-sample-custom-web-loading .chat-sample-custom-web-backdrop{opacity:.5;position:absolute;top:0;left:0;z-index:2;display:block;width:100%;height:100%;background-color:#000;-webkit-transform:translateZ(0);transform:translateZ(0)}.chat-sample-custom-web-loading .chat-sample-custom-web-wrapper{padding:15px 10px 15px 15px;max-width:280px;max-height:90%;border-radius:2px;color:rgba(0,0,0,.5);background:#fafafa;box-shadow:0 16px 20px rgba(0,0,0,.4);z-index:10;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.chat-sample-custom-web-spinner{position:relative;display:inline-block;width:28px;height:28px;margin-right:5px}.chat-sample-custom-web-spinner svg{animation-duration:750ms;-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite;overflow:hidden;position:absolute;top:0;left:0;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}.chat-sample-custom-web-spinner circle{stroke:#387ef5;fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px}@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.chat-sample-custom-web-chat-button{box-sizing:border-box;display:block;position:absolute;width:65px;height:65px;padding:0;cursor:pointer;bottom:0;right:0;background:0 0;border:none!important;font-size:0;box-shadow:none}.chat-sample-custom-web-chat-button.chat-sample-custom-web-button:hover,.chat-sample-custom-web-open .chat-sample-custom-web-chat-button.chat-sample-custom-web-button{transform:scale(1.05)}.chat-sample-custom-web-chat-button.chat-sample-custom-web-button i{background:no-repeat center center;border:2px solid #fff;background-size:100%;width:100%;height:100%;border-radius:50%;-webkit-align-self:stretch;align-self:stretch;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;display:-webkit-flex;display:flex}.chat-sample-custom-web-footer{position:absolute;bottom:0;left:0;z-index:10;display:block;width:100%;box-shadow:0 -4px 10px 0 rgba(0,0,0,.1)}.chat-sample-custom-web-footer .chat-sample-custom-web-toolbar{color:rgba(0,0,0,.87);background-color:#fff;box-sizing:border-box;-webkit-tap-highlight-color:transparent;height:52px;position:relative;padding:3px 50px 3px 3px;border-radius:0 0 6px 6px}.chat-sample-custom-web-header{background-image:url(/headerbg.png);border-radius:6px 6px 0 0;position:absolute;top:0;left:0;z-index:10;display:block;width:100%;background:#57504a;height:50px;padding:3px;-webkit-box-shadow:0 2px 8px 0 rgba(0,0,0,.11);box-shadow:0 2px 8px 0 rgba(0,0,0,.11)}.chat-sample-custom-web-header .chat-sample-custom-web-avatar{position:absolute;display:block;background:rgba(20,0,0,.12) no-repeat center center;background-size:80%;width:40px;height:40px;border-radius:50%;-webkit-align-self:stretch;align-self:stretch;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;top:4px;left:4px}.chat-sample-custom-web-header-title{padding:0 12px;font-weight:500;color:#fff;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;font-size:16px}.chat-sample-custom-web-header-sub-title{color:#fff;text-align:center;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.chat-sample-custom-web-header .chat-sample-custom-web-button{top:8px;position:absolute;border-radius:50%;box-sizing:border-box;display:block;width:35px;height:35px;padding:2px;cursor:pointer}.chat-sample-custom-web-header .chat-sample-custom-web-button.chat-sample-custom-web-right{right:3px}.chat-sample-custom-web-header .chat-sample-custom-web-button .chat-sample-custom-web-icon{background-size:15px;width:15px;height:15px}.chat-sample-custom-web-icon{padding:0;pointer-events:none;display:inline-block;background-size:20px 20px;width:20px;height:20px;vertical-align:middle}.chat-sample-custom-web-button:active,.chat-sample-custom-web-button:focus,.chat-sample-custom-web-input:active,.chat-sample-custom-web-input:focus{outline:0}.chat-sample-custom-web-clear{clear:both}.chat-sample-custom-web-widget{font-family:"Oracle Sans","Helvetica Neue",sans-serif;font-size:13px;position:fixed;z-index:10;display:block;width:350px;height:450px}';
exports.StyleComponent = StyleComponent;


},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WidgetComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../component");

var _loading = require("../loading/loading.component");

var _chat = require("../chat/chat.component");

var _openButton = require("../open-button/open-button.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This component creates wrapper for the widget.
 * <div class="widget" style="{bottom, left, top, right}">
 *     <LoadingComponent/>
 *     <OpenButtonComponent/>
 *     <ChatComponent>
 * </div>
 */
var WidgetComponent = exports.WidgetComponent = function (_Component) {
    _inherits(WidgetComponent, _Component);

    function WidgetComponent(utils, settings, dataService) {
        _classCallCheck(this, WidgetComponent);

        var _this = _possibleConstructorReturn(this, (WidgetComponent.__proto__ || Object.getPrototypeOf(WidgetComponent)).call(this, utils));

        _this.settings = settings;
        _this.dataService = dataService;
        _this.isOpen = false;
        _this.element = _this._createElement();
        return _this;
    }

    _createClass(WidgetComponent, [{
        key: "render",
        value: function render(element) {}
    }, {
        key: "_createElement",
        value: function _createElement() {
            var _this2 = this;

            var div = this.utils.createDiv(['widget']);
            // set widget position
            if (this.settings.position.bottom) {
                div.style.bottom = this.settings.position.bottom;
            }
            if (this.settings.position.left) {
                div.style.left = this.settings.position.left;
            }
            if (this.settings.position.top) {
                div.style.top = this.settings.position.top;
            }
            if (this.settings.position.right) {
                div.style.right = this.settings.position.right;
            }
            this.loadingComponent = new _loading.LoadingComponent(this.utils);
            div.appendChild(this.loadingComponent.element);
            this.chatButtonComponent = new _openButton.OpenButtonComponent(this.utils, this.settings, function () {
                return _this2.showChat();
            });
            div.appendChild(this.chatButtonComponent.element);
            this.chatComponent = new _chat.ChatComponent(this.utils, this.settings, this.dataService, this.loadingComponent);
            div.appendChild(this.chatComponent.element);
            return div;
        }
    }, {
        key: "showChat",
        value: function showChat() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.element.classList.add(this.utils.getCssClassWithPrefix('open'));
                this.element.classList.remove(this.utils.getCssClassWithPrefix('close'));
            } else {
                this.element.classList.add(this.utils.getCssClassWithPrefix('close'));
                this.element.classList.remove(this.utils.getCssClassWithPrefix('open'));
            }
        }
    }]);

    return WidgetComponent;
}(_component.Component);


},{"../chat/chat.component":2,"../component":21,"../loading/loading.component":22,"../open-button/open-button.component":24}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionComponentFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actionPayload = require("../../model/common/payloads/action-payload/action-payload.interface");

var _postbackAction = require("../../components/chat/messages/actions/postback-action.component");

var _callAction = require("../../components/chat/messages/actions/call-action.component");

var _locationAction = require("../../components/chat/messages/actions/location-action.component");

var _urlAction = require("../../components/chat/messages/actions/url-action.component");

var _logger = require("../logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The factory creates action from action payload
 */
var ActionComponentFactory = function () {
    function ActionComponentFactory() {
        _classCallCheck(this, ActionComponentFactory);
    }

    _createClass(ActionComponentFactory, null, [{
        key: "fromActionPayload",
        value: function fromActionPayload(utils, payload) {
            switch (payload.type) {
                case _actionPayload.ACTION_TYPE.POST_BACK:
                    return new _postbackAction.PostbackActionComponent(utils, payload);
                case _actionPayload.ACTION_TYPE.CALL:
                    return new _callAction.CallActionComponent(utils, payload);
                case _actionPayload.ACTION_TYPE.LOCATION:
                    return new _locationAction.LocationActionComponent(utils, payload);
                case _actionPayload.ACTION_TYPE.URL:
                    return new _urlAction.UrlActionComponent(utils, payload);
                default:
                    ActionComponentFactory.logger.error('Payload contains wrong action type:' + payload.type);
                    return null;
            }
        }
    }]);

    return ActionComponentFactory;
}();

ActionComponentFactory.logger = new _logger.Logger('ActionComponentFactory');
exports.ActionComponentFactory = ActionComponentFactory;


},{"../../components/chat/messages/actions/call-action.component":4,"../../components/chat/messages/actions/location-action.component":5,"../../components/chat/messages/actions/postback-action.component":6,"../../components/chat/messages/actions/url-action.component":7,"../../model/common/payloads/action-payload/action-payload.interface":43,"../logger":33}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageComponentFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagePayload = require("../../model/common/payloads/message-payload/message-payload.interface");

var _message = require("../../components/chat/messages/message.component");

var _textMessage = require("../../components/chat/messages/text-message/text-message.component");

var _attachmentMessage = require("../../components/chat/messages/attachment-message/attachment-message.component");

var _cardMessage = require("../../components/chat/messages/card-message/card-message.component");

var _locationMessage = require("../../components/chat/messages/location-message/location-message.component");

var _rawMessage = require("../../components/chat/messages/raw-message/raw-message.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The factory creates message component from message payload
 */
var MessageComponentFactory = function () {
    function MessageComponentFactory() {
        _classCallCheck(this, MessageComponentFactory);
    }

    _createClass(MessageComponentFactory, null, [{
        key: "fromMessage",
        value: function fromMessage(utils, settings, message) {
            var side = void 0;
            var payload = void 0;
            if (message.from) {
                side = _message.MESSAGE_SIDE.LEFT;
                payload = message.body.messagePayload;
            } else {
                side = _message.MESSAGE_SIDE.RIGHT;
                payload = message.messagePayload;
            }
            switch (payload.type) {
                case _messagePayload.PAYLOAD_TYPE.TEXT:
                    return new _textMessage.TextMessageComponent(utils, settings, payload, side);
                case _messagePayload.PAYLOAD_TYPE.ATTACHMENT:
                    return new _attachmentMessage.AttachmentMessageComponent(utils, settings, payload, side);
                case _messagePayload.PAYLOAD_TYPE.CARD:
                    return new _cardMessage.CardMessageComponent(utils, settings, payload, side);
                case _messagePayload.PAYLOAD_TYPE.LOCATION:
                    return new _locationMessage.LocationMessageComponent(utils, settings, payload, side);
                case _messagePayload.PAYLOAD_TYPE.RAW:
                    return new _rawMessage.RawMessageComponent(utils, settings, payload, side);
                default:
                    throw Error('Wrong message payload type:' + payload.type);
            }
        }
    }]);

    return MessageComponentFactory;
}();

exports.MessageComponentFactory = MessageComponentFactory;


},{"../../components/chat/messages/attachment-message/attachment-message.component":8,"../../components/chat/messages/card-message/card-message.component":14,"../../components/chat/messages/location-message/location-message.component":17,"../../components/chat/messages/message.component":18,"../../components/chat/messages/raw-message/raw-message.component":19,"../../components/chat/messages/text-message/text-message.component":20,"../../model/common/payloads/message-payload/message-payload.interface":46}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * @ignore
 */
var Logger = exports.Logger = function () {
    function Logger(module) {
        _classCallCheck(this, Logger);

        this.module = module;
    }

    _createClass(Logger, [{
        key: 'debug',
        value: function debug() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            this.log(Logger.LOG_LEVEL.DEBUG, params);
        }
    }, {
        key: 'error',
        value: function error() {
            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
            }

            this.log(Logger.LOG_LEVEL.ERROR, params);
        }
    }, {
        key: 'info',
        value: function info() {
            for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                params[_key3] = arguments[_key3];
            }

            this.log(Logger.LOG_LEVEL.INFO, params);
        }
    }, {
        key: 'warn',
        value: function warn() {
            for (var _len4 = arguments.length, params = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                params[_key4] = arguments[_key4];
            }

            this.log(Logger.LOG_LEVEL.WARN, params);
        }
    }, {
        key: 'log',
        value: function log(level, params) {
            if (Logger.logLevel >= level) {
                params.unshift('[' + Logger.appName + '.' + Logger.appVersion + '.' + this.module + ']');
                var method = void 0;
                switch (Logger.logLevel) {
                    case Logger.LOG_LEVEL.ERROR:
                        method = console.error;
                        break;
                    case Logger.LOG_LEVEL.WARN:
                        method = console.warn;
                        break;
                    case Logger.LOG_LEVEL.INFO:
                        method = console.info;
                        break;
                    case Logger.LOG_LEVEL.DEBUG:
                        method = console.debug;
                        break;
                }
                if (Logger.historyEnabled) {
                    Logger.history.push(Object.assign({}, params, { level: level }));
                    if (Logger.historySize <= Logger.history.length) {
                        Logger.history.shift();
                    }
                }
                method.apply(console, params);
            }
        }
    }]);

    return Logger;
}();

Logger.LOG_LEVEL = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
};
Logger.logLevel = Logger.LOG_LEVEL.ERROR;
Logger.historyEnabled = false;
Logger.historySize = 100;
Logger.history = [];


},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
var MODE = {
    CHAT_SERVER: 'chatServer',
    BOTS_SDK: 'botsSDK'
};
exports.MODE = MODE;
/**
 * The widget default settings
 */

var defaultSettings = exports.defaultSettings = {
    version: '2.0.1',
    name: 'chat-sample-custom-web',
    mode: MODE.BOTS_SDK,
    isDebugMode: false,
    webSocketReconnectInterval: 1000,
    webSocketTimeoutInterval: 5000,
    autoplayVideo: false,
    autoplayAudio: false,
    chatTitle: 'Oracle Bots Chat Widget',
    chatSubTitle: 'How can we help?',
    chatInputPlaceholder: 'Type a message...',
    position: {
        bottom: '20px',
        right: '20px'
    },
    useCustomStyle: false,
    embeddedVideo: true,
    isOpen: false,
    embedded: false,
    openIcon: 'askoracle.svg',
    sendIcon: 'microphone-solid.svg',
    stopIcon: 'stop-circle-regular.svg'
};


},{}],35:[function(require,module,exports){
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


},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require("./core/logger");

var _utils = require("./core/utils");

var _style = require("./components/style/style.component");

var _botsDataService = require("./providers/bots-data-service");

var _widget = require("./components/widget/widget.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The main starter class that load all other objects
 */
var Main = exports.Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        this._logger = new _logger.Logger('Main');
    }

    _createClass(Main, [{
        key: "onLoad",
        value: function onLoad() {
            var _this = this;

            this._logger.debug('onLoad', 'load chat widget');
            var botsDataService = new _botsDataService.BotsDataService();
            var utils = new _utils.Utils(botsDataService.config);
            if (!botsDataService.config.useCustomStyle) {
                // load default styles
                var style = new _style.StyleComponent(utils);
                document.head.appendChild(style.render());
            }
            botsDataService.init().then(function () {
                return _this.createWidget(utils, botsDataService.config, botsDataService.service);
            });
        }
    }, {
        key: "createWidget",
        value: function createWidget(utils, settings, dataService) {
            var widgetComponent = new _widget.WidgetComponent(utils, settings, dataService);
            widgetComponent.appendToElement(document.body);
            if (settings.isOpen) {
                widgetComponent.showChat();
            }
        }
    }]);

    return Main;
}();
// Attach chat widget loading to DOM ready event


var main = new Main();
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', main.onLoad.bind(main), false);
} else {
    window.addEventListener('load', main.onLoad.bind(main), false);
}


},{"./components/style/style.component":29,"./components/widget/widget.component":30,"./core/logger":33,"./core/utils":35,"./providers/bots-data-service":47}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotsSDKMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _messagePayload = require("../common/payloads/message-payload/message-payload.interface");

var _cardMessagePayload = require("../common/payloads/message-payload/card-message-payload.interface");

var _actionPayload = require("../common/payloads/action-payload/action-payload.interface");

var _messageTo = require("../common/message-to");

var _messageFrom = require("../common/message-from");

var _attachmentPayload = require("../common/payloads/attachment-payload.interface");

var _logger = require("../../core/logger");

var _message = require("./messages/message.interface");

var _action = require("./messages/actions/action.interface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The bots sdk message
 */
var BotsSDKMessage = exports.BotsSDKMessage = function () {
    function BotsSDKMessage() {
        _classCallCheck(this, BotsSDKMessage);

        this._logger = new _logger.Logger('BotsSDKMessage');
    }
    /**
     * Convert bots sdk message to common model message
     * @return {IMessage}
     */


    _createClass(BotsSDKMessage, [{
        key: "toCommonMessage",
        value: function toCommonMessage() {
            var payload = void 0;
            switch (this.type) {
                case _message.BOTS_SDK_PAYLOAD_TYPE.TEXT:
                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.TEXT,
                        text: this.text,
                        actions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                case _message.BOTS_SDK_PAYLOAD_TYPE.LIST:
                case _message.BOTS_SDK_PAYLOAD_TYPE.CAROUSEL:
                    var cards = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            cards.push({
                                title: item.title,
                                description: item.description,
                                imageUrl: item.mediaUrl,
                                actions: this.convertSDKBotActionsToCommon(item.actions)
                            });
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

                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.CARD,
                        layout: this.type === _message.BOTS_SDK_PAYLOAD_TYPE.LIST ? _cardMessagePayload.LAYOUT.VERTICAL : _cardMessagePayload.LAYOUT.HORIZONTAL,
                        cards: cards,
                        globalActions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                case _message.BOTS_SDK_PAYLOAD_TYPE.LOCATION:
                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.LOCATION,
                        location: {
                            title: this.text,
                            longitude: this.coordinates.long,
                            latitude: this.coordinates.lat
                        },
                        actions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                case _message.BOTS_SDK_PAYLOAD_TYPE.IMAGE:
                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.ATTACHMENT,
                        attachment: {
                            type: _attachmentPayload.ATTACHMENT_TYPE.IMAGE,
                            url: this.mediaUrl
                            // TODO: add this.text as caption
                        },
                        actions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                case _message.BOTS_SDK_PAYLOAD_TYPE.FILE:
                    var attachmentType = _attachmentPayload.ATTACHMENT_TYPE.FILE;
                    if (['video/quicktime'].indexOf(this.mediaType) > -1) {
                        attachmentType = _attachmentPayload.ATTACHMENT_TYPE.VIDEO;
                    } else if (['audio/mpeg'].indexOf(this.mediaType) > -1) {
                        attachmentType = _attachmentPayload.ATTACHMENT_TYPE.AUDIO;
                    }
                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.ATTACHMENT,
                        attachment: {
                            type: attachmentType,
                            url: this.mediaUrl
                            // TODO: add this.text as caption
                        },
                        actions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                default:
                    this._logger.error('This Bots SDK message type is not implemented. ', this);
                    break;
            }
            this._logger.debug('toCommonMessage', this, payload);
            if (this.role === _message.BOTS_SDK_MESSAGE_ROLE.APP_USER) {
                return {
                    to: {
                        type: _messageTo.USER_MESSAGE_TYPE.USER,
                        id: ''
                    },
                    messagePayload: payload
                };
            } else {
                return {
                    from: {
                        type: _messageFrom.BOT_MESSAGE_TYPE.BOT
                    },
                    body: {
                        messagePayload: payload
                    }
                };
            }
        }
        /**
         * Convert the common model message to bots sdk message
         * @param {IUserMessage} message
         * @return {BotsSDKMessage}
         */

    }, {
        key: "convertSDKBotActionsToCommon",

        /**
         * Converts the bots sdk action to common message action
         * @param {IBotsSDKMessageAction[]} sdkActions
         * @return {IActionPayload[]}
         */
        value: function convertSDKBotActionsToCommon(sdkActions) {
            var actions = [];
            if (sdkActions) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = sdkActions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var sdkAction = _step2.value;

                        var action = void 0;
                        switch (sdkAction.type) {
                            case _action.BOTS_SDK_ACTION_TYPE.POSTBACK:
                                var postbackAction = sdkAction;
                                action = {
                                    type: _actionPayload.ACTION_TYPE.POST_BACK,
                                    label: postbackAction.text,
                                    postback: { payload: postbackAction.payload, id: postbackAction._id }
                                };
                                break;
                            case _action.BOTS_SDK_ACTION_TYPE.LINK:
                                var linkAction = sdkAction;
                                action = {
                                    type: _actionPayload.ACTION_TYPE.URL,
                                    label: linkAction.text,
                                    url: linkAction.uri
                                };
                                break;
                            case _action.BOTS_SDK_ACTION_TYPE.LOCATION_REQUEST:
                                action = {
                                    type: _actionPayload.ACTION_TYPE.LOCATION,
                                    label: sdkAction.text
                                };
                                break;
                            case _action.BOTS_SDK_ACTION_TYPE.REPLY:
                                var replyAction = sdkAction;
                                action = {
                                    type: _actionPayload.ACTION_TYPE.POST_BACK,
                                    label: replyAction.text,
                                    postback: { payload: replyAction.payload, id: replyAction._id }
                                };
                                break;
                            default:
                                this._logger.error('Not supported BOTS SDK action. ', sdkAction);
                                break;
                        }
                        if (action) {
                            actions.push(action);
                        }
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
            return actions;
        }
    }], [{
        key: "fromCommonMessage",
        value: function fromCommonMessage(message) {
            var botsSDKMessage = void 0;
            var payload = message.messagePayload;
            switch (payload.type) {
                case _messagePayload.PAYLOAD_TYPE.TEXT:
                    var txtPayload = payload;
                    botsSDKMessage = {
                        type: _message.BOTS_SDK_PAYLOAD_TYPE.TEXT,
                        text: txtPayload.text
                    };
                    break;
                case _messagePayload.PAYLOAD_TYPE.LOCATION:
                    var locationPayload = payload;
                    botsSDKMessage = {
                        type: _message.BOTS_SDK_PAYLOAD_TYPE.LOCATION,
                        coordinates: {
                            long: locationPayload.location.longitude,
                            lat: locationPayload.location.latitude
                        }
                    };
                    break;
            }
            return Object.assign(new BotsSDKMessage(), botsSDKMessage);
        }
    }]);

    return BotsSDKMessage;
}();


},{"../../core/logger":33,"../common/message-from":40,"../common/message-to":41,"../common/payloads/action-payload/action-payload.interface":43,"../common/payloads/attachment-payload.interface":44,"../common/payloads/message-payload/card-message-payload.interface":45,"../common/payloads/message-payload/message-payload.interface":46,"./messages/actions/action.interface":38,"./messages/message.interface":39}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
var BOTS_SDK_ACTION_TYPE = {
    POSTBACK: 'postback',
    WEBVIEW: 'webview',
    REPLY: 'reply',
    LOCATION_REQUEST: 'locationRequest',
    SHARE: 'share',
    LINK: 'link'
};
exports.BOTS_SDK_ACTION_TYPE = BOTS_SDK_ACTION_TYPE;


},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
var BOTS_SDK_MESSAGE_ROLE = {
    APP_USER: 'appUser',
    APP_MARKET: 'appMaker'
};
exports.BOTS_SDK_MESSAGE_ROLE = BOTS_SDK_MESSAGE_ROLE;

var BOTS_SDK_PAYLOAD_TYPE = {
    TEXT: 'text',
    LIST: 'list',
    LOCATION: 'location',
    IMAGE: 'image',
    FILE: 'file',
    CAROUSEL: 'carousel'
};
exports.BOTS_SDK_PAYLOAD_TYPE = BOTS_SDK_PAYLOAD_TYPE;


},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
var BOT_MESSAGE_TYPE = {
    BOT: 'bot',
    USER: 'user',
    SYSTEM: 'system'
};
exports.BOT_MESSAGE_TYPE = BOT_MESSAGE_TYPE;


},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
var USER_MESSAGE_TYPE = {
  BOT: 'bot',
  USER: 'user'
};
exports.USER_MESSAGE_TYPE = USER_MESSAGE_TYPE;


},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createBotMessage = exports.createUserMessage = undefined;

var _messageTo = require("./message-to");

/**
 * creates the user message from payload
 */
var createUserMessage = exports.createUserMessage = function createUserMessage(payload, channel) {
    return {
        to: {
            type: _messageTo.USER_MESSAGE_TYPE.BOT,
            id: channel
        },
        messagePayload: payload
    };
};
/**
 * creates the bot message from payload
 */
var createBotMessage = exports.createBotMessage = function createBotMessage(from, payload) {
    return {
        from: from,
        body: { messagePayload: payload }
    };
};


},{"./message-to":41}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
var ACTION_TYPE = {
    POST_BACK: 'postback',
    CALL: 'call',
    URL: 'url',
    LOCATION: 'location'
};
exports.ACTION_TYPE = ACTION_TYPE;


},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
var ATTACHMENT_TYPE = {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    FILE: 'file'
};
exports.ATTACHMENT_TYPE = ATTACHMENT_TYPE;


},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
var LAYOUT = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
};
exports.LAYOUT = LAYOUT;


},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
var PAYLOAD_TYPE = {
    TEXT: 'text',
    CARD: 'card',
    ATTACHMENT: 'attachment',
    LOCATION: 'location',
    RAW: 'raw',
    POSTBACK: 'postback'
};
exports.PAYLOAD_TYPE = PAYLOAD_TYPE;


},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotsDataService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _botsSdkService = require("./bots-sdk-service");

var _chatServerService = require("./chat-server-service");

var _logger = require("../core/logger");

var _settings = require("../core/settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The widget data service entry point
 */
var BotsDataService = exports.BotsDataService = function () {
    function BotsDataService() {
        _classCallCheck(this, BotsDataService);

        this.logger = new _logger.Logger('BotsDataService');
        var settings = Object.assign(_settings.defaultSettings, chatWidgetWebSettings);
        _logger.Logger.logLevel = settings.isDebugMode ? _logger.Logger.LOG_LEVEL.DEBUG : _logger.Logger.LOG_LEVEL.NONE;
        _logger.Logger.appName = settings.name;
        _logger.Logger.appVersion = settings.version;
        this.logger.debug('Create service with configuration', settings);
        if (!settings.mode) {
            throw Error('The bots config does not contain mode.');
        }
        if (settings.mode === _settings.MODE.BOTS_SDK && (!settings.appId || !settings.sdkUrl)) {
            throw Error('The bots config does not contain  one of required properties: appId or sdkUrl.');
        }
        if (settings.mode === _settings.MODE.CHAT_SERVER && (!settings.uri || !settings.userId || !settings.channel)) {
            throw Error('The bots config does not contain one of required properties: uri, channel, or userId.');
        }
        this.config = settings;
    }

    _createClass(BotsDataService, [{
        key: "init",
        value: function init() {
            this.service = this.config.mode === _settings.MODE.BOTS_SDK ? new _botsSdkService.BotsSDKService(this.config) : new _chatServerService.ChatServerService(this.config);
            return this.service.init();
        }
    }]);

    return BotsDataService;
}();


},{"../core/logger":33,"../core/settings":34,"./bots-sdk-service":48,"./chat-server-service":50}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotsSDKService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require("../core/logger");

var _botsSdkMessage = require("../model/bots-sdk/bots-sdk-message");

var _messagePayload = require("../model/common/payloads/message-payload/message-payload.interface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The service connect the widget with Bots server by Bots SDK
 */
var BotsSDKService = exports.BotsSDKService = function () {
    function BotsSDKService(config) {
        _classCallCheck(this, BotsSDKService);

        this.config = config;
        this._logger = new _logger.Logger('BotsSDKService');
        /**
         * The method called when message received by the service
         * @param {IMessage} message
         */
        this.onMessage = function (message) {};
    }
    /**
     * Initialize the service
     * @return {Promise<any>}
     */


    _createClass(BotsSDKService, [{
        key: "init",
        value: function init() {
            return this.loadSdk().then(this.initSdk.bind(this));
        }
    }, {
        key: "initSdk",
        value: function initSdk() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var element = _this.createHiddenDiv();
                Bots.on('message', function (message) {
                    _this._logger.info('a message was added to the conversation', message);
                    var msg = Object.assign(new _botsSdkMessage.BotsSDKMessage(), message);
                    _this.onMessage(msg.toCommonMessage());
                });
                Bots.init({ appId: _this.config.appId, embedded: true }).then(function () {
                    _this._logger.info('ready');
                    _this.updateUser({
                        "givenName": "John",
                        "surname": "Snow",
                        "email": "john.snow@winterfell.com",
                        "properties": {
                            "smoochCustomVariable1": "Lord",
                            "smoochCustomVariable2": "Commander"
                        }
                    });
                    resolve();
                }).catch(function (error) {
                    reject(error);
                });
                Bots.render(element);
            });
        }
        /**
         * Add SDK script to the page header element
         * @return {Promise<any>}
         */

    }, {
        key: "loadSdk",
        value: function loadSdk() {
            var _this2 = this;

            var name = 'Bots';
            return new Promise(function (resolve, reject) {
                var initProps = void 0,
                    renderProps = void 0,
                    destroyProps = void 0,
                    onEventProps = [],
                    callbacks = [];
                window[name] = {
                    init: function init() {
                        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                            props[_key] = arguments[_key];
                        }

                        initProps = props;
                        var promise = {
                            then: function then(callback) {
                                callbacks.push({
                                    type: 'then',
                                    next: callback
                                });
                                return promise;
                            },
                            catch: function _catch(callback) {
                                callbacks.push({
                                    type: 'catch',
                                    next: callback
                                });
                                return promise;
                            }
                        };
                        return promise;
                    },
                    on: function on() {
                        for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            props[_key2] = arguments[_key2];
                        }

                        return onEventProps.push(props);
                    },
                    render: function render() {
                        for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            props[_key3] = arguments[_key3];
                        }

                        return renderProps = props;
                    },
                    destroy: function destroy() {
                        for (var _len4 = arguments.length, props = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                            props[_key4] = arguments[_key4];
                        }

                        return destroyProps = props;
                    }
                };
                window['__onWebMessengerHostReady__'] = function (bots) {
                    if (delete window['__onWebMessengerHostReady__'], window[name] = bots, initProps) {
                        for (var promise = bots.init.apply(bots, initProps), i = 0; i < callbacks.length; i++) {
                            var callback = callbacks[i];
                            promise = 'then' === callback.type ? promise.then(callback.next) : promise.catch(callback.next);
                        }
                    }
                    if (renderProps) {
                        bots.render.apply(bots, renderProps);
                    }
                    if (destroyProps) {
                        bots.destroy.apply(bots, destroyProps);
                    }
                    for (var _i = 0; _i < onEventProps.length; _i++) {
                        bots.on.apply(bots, onEventProps[_i]);
                    }
                };
                var request = new XMLHttpRequest();
                request.addEventListener('load', function () {
                    try {
                        var response = void 0;
                        if ((response = "string" == typeof this.response ? JSON.parse(this.response) : this.response).url) {
                            var script = document.createElement('script');
                            script.async = true;
                            script.src = response.url;
                            script.onload = function () {
                                return resolve();
                            };
                            document.getElementsByTagName('head')[0].appendChild(script);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
                request.open('GET', _this2.config.sdkUrl + '/loader.json', !0);
                request.responseType = 'json';
                request.send();
            });
        }
    }, {
        key: "createHiddenDiv",

        /**
         * This method creates hidden div to put in the hidden Bots SDK chat.
         * @return {HTMLDivElement}
         */
        value: function createHiddenDiv() {
            var element = document.createElement('div');
            element.id = 'chat_widget_web_bots_sdk_ui';
            element.style.display = 'none';
            document.body.appendChild(element);
            return element;
        }
        /**
         * The method loads chat history
         * @return {Promise<IMessage[]>}
         */

    }, {
        key: "loadChat",
        value: function loadChat() {
            var conversation = Bots.getConversation();
            var messages = [];
            for (var i = 0; i < conversation.messages.length; i++) {
                var message = conversation.messages[i];
                var botsSDKMessage = Object.assign(new _botsSdkMessage.BotsSDKMessage(), message);
                var commonMessage = botsSDKMessage.toCommonMessage();
                if (commonMessage) {
                    messages.push(commonMessage);
                }
                // add to the last message the global actions
                if (conversation.replyActions && conversation.replyActions.message._id === message._id && conversation.replyActions.actions.length > 0) {
                    var payload = commonMessage['messagePayload'] ? commonMessage['messagePayload'] : commonMessage['body'].messagePayload;
                    payload.globalActions = botsSDKMessage.convertSDKBotActionsToCommon(conversation['replyActions'].actions);
                }
            }
            return Promise.resolve(messages);
        }
        /**
         * Send the message to the Chat Server
         * @param {IUserMessage} message
         */

    }, {
        key: "send",
        value: function send(message) {
            this._logger.debug('send to channel', message);
            // TODO: if the message is postback, send as postback
            if (message.messagePayload.type === _messagePayload.PAYLOAD_TYPE.POSTBACK) {
                var postback = message.messagePayload;
                if (postback.postback.id) {
                    this._logger.debug('triggerPostback for action', postback.postback.id);
                    Bots.triggerPostback(postback.postback.id);
                } else {
                    // TODO: try to send as text message
                }
            } else {
                Bots.sendMessage(_botsSdkMessage.BotsSDKMessage.fromCommonMessage(message));
            }
        }
        /**
         * Update the user details
         */

    }, {
        key: "updateUser",
        value: function updateUser(userDetails) {
            return Bots.updateUser(userDetails).catch(function (err) {
                console.error(err);
                return err;
            });
        }
        /**
         * Clear the storage
         */

    }, {
        key: "clear",
        value: function clear() {
            var keys = Object.keys(localStorage);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] === 'appId') {
                    continue;
                }
                localStorage.removeItem(keys[i]);
            }
        }
    }]);

    return BotsSDKService;
}();


},{"../core/logger":33,"../model/bots-sdk/bots-sdk-message":37,"../model/common/payloads/message-payload/message-payload.interface":46}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatActions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagePayload = require("../model/common/payloads/message-payload/message-payload.interface");

var _messageFrom = require("../model/common/message-from");

var _logger = require("../core/logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Class that process predefined actions
 */
var ChatActions = function () {
    function ChatActions(onMessage, onClear) {
        _classCallCheck(this, ChatActions);

        this.logger = new _logger.Logger('ChatActions');
        this.onMessage = onMessage;
        this.onClear = onClear;
    }

    _createClass(ChatActions, [{
        key: "process",
        value: function process(message) {
            this.logger.debug('process:', message);
            switch (message.messagePayload.type) {
                case _messagePayload.PAYLOAD_TYPE.TEXT:
                    return this.processTextMessage(message);
                case _messagePayload.PAYLOAD_TYPE.POSTBACK:
                    return this.processPostbackMessage(message);
                case _messagePayload.PAYLOAD_TYPE.LOCATION:
                    return this.processLocationMessage(message);
                default:
                    return false;
            }
        }
    }, {
        key: "processTextMessage",
        value: function processTextMessage(message) {
            var textMessage = message.messagePayload;
            if (textMessage.text === '@demo') {
                var payload = {
                    "type": "text",
                    "text": "What is response type to show?",
                    "actions": [{
                        "type": "postback",
                        "label": "Text",
                        "postback": '@demo text'
                    }, {
                        "type": "postback",
                        "label": "Vertical Cards",
                        "postback": '@demo cards vertical'
                    }, {
                        "type": "postback",
                        "label": "Horizontal Cards",
                        "postback": '@demo cards horizontal'
                    }, {
                        "type": "postback",
                        "label": "Video Attachment",
                        "postback": '@demo video attachment'
                    }, {
                        "type": "postback",
                        "label": "Audio Attachment",
                        "postback": '@demo audio attachment'
                    }, {
                        "type": "postback",
                        "label": "Image Attachment",
                        "postback": '@demo image attachment'
                    }, {
                        "type": "postback",
                        "label": "File Attachment",
                        "postback": '@demo file attachment'
                    }, {
                        "type": "postback",
                        "label": "Location",
                        "postback": '@demo location'
                    }, {
                        "type": "postback",
                        "label": "Raw",
                        "postback": '@demo raw'
                    }, {
                        "type": "postback",
                        "label": "Request Location",
                        "postback": '@demo request location'
                    }]
                };
                var _message = {
                    from: {
                        type: _messageFrom.BOT_MESSAGE_TYPE.USER
                    },
                    body: {
                        messagePayload: payload
                    }
                };
                this.onMessage(_message);
                return true;
            } else if (textMessage.text === '@clear') {
                this.onClear();
                location.reload();
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "processPostbackMessage",
        value: function processPostbackMessage(message) {
            var postbackPayload = message.messagePayload;
            if (typeof postbackPayload.postback === 'string') {
                var payloads = void 0;
                switch (postbackPayload.postback) {
                    case '@demo text':
                        payloads = [{
                            type: "text",
                            text: "This is text demo",
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo cards horizontal':
                        payloads = [{
                            type: 'card',
                            layout: 'horizontal',
                            cards: [{
                                title: 'Card title',
                                description: 'Card description',
                                imageUrl: 'http://via.placeholder.com/350x150',
                                url: 'http://www.oracle.com',
                                actions: [{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                }, {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                }, {
                                    type: "location",
                                    label: "Location"
                                }, {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }]
                            }, {
                                title: 'Card title',
                                description: 'Card description',
                                imageUrl: 'http://via.placeholder.com/350x150',
                                url: 'http://www.oracle.com',
                                actions: [{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                }, {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                }, {
                                    type: "location",
                                    label: "Location"
                                }, {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }]
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo cards vertical':
                        payloads = [{
                            type: 'card',
                            layout: 'vertical',
                            cards: [{
                                title: 'Card title',
                                description: 'Card description',
                                imageUrl: 'http://via.placeholder.com/350x150',
                                url: 'http://www.oracle.com',
                                actions: [{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                }, {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                }, {
                                    type: "location",
                                    label: "Location"
                                }, {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }]
                            }, {
                                title: 'Card title',
                                description: 'Card description',
                                imageUrl: 'http://via.placeholder.com/350x150',
                                url: 'http://www.oracle.com',
                                actions: [{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                }, {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                }, {
                                    type: "location",
                                    label: "Location"
                                }, {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }]
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo image attachment':
                        payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'image',
                                url: 'http://via.placeholder.com/350x150'
                            },
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo audio attachment':
                        payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'audio',
                                url: 'https://html5tutorial.info/media/vincent.mp3'
                            },
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo video attachment':
                        payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'video',
                                url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
                            },
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo file attachment':
                        payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'file',
                                url: 'http://via.placeholder.com/350x150'
                            },
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo location':
                        payloads = [{
                            type: 'location',
                            location: {
                                title: 'Location title',
                                longitude: -79.388385,
                                latitude: 43.6435838
                            }
                        }];
                        break;
                    case '@demo raw':
                        payloads = [{
                            type: 'raw',
                            payload: {
                                property: 'value'
                            }
                        }];
                        break;
                    case '@demo request location':
                        payloads = [{
                            type: 'text',
                            text: "Please share your location.",
                            actions: [{
                                type: "location",
                                label: "@Share Location"
                            }]
                        }];
                        break;
                }
                if (payloads) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = payloads[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var payload = _step.value;

                            var _message2 = {
                                from: {
                                    type: _messageFrom.BOT_MESSAGE_TYPE.BOT
                                },
                                body: {
                                    messagePayload: payload
                                }
                            };
                            this.onMessage(_message2);
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

                    return true;
                }
            } else {
                return false;
            }
        }
    }, {
        key: "processLocationMessage",
        value: function processLocationMessage(message) {
            var messagePayload = message.messagePayload;
            if (messagePayload.location.title === '@demo location') {
                var payload = {
                    type: 'location',
                    location: {
                        title: 'Your location',
                        longitude: messagePayload.location.longitude,
                        latitude: messagePayload.location.latitude
                    }
                };
                var _message3 = {
                    from: {
                        type: _messageFrom.BOT_MESSAGE_TYPE.BOT
                    },
                    body: {
                        messagePayload: payload
                    }
                };
                this.onMessage(_message3);
                return true;
            } else {
                return false;
            }
        }
    }]);

    return ChatActions;
}();

exports.ChatActions = ChatActions;


},{"../core/logger":33,"../model/common/message-from":40,"../model/common/payloads/message-payload/message-payload.interface":46}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatServerService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagePayload = require("../model/common/payloads/message-payload/message-payload.interface");

var _message = require("../model/common/message");

var _reconnectingWebSocket = require("./web-socket/reconnecting-web-socket");

var _logger = require("../core/logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The service connect the widget with Chat Server by utilizing the ReconnectingWebSocket object.
 */
var ChatServerService = exports.ChatServerService = function () {
    function ChatServerService(config) {
        _classCallCheck(this, ChatServerService);

        this.config = config;
        this._logger = new _logger.Logger('ChatServerService');
        /**
         * The method called when message received by the service
         * @param {IMessage} message
         */
        this.onMessage = function (message) {};
        this._uri = this.config.uri + '?user=' + this.config.userId;
    }
    /**
     * Initialize the service
     * @return {Promise<any>}
     */


    _createClass(ChatServerService, [{
        key: "init",
        value: function init() {
            var _this = this;

            return new Promise(function (resolve) {
                _this._ws = new _reconnectingWebSocket.ReconnectingWebSocket(_this.config.webSocketReconnectInterval, _this.config.webSocketTimeoutInterval, _this._uri);
                _this._ws.onopen = function () {
                    resolve();
                    _this._logger.debug('ws.Open');
                };
                _this._ws.onmessage = _this.wsMessage.bind(_this);
                _this._ws.onclose = function () {
                    return _this._logger.debug('ws.Close');
                };
                _this._ws.onerror = function (event) {
                    return _this._logger.error("the socket had an error", event);
                };
            });
        }
        /**
         * The method loads chat history
         * @return {Promise<IMessage[]>}
         */

    }, {
        key: "loadChat",
        value: function loadChat() {
            return Promise.resolve([]);
        }
        /**
         * Send the message to the Chat Server
         * @param {IUserMessage} message
         */

    }, {
        key: "send",
        value: function send(message) {
            this._logger.debug('send message to chat server', message);
            if (this._ws.readyState === this._ws.OPEN) {
                this._ws.send(JSON.stringify(message));
                if (message.messagePayload.type === _messagePayload.PAYLOAD_TYPE.POSTBACK) {
                    var userMessage = (0, _message.createUserMessage)({
                        type: _messagePayload.PAYLOAD_TYPE.TEXT,
                        text: message.messagePayload.text
                    }, this.config.channel);
                    this.onMessage(userMessage);
                } else {
                    this.onMessage(message);
                }
            } else {
                console.error('Can\'t send message, websoket not ready', message, this._ws.readyState);
            }
        }
        /**
         * Process message received from Chat Server
         * @param {MessageEvent} event
         */

    }, {
        key: "wsMessage",
        value: function wsMessage(event) {
            this._logger.debug('msg received: ', event.data);
            var msg = JSON.parse(event.data);
            if (msg.error) {
                // Convert error message to common model text message
                msg = (0, _message.createBotMessage)(msg.from, {
                    type: _messagePayload.PAYLOAD_TYPE.TEXT,
                    text: 'Error: ' + msg.error.code + ' ' + msg.error.message
                });
            } else if (msg.body && (msg.body.text || msg.body.choices)) {
                // backward comparability with version 1.0
                // convert message from version 1.1 to common model
                var newMsg = (0, _message.createBotMessage)(msg.from, {
                    type: _messagePayload.PAYLOAD_TYPE.TEXT,
                    text: msg.body.text,
                    actions: []
                });
                if (msg.body.choices) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = msg.body.choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            newMsg.body.messagePayload.actions.push({
                                type: 'postback',
                                label: item,
                                postback: item
                            });
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
                msg = newMsg;
            } else if (msg.from && msg.to) {
                // the message received from the person from another chat
                delete msg.from;
            }
            this.onMessage(msg);
        }
    }, {
        key: "clear",
        value: function clear() {}
    }]);

    return ChatServerService;
}();


},{"../core/logger":33,"../model/common/message":42,"../model/common/payloads/message-payload/message-payload.interface":46,"./web-socket/reconnecting-web-socket":51}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReconnectingWebSocket = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require('../../core/logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Reconnecting websoket wrapper
 */
var ReconnectingWebSocket = function () {
    function ReconnectingWebSocket(reconnectInterval, timeoutInterval, url, protocols) {
        _classCallCheck(this, ReconnectingWebSocket);

        this._timedOut = false;
        this._forcedClose = false;
        this.onclose = function (event) {};
        this.onerror = function (event) {};
        this.onmessage = function (event) {};
        this.onopen = function (event) {};
        this.onconnecting = function () {};
        this.logger = new _logger.Logger('ReconnectingWebSocket');
        this.logger.debug('create websocket', 'reconnectInterval: ' + reconnectInterval, 'timeoutInterval: ' + timeoutInterval, url);
        this._url = url;
        this._protocols = protocols;
        this._readyState = WebSocket.CONNECTING;
        this.connect(false);
        this._reconnectInterval = reconnectInterval;
        this._timeoutInterval = timeoutInterval;
    }

    _createClass(ReconnectingWebSocket, [{
        key: 'connect',
        value: function connect(reconnectAttempt) {
            var _this = this;

            this._ws = new WebSocket(this._url, this._protocols);
            this.logger.debug('connect', 'attempt connect', this._url);
            // Close the socket if it was not successfully connect after timeout interval
            var timeout = setTimeout(function () {
                _this.logger.debug('connection timeout, close socket', _this._url);
                _this._timedOut = true;
                _this._ws.close();
                _this._timedOut = false;
            }, this._timeoutInterval);
            this._ws.onopen = function (event) {
                clearTimeout(timeout);
                _this.logger.debug('onopen', _this._url);
                _this._readyState = WebSocket.OPEN;
                reconnectAttempt = false;
                _this.onopen(event);
            };
            this._ws.onclose = function (event) {
                clearTimeout(timeout);
                _this._ws = null;
                if (_this._forcedClose) {
                    _this._readyState = WebSocket.CLOSED;
                    _this.onclose(event);
                } else {
                    _this._readyState = WebSocket.CONNECTING;
                    _this.onconnecting();
                    if (!reconnectAttempt && !_this._timedOut) {
                        _this.logger.debug('onclose', _this._url);
                        _this.onclose(event);
                    }
                    setTimeout(function () {
                        _this.connect(true);
                    }, _this._reconnectInterval);
                }
            };
            this._ws.onmessage = function (event) {
                _this.logger.debug('onmessage', _this._url, event.data);
                _this.onmessage(event);
            };
            this._ws.onerror = function (event) {
                _this.logger.debug('onerror', _this._url, event);
                _this.onerror(event);
            };
        }
    }, {
        key: 'close',
        value: function close(code, reason) {
            if (this._ws) {
                this._forcedClose = true;
                this._ws.close();
            }
        }
    }, {
        key: 'send',
        value: function send(data) {
            if (this._ws) {
                this.logger.debug('send', this._url, data);
                return this._ws.send(data);
            } else {
                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
            }
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(type, listener, useCapture) {
            if (this._ws) {
                this._ws.addEventListener(type, listener, useCapture);
            }
        }
        //
        // addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void {
        //     if(this._ws) {
        //         this._ws.addEventListener(type, listener, useCapture)
        //     }
        // }

    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(evt) {
            if (this._ws) {
                return this._ws.dispatchEvent(evt);
            } else {
                return false;
            }
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, listener, options) {
            if (this._ws) {
                this._ws.removeEventListener(type, listener, options);
            }
        }
    }, {
        key: 'url',
        get: function get() {
            return this._url;
        }
    }, {
        key: 'protocol',
        get: function get() {
            return this._ws.protocol;
        }
    }, {
        key: 'bufferedAmount',
        get: function get() {
            return this._ws.bufferedAmount;
        }
    }, {
        key: 'extensions',
        get: function get() {
            return this._ws.extensions;
        }
    }, {
        key: 'readyState',
        get: function get() {
            return this._ws ? this._ws.readyState : this._readyState;
        }
    }, {
        key: 'CLOSED',
        get: function get() {
            return this._ws.CLOSED;
        }
    }, {
        key: 'CLOSING',
        get: function get() {
            return this._ws.CLOSING;
        }
    }, {
        key: 'CONNECTING',
        get: function get() {
            return this._ws.CONNECTING;
        }
    }, {
        key: 'OPEN',
        get: function get() {
            return this._ws.OPEN;
        }
    }, {
        key: 'binaryType',
        get: function get() {
            return this._ws.binaryType;
        },
        set: function set(value) {
            this._ws.binaryType = value;
        }
    }]);

    return ReconnectingWebSocket;
}();

exports.ReconnectingWebSocket = ReconnectingWebSocket;


},{"../../core/logger":33}]},{},[36]);
