function profileActions(dispatcher, formEncode, guid, profileService, PROFILE_ACTIONS) {
    var self = this;

    self.login = function (options) {
        var newGuid = guid();
        profileService.tryToLogin({
            data: {
                username: options.username,
                password: options.password
            }
        }).then(function (results) {
            if (results.access_token) {
                dispatcher.emit({
                    actionType: PROFILE_ACTIONS.LOGIN, options: {
                        token: results.access_token,
                        id: newGuid
                    }
                });
            } else {
                dispatcher.emit({
                    actionType: PROFILE_ACTIONS.LOGIN_FAIL, options: {
                        id: newGuid
                    }
                });
            }

        });
        return newGuid;
    };

    self.register = function (options) {
        var newGuid = guid();

        profileService.tryToRegister({
            username: options.username,
            password: options.password,
        }).then(function (results) {
            dispatcher.emit({
                actionType: PROFILE_ACTIONS.REGISTER, options:
                    { data: results, id: newGuid }
            });
        });
        return newGuid;
    }

    self.getCurrentProfile = function () {
        var newGuid = guid();

        profileService.getCurrentProfile().then(function (results) {
            dispatcher.emit({
                actionType: PROFILE_ACTIONS.CURRENT_PROFILE, options:
                    { data: results, id: newGuid }
            });
        });
        return newGuid;
    }

    self.getOtherProfiles = function () {
        var newGuid = guid();

        profileService.getOtherProfiles().then(function (results) {
            dispatcher.emit({
                actionType: PROFILE_ACTIONS.OTHER_PROFILES, options:
                    { data: results, id: newGuid }
            });
        });
        return newGuid;
    }
    return self;
}

angular.module("app")
    .service("profileActions", ["dispatcher", "formEncode", "guid", "profileService", "PROFILE_ACTIONS", profileActions])

