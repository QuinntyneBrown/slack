function conversationMessagesComponent($location, conversationList, conversationStore, messageStore, profileActions) {
    var self = this;

    self.conversations = [];

    self.messages = [];

    self.storeOnChange = function () {
        alert(messageStore.items.length);
    }

    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-messages",
    component: conversationMessagesComponent,
    template: [
        '<div class="conversationMessagesComponent">',
        '<message-form></message-form>',
        '</div>'
    ],
    providers: [
        '$location',
        'conversationList',
        'conversationStore',
        'messageStore',
        'profileActions'
    ],
    styles: [
        ' .conversationMessagesComponent { ',
        '   height:100%; ',
        '   float:left; ',
        '   width:auto; ',
        '   padding-left: 15px;',
        ' } ',
    ]
});
