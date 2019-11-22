/**
 * This component creates loading animation element
 * <div class="spinner">
 *     <svg/>
 * </div>
 */
class SpinnerComponent {
    constructor(utils) {
        this.utils = utils;
    }
    render() {
        const spinner = this.utils.createDiv(['spinner']);
        spinner.innerHTML = '<svg viewBox="0 0 64 64"><circle transform="translate(32,32)" r="26"></circle></svg>';
        return spinner;
    }
}
export { SpinnerComponent };
//# sourceMappingURL=spinner.component.js.map