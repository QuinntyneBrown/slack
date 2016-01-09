function profileService($q, apiEndpoint, fetch, formEncode) {
    var self = this;
    self.$q = $q;
    self.tryToLogin = function (options) {
        var deferred = self.$q.defer();
        angular.extend(options.data, { grant_type: "password" });
        var formEncodedData = formEncode(options.data);
        var headers = { "Content-Type": "application/x-www-form-urlencoded" };
        fetch.fromService({ method: "POST", url: self.baseUri + "/token", data: formEncodedData, headers: headers }).then(function (results) {
            deferred.resolve(results.data);
        }).catch(function (error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    };

    self.tryToRegister = function (options) {
        var deferred = self.$q.defer();
        fetch.fromService({ method: "POST", url: self.baseUri + "/register", data: { username: options.username, password: options.password } }).then(function (results) {
            deferred.resolve(results.data);
        });
        return deferred.promise;
    };

    self.getCurrentProfile = function (options) {
        var deferred = self.$q.defer();
        fetch.fromService({ method: "GET", url: self.baseUri + "/getCurrentProfile" }).then(function (results) {
            deferred.resolve(results.data);
        });
        return deferred.promise;
    };

    self.getOtherProfiles = function (options) {
        var deferred = self.$q.defer();
        fetch.fromService({ method: "GET", url: self.baseUri + "/getOtherProfiles" }).then(function (results) {
            deferred.resolve(results.data);
        });
        return deferred.promise;
    };

    self.baseUri = apiEndpoint.getBaseUrl() + "/profile";

    return self;
}

angular.module("app").service("profileService", ["$q", "apiEndpoint", "fetch", "formEncode", profileService]);