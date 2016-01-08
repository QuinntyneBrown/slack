function messageListComponent($location, profileActions) {
    var self = this;

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
        'profileActions'
    ],
    styles: [
        ' .messageListComponent { ',
        '   padding-left:15px; ',
        ' } ',
    ]
});
