function loginComponent($location, profileActions) {
    var self = this;

    self.login = function () {
        profileActions.login({ username: self.username });
    }

    self.storeOnChange = function () {
        $location.path('/conversation');
    }

    return self;
}

ngX.Component({
    isBootstrapped: true,
    component: loginComponent,
    template: [
        '<div>',
        '<div><h1>Login</h1></div>',
        '<input placeholder="Username" data-ng-model="vm.username"></input>',
        '<button data-ng-click="vm.login()">login</button>',
        '</div>'
    ],
    providers: [
        '$location',
        'profileActions'
    ]
});
