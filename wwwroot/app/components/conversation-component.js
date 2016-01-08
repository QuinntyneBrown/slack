function conversationComponent(profileStore, conversationStore) {
    var self = this;
    return self;
}

ngX.Component({
    isBootstrapped: true,
    route:'/conversation',
    component: conversationComponent,
    template: [
        '<div class="conversationComponent">',
        '<div class="conversationComponent-conversationList"><conversation-list></conversation-list></div>',
        '<div class="conversationComponent-messageList"><message-list></message-list></div>',
        '<div style="clear:both;"></div>',
        '</div>'
    ],
    providers: [
        'profileStore',
        'conversationStore',
    ],
    styles: [
        ' .conversationComponent { ',
        '   width: 100%;',
        '   height:100vh;',
        ' } ',
        ' .conversationComponent-conversationList { ',
        '   background-color: rgb(77,57,75); ',
        '   postion:relative; float:left;',
        '   min-height: 100%; ',
        '   color: #EEE; ',
        '   width:225px; ',
        ' } ',
        ' .conversationComponent-messageList { ',
        '   postion:relative; float:left;',
        ' } ',
    ]
});
