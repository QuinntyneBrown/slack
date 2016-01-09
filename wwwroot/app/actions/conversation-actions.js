function conversationActions(dispatcher, formEncode, guid, conversationService, CONVERSATION_ACTIONS) {
    var self = this;

    self.getByCurrentProfile = function () {
        var newGuid = guid();

        profileService.getByCurrentProfile().then(function (results) {
            dispatcher.emit({
                actionType: PROFILE_ACTIONS.GET_BY_CURRENT_PROFILE, options:
                    { data: results, id: newGuid }
            });
        });
        return newGuid;
    }

    return self;
}

angular.module("app")
    .service("conversationActions", ["dispatcher", "formEncode", "guid", "conversationService", "CONVERSATION_ACTIONS", conversationActions])

