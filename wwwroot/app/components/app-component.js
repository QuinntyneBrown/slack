﻿function appComponent() {
    var self = this;
    return self;
}

ngX.Component({
    isBootstrapped: true,
    component: appComponent,
    selector: 'app',
    template: [
        '<div>',
        '<div data-ng-view></div>',
        '</div>'
    ],
    styles: [
        ' body { ',
        '   margin: 0; padding: 0;',
        '   font-family: "Lato", sans-serif;',
        '}'
    ]
});

angular.module("app").config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/", {
        "componentName": "loginComponent"
    });

    $routeProvider.when("/conversation", {
        "componentName": "conversationComponent"
    });

}]);