function profileActions(dispatcher, guid, PROFILE_ACTIONS) {
    var self = this;
    self.login = function (options) {
        var newGuid = guid();
        dispatcher.emit({
            actionType: PROFILE_ACTIONS.LOGIN,
            options: { data: { username: options.username } }
        });
        return newGuid;
    }

    return self;
}

angular.module("app")
    .service("profileActions", ["dispatcher", "guid","PROFILE_ACTIONS", profileActions])

