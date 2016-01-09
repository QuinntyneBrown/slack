/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);

	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);

	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);

	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);

	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);

/***/ },
/* 1 */
/***/ function(module, exports) {

	angular.module("app", ["ngX"]).config(["apiEndpointProvider", "loginRedirectProvider", function (apiEndpointProvider, loginRedirectProvider) {
	    apiEndpointProvider.configure("/api");
	    loginRedirectProvider.setDefaultUrl("/myprofile");
	}]);


/***/ },
/* 2 */
/***/ function(module, exports) {

	angular.module("app").value("$", $);

/***/ },
/* 3 */
/***/ function(module, exports) {

	angular.module("app").value("PROFILE_ACTIONS", {
	    LOGIN: 0,
	    LOGIN_FAIL: 1,
	    REGISTER: 3,
	    CURRENT_PROFILE: 4,
	    OTHER_PROFILES: 5
	});

	angular.module("app").value("CONVERSATION_ACTIONS", {
	    GET_BY_CURRENT_PROFILE: 6,
	    CURRENT: 7
	});

	angular.module("app").value("MESSAGE_ACTIONS", {

	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	function conversationActions(dispatcher, formEncode, guid, conversationService, CONVERSATION_ACTIONS) {
	    var self = this;

	    self.getByCurrentProfile = function () {
	        var newGuid = guid();

	        profileService.getByCurrentProfile().then(function (results) {
	            dispatcher.emit({
	                actionType: PROFILE_ACTIONS.GET_BY_CURRENT_PROFILE, options:
	                    { data: results, id: newGuid }
	            });
	        });
	        return newGuid;
	    }

	    return self;
	}

	angular.module("app")
	    .service("conversationActions", ["dispatcher", "formEncode", "guid", "conversationService", "CONVERSATION_ACTIONS", conversationActions])



/***/ },
/* 5 */
/***/ function(module, exports) {

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



/***/ },
/* 6 */
/***/ function(module, exports) {

	function appComponent() {
	    var self = this;
	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    component: appComponent,
	    selector: 'app',
	    template: [
	        '<div>',
	        '<div data-ng-view></div>',
	        '</div>'
	    ],
	    styles: [
	        ' body { ',
	        '   margin: 0; padding: 0;',
	        '   font-family: "Lato", sans-serif;',
	        '}'
	    ]
	});

	angular.module("app").config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.when("/", {
	        "componentName": "loginComponent"
	    });

	    $routeProvider.when("/register", {
	        "componentName": "registrationComponent"
	    });

	    $routeProvider.when("/conversation/:profileId", {
	        "componentName": "conversationComponent"
	    });

	    $routeProvider.when("/conversation", {
	        "componentName": "conversationComponent"
	    });



	}]);

/***/ },
/* 7 */
/***/ function(module, exports) {

	function conversationComponent() {
	    var self = this;
	    return self;
	}

	conversationComponent.canActivate = function () {
	    return ["$q","invokeAsync","profileActions",
	        function ($q, invokeAsync, profileActions) {
	            return $q.all([
	                invokeAsync(profileActions.getCurrentProfile),
	                invokeAsync(profileActions.getOtherProfiles)
	            ]);
	        }
	    ]
	}

	ngX.Component({
	    isBootstrapped: true,
	    routes: ['/conversation','/conversation/:profileId'],
	    component: conversationComponent,
	    template: [
	        '<div class="conversationComponent">',
	        '<div class="conversationComponent-conversationList"><conversation-list></conversation-list></div>',
	        '<div class="conversationComponent-messageList"><message-list></message-list></div>',
	        '<div style="clear:both;"></div>',
	        '</div>'
	    ],
	    styles: [
	        ' .conversationComponent { ',
	        '   width: 100%;',
	        '   height:100vh;',
	        ' } ',
	        ' .conversationComponent-conversationList { ',
	        '   background-color: rgb(77,57,75); ',
	        '   postion:relative; float:left;',
	        '   min-height: 100%; ',
	        '   color: #CCC; ',
	        '   width:225px; ',
	        ' } ',
	        ' .conversationComponent-messageList { ',
	        '   postion:relative; float:left;',
	        ' } ',
	    ]
	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	function loginComponent($location, invokeAsync, profileActions, securityStore) {
	    var self = this;

	    self.login = function () {
	        invokeAsync({
	            action: profileActions.login,
	            params: {
	                username: self.username,
	                password: self.password
	            }
	        }).then(function () {
	            if(securityStore.token)
	                $location.path('/conversation');
	        });
	    }

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    component: loginComponent,
	    template: [
	        '<div>',
	        '<div><h1>Login</h1></div>',
	        '<div><input placeholder="Username" data-ng-model="vm.username"></input></div>',
	        '<div><input placeholder="Password" type="password" data-ng-model="vm.password"></input></div>',
	        '<button data-ng-click="vm.login()">login</button>',
	        '<div><a href="#/register">Register</a></div>',
	        '</div>'
	    ],
	    providers: [
	        '$location',
	        'invokeAsync',
	        'profileActions',
	        'securityStore'
	    ]
	});


/***/ },
/* 9 */
/***/ function(module, exports) {

	function registrationComponent($location, profileActions) {
	    var self = this;

	    self.register = function () {

	        profileActions.register({
	            username: self.username,
	            password: self.password
	        });
	    }

	    self.storeOnChange = function () {
	        $location.path('/conversation');
	    }

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    component: registrationComponent,
	    template: [
	        '<div>',
	        '   <div><h1>Register</h1></div>',
	        '<div><input placeholder="Username" data-ng-model="vm.username"></input></div>',
	        '<div><input placeholder="Password" type="password" data-ng-model="vm.password"></input></div>',
	        '   <button data-ng-click="vm.register()">register</button>',
	        '</div>'
	    ],
	    providers: [
	        '$location',
	        'profileActions'
	    ]
	});


/***/ },
/* 10 */
/***/ function(module, exports) {

	function conversationListComponent($location, profileActions, profileStore) {
	    var self = this;
	    self.current = profileStore.current;
	    self.others = profileStore.otherProfiles;
	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "conversation-list",
	    component: conversationListComponent,
	    template: [
	        '<div class="conversationListComponent">',
	        '   <h1>slack</h1>',
	        '   <span>{{ ::vm.current.username }}</span>',
	        '   <div>',
	        '       <h2>DIRECT MESSAGES</h2>',
	        '       <div data-ng-repeat="profile in vm.others">',
	        '           <a class="conversationListComponent-otherProfile" href="#/conversation/{{ ::profile.id }}">{{ ::profile.username }}</a>',
	        '       </div>',
	        '   </div>',
	        '</div>'
	    ],
	    providers: [
	        '$location',
	        'profileActions',
	        'profileStore'
	    ],
	    styles: [
	        ' .conversationListComponent { ',
	        '   padding-left:15px; ',
	        ' } ',
	        ' .conversationListComponent h1 { ',
	        '   color: #FFF; ',
	        ' } ',
	        ' .conversationListComponent h2 { font-size: 1.2em; font-weight:400; } ',
	        ' .conversationListComponent-otherProfile { color:#CCC; text-decoration:none; } ',
	    ]
	});


/***/ },
/* 11 */
/***/ function(module, exports) {

	function messageListComponent($location, conversationList, conversationStore, profileActions) {
	    var self = this;

	    self.conversations = [];

	    self.messages = [];

	    self.storeOnChange = function () {

	    }

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "message-list",
	    component: messageListComponent,
	    template: [
	        '<div class="messageListComponent">',
	        '   <h1>no conversations</h1>',
	        '</div>'
	    ],
	    providers: [
	        '$location',
	        'conversationList',
	        'conversationStore',
	        'profileActions'
	    ],
	    styles: [
	        ' .messageListComponent { ',
	        '   padding-left:15px; ',
	        ' } ',
	    ]
	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	function conversation() {
	    var self = this;

	    return self;
	}

	angular.module("app").service("conversation", conversation);

/***/ },
/* 13 */
/***/ function(module, exports) {

	function conversationList($injector) {
	    var self = this;
	    self.$injector = $injector;

	    self.createInstance = function (options) {
	        var instance = new conversationList(self.$injector);

	        if (options.data) {

	        }

	        return instance;
	    }

	    return self;
	}

	angular.module("app").service("conversationList", ["$injector",conversationList]);

/***/ },
/* 14 */
/***/ function(module, exports) {

	function message() {
	    var self = this;

	    return self;
	}

	angular.module("app").service("message", message);

/***/ },
/* 15 */
/***/ function(module, exports) {

	function profile() {
	    var self = this;

	    return self;
	}

	angular.module("app").service("profile", profile);

/***/ },
/* 16 */
/***/ function(module, exports) {

	function conversationService($q, apiEndpoint, fetch) {
	    var self = this;


	}

	angular.module("app").service("conversationService", ["$q", "apiEndpoint", "fetch", conversationService]);

/***/ },
/* 17 */
/***/ function(module, exports) {

	function messageService($q, apiEndpoint, fetch) {
	    var self = this;


	}

	angular.module("app").service("messageService", ["$q", "apiEndpoint", "fetch", messageService]);

/***/ },
/* 18 */
/***/ function(module, exports) {

	function profileService($q, apiEndpoint, fetch, formEncode) {
	    var self = this;
	    self.$q = $q;
	    self.tryToLogin = function (options) {
	        var deferred = self.$q.defer();
	        angular.extend(options.data, { grant_type: "password" });
	        var formEncodedData = formEncode(options.data);
	        var headers = { "Content-Type": "application/x-www-form-urlencoded" };
	        fetch.fromService({ method: "POST", url: self.baseUri + "/token", data: formEncodedData, headers: headers }).then(function (results) {
	            deferred.resolve(results.data);
	        }).catch(function (error) {
	            deferred.resolve(error);
	        });
	        return deferred.promise;
	    };

	    self.tryToRegister = function (options) {
	        var deferred = self.$q.defer();
	        fetch.fromService({ method: "POST", url: self.baseUri + "/register", data: { username: options.username, password: options.password } }).then(function (results) {
	            deferred.resolve(results.data);
	        });
	        return deferred.promise;
	    };

	    self.getCurrentProfile = function (options) {
	        var deferred = self.$q.defer();
	        fetch.fromService({ method: "GET", url: self.baseUri + "/getCurrentProfile" }).then(function (results) {
	            deferred.resolve(results.data);
	        });
	        return deferred.promise;
	    };

	    self.getOtherProfiles = function (options) {
	        var deferred = self.$q.defer();
	        fetch.fromService({ method: "GET", url: self.baseUri + "/getOtherProfiles" }).then(function (results) {
	            deferred.resolve(results.data);
	        });
	        return deferred.promise;
	    };

	    self.baseUri = apiEndpoint.getBaseUrl() + "/profile";

	    return self;
	}

	angular.module("app").service("profileService", ["$q", "apiEndpoint", "fetch", "formEncode", profileService]);

/***/ },
/* 19 */
/***/ function(module, exports) {

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

/***/ },
/* 20 */
/***/ function(module, exports) {

	function messageStore($, dispatcher, MESSAGE_ACTIONS) {
	    var self = this;

	    self.connection = $.hubConnection();
	    self.hub = self.connection.createHubProxy("messageHub");

	    return self;
	}

	ngX.Store({ store: messageStore, providers: ["$","dispatcher", "MESSAGE_ACTIONS"] });

/***/ },
/* 21 */
/***/ function(module, exports) {

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

/***/ },
/* 22 */
/***/ function(module, exports) {

	function securityStore(dispatcher, localStorageManager, PROFILE_ACTIONS) {
	    var self = this;
	    self.localStorageManager = localStorageManager;

	    dispatcher.addListener({
	        actionType: PROFILE_ACTIONS.LOGIN,
	        callback: function (options) {
	            self.token = options.token;
	            self.emitChange({ id: options.id });
	        }
	    });

	    dispatcher.addListener({
	        actionType: PROFILE_ACTIONS.LOGIN_FAIL,
	        callback: function (options) {
	            self.storeInstance.emitChange({ id: options.id });
	        }
	    });

	    Object.defineProperty(self, "token", {
	        get: function () { return self.localStorageManager.get({ name: "token" }); },
	        set: function (value) { self.localStorageManager.put({ name: "token", value: value }); }
	    });

	    return self;
	}

	ngX.Store({ store: securityStore, providers: ["dispatcher", "localStorageManager", "PROFILE_ACTIONS"] });

/***/ }
/******/ ]);