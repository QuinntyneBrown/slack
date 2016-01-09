function messageStore($, dispatcher, MESSAGE_ACTIONS) {
    var self = this;

    self.connection = $.hubConnection();
    self.hub = self.connection.createHubProxy("messageHub");

    self.hub.on("broadcastMessage", function (results) {
        self.storeInstance.addOrUpdate({ data: results });
        self.storeInstance.emitChange();
    });

    dispatcher.addListener({
        actionType: MESSAGE_ACTIONS.SEND,
        callback: function (options) {
            self.storeInstance.addOrUpdate({ data: options.data });
            self.storeInstance.emitChange({ id: options.id });
            self.hub.invoke("send", options.data);
        }
    });

    dispatcher.addListener({
        actionType: MESSAGE_ACTIONS.GET_BY_OTHER_PROFILE,
        callback: function (options) {
            for (var i = 0; i < options.data.length; i++) {
                self.storeInstance.addOrUpdate({ data: options.data[i] });
            }            
            self.storeInstance.emitChange({ id: options.id });
        }
    });

    return self;
}

ngX.Store({ store: messageStore, providers: ["$","dispatcher", "MESSAGE_ACTIONS"] });