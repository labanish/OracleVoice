import { SpinnerComponent } from "../../../loading/spinner.component";
/**
 * Represents loading component
 */
class LoadingMessageComponent {
    constructor(text, side, utils) {
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
    render() {
        this.element = this.utils.createDiv(['loading-message', this.side]);
        let bubble = this.utils.createDiv(['message-bubble']);
        let content = this.utils.createDiv(['message-content']);
        content.appendChild(new SpinnerComponent(this.utils).render());
        let text = this.utils.createSpan();
        text.innerText = this.text;
        content.appendChild(text);
        bubble.appendChild(content);
        this.element.appendChild(bubble);
        this.element.appendChild(this.utils.createDiv(['clear']));
        return this.element;
    }
    remove() {
        this.element.remove();
    }
}
export { LoadingMessageComponent };
//# sourceMappingURL=loading-message.component.js.map