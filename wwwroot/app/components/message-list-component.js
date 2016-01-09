function messageListComponent($location, conversationList, conversationStore, profileActions) {
    var self = this;

    self.conversations = [];

    self.messages = [];

    self.storeOnChange = function () {

    }

    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "message-list",
    component: messageListComponent,
    template: [
        '<div class="messageListComponent">',
        '   <h1>no conversations</h1>',
        '</div>'
    ],
    providers: [
        '$location',
        'conversationList',
        'conversationStore',
        'profileActions'
    ],
    styles: [
        ' .messageListComponent { ',
        '   padding-left:15px; ',
        ' } ',
    ]
});
