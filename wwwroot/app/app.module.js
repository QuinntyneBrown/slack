angular.module("app", ["ngX"]).config(["apiEndpointProvider", "loginRedirectProvider", function (apiEndpointProvider, loginRedirectProvider) {
    apiEndpointProvider.configure("/api");
    loginRedirectProvider.setDefaultUrl("/myprofile");
}]);
