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
//# sourceMappingURL=chat-footer.component.js.map
