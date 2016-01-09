function conversationComponent() {
    var self = this;
    return self;
}

conversationComponent.canActivate = function () {
    return ["$q","invokeAsync","profileActions",
        function ($q, invokeAsync, profileActions) {
            return $q.all([
                invokeAsync(profileActions.getCurrentProfile),
                invokeAsync(profileActions.getOtherProfiles)
            ]);
        }
    ]
}

ngX.Component({
    isBootstrapped: true,
    routes: ['/conversation','/conversation/:profileId'],
    component: conversationComponent,
    template: [
        '<div class="conversationComponent">',
        '<div class="conversationComponent-conversationList"><conversation-list></conversation-list></div>',
        '<div class="conversationComponent-messageList"><message-list></message-list></div>',
        '<div style="clear:both;"></div>',
        '</div>'
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
        '   color: #CCC; ',
        '   width:225px; ',
        ' } ',
        ' .conversationComponent-messageList { ',
        '   postion:relative; float:left;',
        ' } ',
    ]
});
