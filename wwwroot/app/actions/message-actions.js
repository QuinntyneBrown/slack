function messageActions(dispatcher, formEncode, guid, messageService, MESSAGE_ACTIONS) {
    var self = this;

    self.send = function (options) {
        var newGuid = guid();

        messageService.send({ content: options.content, otherProfileId: options.otherProfileId })
            .then(function (results) {

            dispatcher.emit({
                actionType: MESSAGE_ACTIONS.SEND, options:
                    { data: results, id: newGuid }
            });
        });
        return newGuid;
    }

    self.getMessagesByOtherProfileId = function (options) {
        var newGuid = guid();

        messageService.getByOtherProfileId({
            otherProfileId: options.otherProfileId
        }).then(function (results) {
            dispatcher.emit({
                actionType: MESSAGE_ACTIONS.GET_BY_OTHER_PROFILE, options:
                    { data: results, id: newGuid }
            });
        });

        return newGuid;
    }

    return self;
}

angular.module("app")
    .service("messageActions", ["dispatcher", "formEncode", "guid", "messageService", "MESSAGE_ACTIONS", messageActions])

