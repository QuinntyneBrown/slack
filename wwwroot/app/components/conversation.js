function conversationComponent() {
    var self = this;
    return self;
}

conversationComponent.canActivate = function () {
    return ["$q", "$route", "invokeAsync","profileActions",
        function ($q, $route, invokeAsync, profileActions) {
            var promises = [];
            var deferred = $q.defer();
            if ($route.current.params.profileId)
                promises.push(invokeAsync({
                    action: profileActions.getOtherProfile,
                    params: { id: Number($route.current.params.profileId) }
                }));

            promises.push(invokeAsync(profileActions.getCurrentProfile));
            promises.push(invokeAsync(profileActions.getOtherProfiles));
            $q.all(promises).then(function () { deferred.resolve() });
            return deferred.promise;
        }
    ]
}

ngX.Component({
    isBootstrapped: true,
    routes: ['/conversation','/conversation/:profileId'],
    component: conversationComponent,
    template: [
        '<div class="conversationComponent">',
        '   <div class="conversationComponent-list">',
        '       <conversation-list></conversation-list>',
        '   </div>',
        '   <div class="conversationComponent-detail">',
        '       <conversation-detail></conversation-detail>',
        '   </div>',
        '   <div style="clear:both;"></div>',
        '</div>'
    ],
    styles: [
        ' .conversationComponent { ',
        '   width: 100%;',
        '   height:100vh;',
        ' } ',
        ' .conversationComponent-list { ',
        '   background-color: rgb(77,57,75); ',
        '   float:left;',
        '   height: 100%; ',
        '   color: #CCC; ',
        '   width:225px; ',
        ' } ',
        ' .conversationComponent-detail { ',
        '   overflow:hidden;',
        '   height: 100%;',
        '   width:auto; ',
        ' } ',
    ]
});
