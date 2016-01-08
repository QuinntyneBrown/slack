function conversationListComponent($location, profileActions, profileStore) {
    var self = this;
    self.current = profileStore.current;
    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-list",
    component: conversationListComponent,
    template: [
        '<div class="conversationListComponent">',
        '<h1>slack</h1>',
        '<span>{{ ::vm.current.username }}</span>',
        '</div>'
    ],
    providers: [
        '$location',
        'profileActions',
        'profileStore'
    ],
    styles: [
        ' .conversationListComponent { ',
        '   padding-left:15px; ',
        ' } ',
        ' .conversationListComponent h1 { ',
        '   color: #FFF; ',
        ' } ',
    ]
});
