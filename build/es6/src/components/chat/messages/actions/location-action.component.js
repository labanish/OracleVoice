/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ActionComponent } from "./action.component";
/**
 * Converts action payload to component
 * Request browser for location, browser may in turn ask user for permission.
 * Location information is then sent to the Bot as a LocationMessagePayload.
 * If a location cannot be obtained from the browser, a pre-set location is sent to the Bot to allow testing to continue.
 */
class LocationActionComponent extends ActionComponent {
    constructor(utils, payload) {
        super(utils, payload);
    }
    render() {
        let link = super.render();
        link.classList.add(this.utils.getCssClassWithPrefix('action-location'));
        return link;
    }
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => {
                reject(error);
            });
        });
    }
    getEventPayload() {
        return this.getCurrentPosition();
    }
}
export { LocationActionComponent };
//# sourceMappingURL=location-action.component.js.map