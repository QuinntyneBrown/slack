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
	__webpack_require__(9)
	__webpack_require__(10)
	__webpack_require__(11)
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

	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);

	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);

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
	    OTHER_PROFILES: 5,
	    OTHER: 6
	});

	angular.module("app").value("CONVERSATION_ACTIONS", {
	    GET_BY_CURRENT_PROFILE: 7,
	    CURRENT: 8
	});

	angular.module("app").value("MESSAGE_ACTIONS", {
	    SEND: 9
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

	    self.getOtherProfile = function (options) {
	        var newGuid = guid();

	        profileService.getProfileById({ id: options.id }).then(function (results) {
	            dispatcher.emit({
	                actionType: PROFILE_ACTIONS.OTHER, options:
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

	function messageActions(dispatcher, formEncode, guid, messageService, MESSAGE_ACTIONS) {
	    var self = this;

	    self.send = function (options) {
	        var newGuid = guid();

	        messageService.send({ content: options.content, otherProfileId: options.otherProfileId })
	            .then(function (results) {

	            dispatcher.emit({
	                actionType: MESSAGE_ACTIONS.SEND, options:
	                    { data: results, id: newGuid }
	            });
	        });
	        return newGuid;
	    }

	    return self;
	}

	angular.module("app")
	    .service("messageActions", ["dispatcher", "formEncode", "guid", "messageService", "MESSAGE_ACTIONS", messageActions])



/***/ },
/* 7 */
/***/ function(module, exports) {

	function aboutConversationComponent(profileStore) {
	    var self = this;
	    self.other = profileStore.other;
	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "about-conversation",
	    component: aboutConversationComponent,
	    template: [
	        '<div class="aboutConversationComponent">',
	        '<h1>About</h1>',
	        '<h2>{{ ::vm.other.username }}</h2>',
	        '</div>'
	    ],
	    providers: [
	        'profileStore'
	    ],
	    styles: [
	        ' .aboutConversationComponent { ',
	        '   float:right;',
	        '   width:312px; ',
	        '   height:100%; ',
	        ' } '
	    ]
	});


/***/ },
/* 8 */
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
	        ' body, h1 { ',
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
/* 9 */
/***/ function(module, exports) {

	function conversationDetailHeaderComponent(profileStore) {
	    var self = this;

	    self.other = profileStore.other;

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "conversation-detail-header",
	    component: conversationDetailHeaderComponent,
	    template: [
	        '<div class="conversationDetailHeaderComponent">',
	        '   <h1 data-ng-if="!vm.other">no conversations</h1>',
	        '   <h1 data-ng-if="vm.other">@{{ ::vm.other.username }}</h1>',
	        '</div>'
	    ],
	    providers: [
	        "profileStore"
	    ],
	    styles: [
	        ' .conversationDetailHeaderComponent { ',
	        '   padding-left: 15px; ',
	        '   width:100%; ',
	        '   height:52px; ',
	        '   background-color: rgb(250,250,250); ',
	        ' } '
	    ]
	});


/***/ },
/* 10 */
/***/ function(module, exports) {

	function conversationDetailComponent(profileStore) {
	    var self = this;

	    self.getOther = function () { return profileStore.other; }

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "conversation-detail",
	    component: conversationDetailComponent,
	    template: [
	        '<div class="conversationDetailComponent">',
	        '   <conversation-detail-header></conversation-detail-header>',
	        '   <div class="conversationDetailComponent-body" data-ng-hide="!vm.getOther()">',
	        '       <conversation-messages></conversation-messages>',
	        '       <about-conversation></about-conversation>',
	        '       <div style="clear:both;"></div>',
	        '   </div>',
	        '</div>'
	    ],
	    providers: [
	        'profileStore'
	    ],
	    styles: [
	        ' .conversationDetailComponent, .conversationDetailComponent-body { height:100%; } '
	    ]
	});


/***/ },
/* 11 */
/***/ function(module, exports) {

	function conversationListHeaderComponent(profileStore) {
	    var self = this;

	    self.current = profileStore.current;

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "conversation-list-header",
	    component: conversationListHeaderComponent,
	    template: [
	        '<div class="conversationListHeaderComponent">',
	        '   <h1 class="conversationListHeaderComponent-heading">slackish</h1>',
	        '   <span>{{ ::vm.current.username }}</span>',
	        '</div>'
	    ],
	    providers: [
	        'profileStore'
	    ],
	    styles: [
	        ' .conversationListHeaderComponent { ',
	        '   padding-left: 15px; ',
	        '   width:100%; ',
	        '   height:52px; ',
	        ' } ',
	        ' .conversationListHeaderComponent-heading { color:#FFF; font-size: 1.4em; line-height: 1.6em; } '
	    ]
	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	function conversationListComponent() {
	    var self = this;
	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "conversation-list",
	    component: conversationListComponent,
	    template: [
	        '<div class="conversationListComponent">',
	        '   <conversation-list-header></conversation-list-header>',
	        '   <profile-list></profile-list>',
	        '</div>'
	    ],
	    providers: [
	    ],
	    styles: [
	    ]
	});


/***/ },
/* 13 */
/***/ function(module, exports) {

	function conversationMessagesComponent($location, conversationList, conversationStore, messageStore, profileActions) {
	    var self = this;

	    self.conversations = [];

	    self.messages = [];

	    self.storeOnChange = function () {
	        alert(messageStore.items.length);
	    }

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "conversation-messages",
	    component: conversationMessagesComponent,
	    template: [
	        '<div class="conversationMessagesComponent">',
	        '<message-form></message-form>',
	        '</div>'
	    ],
	    providers: [
	        '$location',
	        'conversationList',
	        'conversationStore',
	        'messageStore',
	        'profileActions'
	    ],
	    styles: [
	        ' .conversationMessagesComponent { ',
	        '   height:100%; ',
	        '   float:left; ',
	        '   width:auto; ',
	        '   padding-left: 15px;',
	        ' } ',
	    ]
	});


/***/ },
/* 14 */
/***/ function(module, exports) {

	function conversationComponent() {
	    var self = this;
	    return self;
	}

	conversationComponent.canActivate = function () {
	    return ["$q", "$route", "invokeAsync","profileActions",
	        function ($q, $route, invokeAsync, profileActions) {
	            var promises = [];
	            var deferred = $q.defer();
	            if ($route.current.params.profileId)
	                promises.push(invokeAsync({
	                    action: profileActions.getOtherProfile,
	                    params: { id: Number($route.current.params.profileId) }
	                }));

	            promises.push(invokeAsync(profileActions.getCurrentProfile));
	            promises.push(invokeAsync(profileActions.getOtherProfiles));
	            $q.all(promises).then(function () { deferred.resolve() });
	            return deferred.promise;
	        }
	    ]
	}

	ngX.Component({
	    isBootstrapped: true,
	    routes: ['/conversation','/conversation/:profileId'],
	    component: conversationComponent,
	    template: [
	        '<div class="conversationComponent">',
	        '   <div class="conversationComponent-list">',
	        '       <conversation-list></conversation-list>',
	        '   </div>',
	        '   <div class="conversationComponent-detail">',
	        '       <conversation-detail></conversation-detail>',
	        '   </div>',
	        '   <div style="clear:both;"></div>',
	        '</div>'
	    ],
	    styles: [
	        ' .conversationComponent { ',
	        '   width: 100%;',
	        '   height:100vh;',
	        ' } ',
	        ' .conversationComponent-list { ',
	        '   background-color: rgb(77,57,75); ',
	        '   float:left;',
	        '   height: 100%; ',
	        '   color: #CCC; ',
	        '   width:225px; ',
	        ' } ',
	        ' .conversationComponent-detail { ',
	        '   overflow:hidden;',
	        '   height: 100%;',
	        '   width:auto; ',
	        ' } ',
	    ]
	});


/***/ },
/* 15 */
/***/ function(module, exports) {

	function loginComponent($location, invokeAsync, profileActions, securityStore) {
	    var self = this;

	    self.username = 'kobe';
	    self.password = 'password';

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
/* 16 */
/***/ function(module, exports) {

	
	function profileListComponent(profileStore) {
	    var self = this;
	    self.others = profileStore.otherProfiles;
	    self.other = profileStore.other;
	    self.isConversatingWith = function (profile) {
	        return self.other && self.other.username === profile.username;
	    }
	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "profile-list",
	    component: profileListComponent,
	    template: [
	        '   <div class="profileList">',
	        '       <h2 class="profileList-heading">DIRECT MESSAGES</h2>',
	        '       <div data-ng-repeat="profile in vm.others">',
	        '           <a data-ng-if="!vm.isConversatingWith(profile)" class="profileList-otherProfile" href="#/conversation/{{ ::profile.id }}">{{ ::profile.username }}</a>',
	        '           <a data-ng-if="vm.isConversatingWith(profile)" class="profileList-conversatingWithProfile" href="#/conversation/{{ ::profile.id }}">{{ ::profile.username }}</a>',
	        '       </div>',
	        '   </div>'
	    ],
	    providers: [
	        'profileStore'
	    ],
	    styles: [
	        ' .profileList { ',
	        '   padding-left:15px; ',
	        ' } ',
	        ' .profileList-heading { ',
	        '   font-size: 1.2em; font-weight:400;',
	        ' } ',
	        ' .profileList-otherProfile { ',
	        '   color:#CCC; text-decoration:none;',
	        ' } ',
	        ' .profileList-conversatingWithProfile { color: #FFF; text-decoration:none; } '
	    ]
	});




/***/ },
/* 17 */
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
/* 18 */
/***/ function(module, exports) {

	function messsageFormComponent(messageActions, profileStore) {

	    var self = this;

	    self.send = function () {
	        messageActions.send({
	            content: self.content,
	            otherProfileId: profileStore.other.id
	        });

	        self.content = null;
	    }

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "message-form",
	    component: messsageFormComponent,
	    template: [
	        '<div class="message-form" style="width:100%">',
	        '   <input class="message-form-input" placeholder="Type a message..." data-ng-model="vm.content"></input>',
	        '   <button class="message-form-button" data-ng-click="vm.send()">Send</button>',
	        '</div>'
	    ],
	    styles: [
	        ' .message-form-input { ',
	        '   width:400px; line-height:1.5em; font-size:1.2em; padding:10px; ',
	        ' } ',
	        ' .message-form-button { ',
	        '   height:40px; margin:0;',
	        ' } ',
	    ],
	    providers: [
	        'messageActions', 'profileStore'
	    ]
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	function conversation() {
	    var self = this;

	    return self;
	}

	angular.module("app").service("conversation", conversation);

/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports) {

	function message() {
	    var self = this;

	    return self;
	}

	angular.module("app").service("message", message);

/***/ },
/* 22 */
/***/ function(module, exports) {

	function profile() {
	    var self = this;

	    return self;
	}

	angular.module("app").service("profile", profile);

/***/ },
/* 23 */
/***/ function(module, exports) {

	function conversationService($q, apiEndpoint, fetch) {
	    var self = this;


	}

	angular.module("app").service("conversationService", ["$q", "apiEndpoint", "fetch", conversationService]);

/***/ },
/* 24 */
/***/ function(module, exports) {

	function messageService($q, apiEndpoint, fetch) {
	    var self = this;

	    self.send = function (options) {
	        var deferred = $q.defer();
	        fetch.fromService({
	            method: "POST", url: self.baseUri + "/send", data:
	                {
	                    content: options.content,
	                    otherProfileId: options.otherProfileId
	                }
	        }).then(function (results) {
	            deferred.resolve(results.data);
	        });
	        return deferred.promise;
	    };

	    self.baseUri = apiEndpoint.getBaseUrl() + "/message";
	}

	angular.module("app").service("messageService", ["$q", "apiEndpoint", "fetch", messageService]);

/***/ },
/* 25 */
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

	    self.getProfileById = function (options) {
	        var deferred = self.$q.defer();
	        fetch.fromService({ method: "GET", url: self.baseUri + "/getProfileById", params: { id: options.id} }).then(function (results) {
	            deferred.resolve(results.data);
	        });
	        return deferred.promise;
	    };

	    self.baseUri = apiEndpoint.getBaseUrl() + "/profile";

	    return self;
	}

	angular.module("app").service("profileService", ["$q", "apiEndpoint", "fetch", "formEncode", profileService]);

/***/ },
/* 26 */
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
/* 27 */
/***/ function(module, exports) {

	function messageStore($, dispatcher, MESSAGE_ACTIONS) {
	    var self = this;

	    self.connection = $.hubConnection();
	    self.hub = self.connection.createHubProxy("messageHub");

	    dispatcher.addListener({
	        actionType: MESSAGE_ACTIONS.SEND,
	        callback: function (options) {
	            self.storeInstance.addOrUpdate({ data: options.data });
	            self.storeInstance.emitChange({ id: options.id });
	        }
	    });

	    return self;
	}

	ngX.Store({ store: messageStore, providers: ["$","dispatcher", "MESSAGE_ACTIONS"] });

/***/ },
/* 28 */
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

	    dispatcher.addListener({
	        actionType: PROFILE_ACTIONS.OTHER,
	        callback: function (options) {
	            self.other = options.data;
	            self.storeInstance.emitChange({ id: options.id });
	        }
	    });
	    
	    return self;
	}

	ngX.Store({ store: profileStore, providers: ["dispatcher", "PROFILE_ACTIONS"] });

/***/ },
/* 29 */
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