/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { MessageComponent } from "../message.component";
/**
 * This component creates HTML elements for the text message type.
 * The text scanned for the links and embedded videos, all the link replaced with HTML.
 * <span>{content}</span>
 */
class TextMessageComponent extends MessageComponent {
    constructor(utils, settings, payload, side) {
        super(utils, settings, payload, side);
        this.text = payload.text;
    }
    getContent() {
        let span = this.utils.createSpan();
        span.innerHTML = this.utils.linkify(this.text, this.settings.embeddedVideo);
        if (this.side === "left") {
            var msg = new SpeechSynthesisUtterance(this.text);
            window.speechSynthesis.speak(msg);
            console.log(this.side);
        }
        return span;
    }
}
export { TextMessageComponent };
//# sourceMappingURL=text-message.component.js.map