import { ACTION_TYPE } from "../../model/common/payloads/action-payload/action-payload.interface";
import { PostbackActionComponent } from "../../components/chat/messages/actions/postback-action.component";
import { CallActionComponent } from "../../components/chat/messages/actions/call-action.component";
import { LocationActionComponent } from "../../components/chat/messages/actions/location-action.component";
import { UrlActionComponent } from "../../components/chat/messages/actions/url-action.component";
import { Logger } from "../logger";
/**
 * The factory creates action from action payload
 */
class ActionComponentFactory {
    static fromActionPayload(utils, payload) {
        switch (payload.type) {
            case ACTION_TYPE.POST_BACK:
                return new PostbackActionComponent(utils, payload);
            case ACTION_TYPE.CALL:
                return new CallActionComponent(utils, payload);
            case ACTION_TYPE.LOCATION:
                return new LocationActionComponent(utils, payload);
            case ACTION_TYPE.URL:
                return new UrlActionComponent(utils, payload);
            default:
                ActionComponentFactory.logger.error('Payload contains wrong action type:' + payload.type);
                return null;
        }
    }
}
ActionComponentFactory.logger = new Logger('ActionComponentFactory');
export { ActionComponentFactory };
//# sourceMappingURL=action-component.factory.js.map