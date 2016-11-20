import template from '../../templates/message-component.html';

const MessageComponent = {
    bindings: {
        isLoading: '<',
        message: '<',
        isError: '<'
    },
    template: template,
    controller: class MessageComponentController {}
};


export default MessageComponent;
