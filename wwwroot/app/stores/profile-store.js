function profileStore(dispatcher, PROFILE_ACTIONS) {
    var self = this;

    self.connection = $.hubConnection();
    self.hub = self.connection.createHubProxy("profileHub");

    dispatcher.addListener({
        actionType: PROFILE_ACTIONS.CURRENT_PROFILE,
        callback: function (options) {
            self.current = options.data;
            self.storeInstance.emitChange({ id: options.id });
        }
    });

    dispatcher.addListener({
        actionType: PROFILE_ACTIONS.OTHER_PROFILES,
        callback: function (options) {
            self.otherProfiles = options.data;
            self.storeInstance.emitChange({ id: options.id });
        }
    });
    
    return self;
}

ngX.Store({ store: profileStore, providers: ["dispatcher", "PROFILE_ACTIONS"] });