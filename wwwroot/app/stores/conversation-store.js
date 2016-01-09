function conversationStore($, dispatcher, CONVERSATION_ACTIONS) {
    var self = this;

    self.connection = $.hubConnection();
    self.hub = self.connection.createHubProxy("conversationHub");

    dispatcher.addListener({
        actionType: CONVERSATION_ACTIONS.GET_BY_CURRENT_PROFILE,
        callback: function (options) {
            self.byProfile = options.data;
            self.storeInstance.emitChange({ id: options.id });
        }
    });

    return self;
}

ngX.Store({ store: conversationStore, providers: ["$","dispatcher", "CONVERSATION_ACTIONS"] });