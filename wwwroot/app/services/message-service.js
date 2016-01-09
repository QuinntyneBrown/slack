function messageService($q, apiEndpoint, fetch) {
    var self = this;

    self.send = function (options) {
        var deferred = $q.defer();
        fetch.fromService({
            method: "POST", url: self.baseUri + "/send", data:
                {
                    content: options.content,
                    otherProfileId: options.otherProfileId
                }
        }).then(function (results) {
            deferred.resolve(results.data);
        });
        return deferred.promise;
    };

    self.baseUri = apiEndpoint.getBaseUrl() + "/message";
}

angular.module("app").service("messageService", ["$q", "apiEndpoint", "fetch", messageService]);