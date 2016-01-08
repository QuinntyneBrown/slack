function profileStore(dispatcher, PROFILE_ACTIONS) {
    var self = this;

    self.connection = $.hubConnection();
    self.hub = self.connection.createHubProxy("profileHub");

    dispatcher.addListener({
        actionType: PROFILE_ACTIONS.LOGIN,
        callback: function (options) {
            self.current = options.data;
            self.emitChange({ id: options.id });
        }
    });
    return self;
}

ngX.Store({ store: profileStore, providers: ["dispatcher", "PROFILE_ACTIONS"] });