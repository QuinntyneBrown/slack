function conversationStore($, dispatcher, CONVERSATION_ACTIONS) {
    var self = this;

    self.connection = $.hubConnection();
    self.hub = self.connection.createHubProxy("conversationHub");

    return self;
}

ngX.Store({ store: conversationStore, providers: ["$","dispatcher", "CONVERSATION_ACTIONS"] });