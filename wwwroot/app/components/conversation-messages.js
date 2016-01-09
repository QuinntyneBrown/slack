function conversationMessagesComponent($location, conversationList, conversationStore, profileActions) {
    var self = this;

    self.conversations = [];

    self.messages = [];

    self.storeOnChange = function () {

    }



    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-messages",
    component: conversationMessagesComponent,
    template: [
        '<div class="conversationMessagesComponent">',
        '   <h1>message list</h1>',
        '</div>'
    ],
    providers: [
        '$location',
        'conversationList',
        'conversationStore',
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
