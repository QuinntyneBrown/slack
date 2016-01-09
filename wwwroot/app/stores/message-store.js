function messageStore($, dispatcher, MESSAGE_ACTIONS) {
    var self = this;

    self.connection = $.hubConnection();
    self.hub = self.connection.createHubProxy("messageHub");

    dispatcher.addListener({
        actionType: MESSAGE_ACTIONS.SEND,
        callback: function (options) {
            self.storeInstance.addOrUpdate({ data: options.data });
            self.storeInstance.emitChange({ id: options.id });
        }
    });

    return self;
}

ngX.Store({ store: messageStore, providers: ["$","dispatcher", "MESSAGE_ACTIONS"] });