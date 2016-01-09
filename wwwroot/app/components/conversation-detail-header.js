function conversationDetailHeaderComponent(profileStore) {
    var self = this;

    self.other = profileStore.other;

    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-detail-header",
    component: conversationDetailHeaderComponent,
    template: [
        '<div class="conversationDetailHeaderComponent">',
        '   <h1 data-ng-if="!vm.other">no conversations</h1>',
        '   <h1 data-ng-if="vm.other">@{{ ::vm.other.username }}</h1>',
        '</div>'
    ],
    providers: [
        "profileStore"
    ],
    styles: [
        ' .conversationDetailHeaderComponent { ',
        '   padding-left: 15px; ',
        '   width:100%; ',
        '   height:52px; ',
        '   background-color: rgb(250,250,250); ',
        ' } '
    ]
});
