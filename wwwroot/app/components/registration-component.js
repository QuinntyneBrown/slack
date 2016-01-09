function registrationComponent($location, profileActions) {
    var self = this;

    self.register = function () {

        profileActions.register({
            username: self.username,
            password: self.password
        });
    }

    self.storeOnChange = function () {
        $location.path('/conversation');
    }

    return self;
}

ngX.Component({
    isBootstrapped: true,
    component: registrationComponent,
    template: [
        '<div>',
        '   <div><h1>Register</h1></div>',
        '<div><input placeholder="Username" data-ng-model="vm.username"></input></div>',
        '<div><input placeholder="Password" type="password" data-ng-model="vm.password"></input></div>',
        '   <button data-ng-click="vm.register()">register</button>',
        '</div>'
    ],
    providers: [
        '$location',
        'profileActions'
    ]
});
