function conversationListComponent() {
    var self = this;
    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-list",
    component: conversationListComponent,
    template: [
        '<div class="conversationListComponent">',
        '   <conversation-list-header></conversation-list-header>',
        '   <profile-list></profile-list>',
        '</div>'
    ],
    providers: [
    ],
    styles: [
    ]
});
