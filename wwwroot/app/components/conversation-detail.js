function conversationDetailComponent(profileStore) {
    var self = this;

    self.getOther = function () { return profileStore.other; }

    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-detail",
    component: conversationDetailComponent,
    template: [
        '<div class="conversationDetailComponent">',
        '   <conversation-detail-header></conversation-detail-header>',
        '   <div class="conversationDetailComponent-body" data-ng-hide="!vm.getOther()">',
        '       <conversation-messages></conversation-messages>',
        '       <about-conversation></about-conversation>',
        '       <div style="clear:both;"></div>',
        '   </div>',
        '</div>'
    ],
    providers: [
        'profileStore'
    ],
    styles: [
        ' .conversationDetailComponent, .conversationDetailComponent-body { height:100%; } '
    ]
});
