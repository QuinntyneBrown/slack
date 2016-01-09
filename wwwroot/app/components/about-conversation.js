function aboutConversationComponent(profileStore) {
    var self = this;
    self.other = profileStore.other;
    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "about-conversation",
    component: aboutConversationComponent,
    template: [
        '<div class="aboutConversationComponent">',
        '<h1>About</h1>',
        '<h2>{{ ::vm.other.username }}</h2>',
        '</div>'
    ],
    providers: [
        'profileStore'
    ],
    styles: [
        ' .aboutConversationComponent { ',
        '   float:right;',
        '   width:312px; ',
        '   height:100%; ',
        ' } '
    ]
});
