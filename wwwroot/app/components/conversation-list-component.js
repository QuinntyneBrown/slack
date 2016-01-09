function conversationListComponent($location, profileActions, profileStore) {
    var self = this;
    self.current = profileStore.current;
    self.others = profileStore.otherProfiles;
    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-list",
    component: conversationListComponent,
    template: [
        '<div class="conversationListComponent">',
        '   <h1>slack</h1>',
        '   <span>{{ ::vm.current.username }}</span>',
        '   <div>',
        '       <h2>DIRECT MESSAGES</h2>',
        '       <div data-ng-repeat="profile in vm.others">',
        '           <a class="conversationListComponent-otherProfile" href="#/conversation/{{ ::profile.id }}">{{ ::profile.username }}</a>',
        '       </div>',
        '   </div>',
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
        ' .conversationListComponent h2 { font-size: 1.2em; font-weight:400; } ',
        ' .conversationListComponent-otherProfile { color:#CCC; text-decoration:none; } ',
    ]
});
