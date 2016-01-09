function profileStore(dispatcher, PROFILE_ACTIONS) {
    var self = this;

    self.connection = $.hubConnection();
    self.hub = self.connection.createHubProxy("profileHub");

    return self;
}

ngX.Store({ store: profileStore, providers: ["dispatcher", "PROFILE_ACTIONS"] });