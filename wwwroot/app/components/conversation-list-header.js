function conversationListHeaderComponent(profileStore) {
    var self = this;

    self.current = profileStore.current;

    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-list-header",
    component: conversationListHeaderComponent,
    template: [
        '<div class="conversationListHeaderComponent">',
        '   <h1 class="conversationListHeaderComponent-heading">slackish</h1>',
        '   <span>{{ ::vm.current.username }}</span>',
        '</div>'
    ],
    providers: [
        'profileStore'
    ],
    styles: [
        ' .conversationListHeaderComponent { ',
        '   padding-left: 15px; ',
        '   width:100%; ',
        '   height:52px; ',
        ' } ',
        ' .conversationListHeaderComponent-heading { color:#FFF; font-size: 1.4em; line-height: 1.6em; } '
    ]
});
