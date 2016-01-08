function messageStore($, dispatcher, MESSAGE_ACTIONS) {
    var self = this;

    self.connection = $.hubConnection();
    self.hub = self.connection.createHubProxy("messageHub");

    return self;
}

ngX.Store({ store: messageStore, providers: ["$","dispatcher", "MESSAGE_ACTIONS"] });