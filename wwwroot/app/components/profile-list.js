
function profileListComponent(profileStore) {
    var self = this;
    self.others = profileStore.otherProfiles;
    self.other = profileStore.other;
    self.isConversatingWith = function (profile) {
        return self.other && self.other.username === profile.username;
    }
    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "profile-list",
    component: profileListComponent,
    template: [
        '   <div class="profileList">',
        '       <h2 class="profileList-heading">DIRECT MESSAGES</h2>',
        '       <div data-ng-repeat="profile in vm.others">',
        '           <a data-ng-if="!vm.isConversatingWith(profile)" class="profileList-otherProfile" href="#/conversation/{{ ::profile.id }}">{{ ::profile.username }}</a>',
        '           <a data-ng-if="vm.isConversatingWith(profile)" class="profileList-conversatingWithProfile" href="#/conversation/{{ ::profile.id }}">{{ ::profile.username }}</a>',
        '       </div>',
        '   </div>'
    ],
    providers: [
        'profileStore'
    ],
    styles: [
        ' .profileList { ',
        '   padding-left:15px; ',
        ' } ',
        ' .profileList-heading { ',
        '   font-size: 1.2em; font-weight:400;',
        ' } ',
        ' .profileList-otherProfile { ',
        '   color:#CCC; text-decoration:none;',
        ' } ',
        ' .profileList-conversatingWithProfile { color: #FFF; text-decoration:none; } '
    ]
});


