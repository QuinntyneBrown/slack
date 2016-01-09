function loginComponent($location, invokeAsync, profileActions, securityStore) {
    var self = this;

    self.login = function () {
        invokeAsync({
            action: profileActions.login,
            params: {
                username: self.username,
                password: self.password
            }
        }).then(function () {
            if(securityStore.token)
                $location.path('/conversation');
        });
    }

    return self;
}

ngX.Component({
    isBootstrapped: true,
    component: loginComponent,
    template: [
        '<div>',
        '<div><h1>Login</h1></div>',
        '<div><input placeholder="Username" data-ng-model="vm.username"></input></div>',
        '<div><input placeholder="Password" type="password" data-ng-model="vm.password"></input></div>',
        '<button data-ng-click="vm.login()">login</button>',
        '<div><a href="#/register">Register</a></div>',
        '</div>'
    ],
    providers: [
        '$location',
        'invokeAsync',
        'profileActions',
        'securityStore'
    ]
});
