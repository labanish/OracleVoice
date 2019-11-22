import { PAYLOAD_TYPE } from "../../model/common/payloads/message-payload/message-payload.interface";
import { MESSAGE_SIDE } from "../../components/chat/messages/message.component";
import { TextMessageComponent } from "../../components/chat/messages/text-message/text-message.component";
import { AttachmentMessageComponent } from "../../components/chat/messages/attachment-message/attachment-message.component";
import { CardMessageComponent } from "../../components/chat/messages/card-message/card-message.component";
import { LocationMessageComponent } from "../../components/chat/messages/location-message/location-message.component";
import { RawMessageComponent } from "../../components/chat/messages/raw-message/raw-message.component";
/**
 * The factory creates message component from message payload
 */
class MessageComponentFactory {
    static fromMessage(utils, settings, message) {
        let side;
        let payload;
        if (message.from) {
            side = MESSAGE_SIDE.LEFT;
            payload = message.body.messagePayload;
        }
        else {
            side = MESSAGE_SIDE.RIGHT;
            payload = message.messagePayload;
        }
        switch (payload.type) {
            case PAYLOAD_TYPE.TEXT:
                return new TextMessageComponent(utils, settings, payload, side);
            case PAYLOAD_TYPE.ATTACHMENT:
                return new AttachmentMessageComponent(utils, settings, payload, side);
            case PAYLOAD_TYPE.CARD:
                return new CardMessageComponent(utils, settings, payload, side);
            case PAYLOAD_TYPE.LOCATION:
                return new LocationMessageComponent(utils, settings, payload, side);
            case PAYLOAD_TYPE.RAW:
                return new RawMessageComponent(utils, settings, payload, side);
            default:
                throw Error('Wrong message payload type:' + payload.type);
        }
    }
}
export { MessageComponentFactory };
//# sourceMappingURL=message-component.factory.js.map