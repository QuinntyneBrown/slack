angular.module("app").value("PROFILE_ACTIONS", {
    LOGIN: 0,
    LOGIN_FAIL: 1,
    REGISTER: 3,
    CURRENT_PROFILE: 4,
    OTHER_PROFILES: 5,
    OTHER: 6
});

angular.module("app").value("CONVERSATION_ACTIONS", {
    GET_BY_CURRENT_PROFILE: 7,
    CURRENT: 8
});

angular.module("app").value("MESSAGE_ACTIONS", {
    SEND: 9,
    GET_BY_OTHER_PROFILE: 10
});