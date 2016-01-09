function conversationList($injector) {
    var self = this;
    self.$injector = $injector;

    self.createInstance = function (options) {
        var instance = new conversationList(self.$injector);

        if (options.data) {

        }

        return instance;
    }

    return self;
}

angular.module("app").service("conversationList", ["$injector",conversationList]);