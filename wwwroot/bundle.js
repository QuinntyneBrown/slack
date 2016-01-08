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

/***/ },
/* 1 */
/***/ function(module, exports) {

	angular.module("app", ["ngX"]);


/***/ },
/* 2 */
/***/ function(module, exports) {

	angular.module("app").value("PROFILE_ACTIONS", {
	    LOGIN: 0
	});

	angular.module("app").value("CONVERSATION_ACTIONS", {

	});

	angular.module("app").value("MESSAGE_ACTIONS", {

	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	

/***/ },
/* 4 */
/***/ function(module, exports) {

	function profileActions(dispatcher, guid, PROFILE_ACTIONS) {
	    var self = this;
	    self.login = function (options) {
	        var newGuid = guid();
	        dispatcher.emit({
	            actionType: PROFILE_ACTIONS.LOGIN,
	            options: { data: { username: options.username } }
	        });
	        return newGuid;
	    }

	    return self;
	}

	angular.module("app")
	    .service("profileActions", ["dispatcher", "guid","PROFILE_ACTIONS", profileActions])



/***/ },
/* 5 */
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

	    $routeProvider.when("/conversation", {
	        "componentName": "conversationComponent"
	    });

	}]);

/***/ },
/* 6 */
/***/ function(module, exports) {

	function conversationComponent(profileStore, conversationStore) {
	    var self = this;
	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    route:'/conversation',
	    component: conversationComponent,
	    template: [
	        '<div class="conversationComponent">',
	        '<div class="conversationComponent-conversationList"><conversation-list></conversation-list></div>',
	        '<div class="conversationComponent-messageList"><message-list></message-list></div>',
	        '<div style="clear:both;"></div>',
	        '</div>'
	    ],
	    providers: [
	        'profileStore',
	        'conversationStore',
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
	        '   color: #EEE; ',
	        '   width:225px; ',
	        ' } ',
	        ' .conversationComponent-messageList { ',
	        '   postion:relative; float:left;',
	        ' } ',
	    ]
	});


/***/ },
/* 7 */
/***/ function(module, exports) {

	function loginComponent($location, profileActions) {
	    var self = this;

	    self.login = function () {
	        profileActions.login({ username: self.username });
	    }

	    self.storeOnChange = function () {
	        $location.path('/conversation');
	    }

	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    component: loginComponent,
	    template: [
	        '<div>',
	        '<div><h1>Login</h1></div>',
	        '<input placeholder="Username" data-ng-model="vm.username"></input>',
	        '<button data-ng-click="vm.login()">login</button>',
	        '</div>'
	    ],
	    providers: [
	        '$location',
	        'profileActions'
	    ]
	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	function conversationListComponent($location, profileActions, profileStore) {
	    var self = this;
	    self.current = profileStore.current;
	    return self;
	}

	ngX.Component({
	    isBootstrapped: true,
	    selector: "conversation-list",
	    component: conversationListComponent,
	    template: [
	        '<div class="conversationListComponent">',
	        '<h1>slack</h1>',
	        '<span>{{ ::vm.current.username }}</span>',
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
	    ]
	});


/***/ },
/* 9 */
/***/ function(module, exports) {

	function messageListComponent($location, profileActions) {
	    var self = this;

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
	        'profileActions'
	    ],
	    styles: [
	        ' .messageListComponent { ',
	        '   padding-left:15px; ',
	        ' } ',
	    ]
	});


/***/ },
/* 10 */
/***/ function(module, exports) {

	

/***/ },
/* 11 */
/***/ function(module, exports) {

	

/***/ },
/* 12 */
/***/ function(module, exports) {

	

/***/ },
/* 13 */
/***/ function(module, exports) {

	

/***/ },
/* 14 */
/***/ function(module, exports) {

	

/***/ },
/* 15 */
/***/ function(module, exports) {

	

/***/ },
/* 16 */
/***/ function(module, exports) {

	function conversationStore() {
	    var self = this;

	    return self;
	}

	ngX.Store({ store: conversationStore, providers: ["dispatcher", "CONVERSATION_ACTIONS"] });

/***/ },
/* 17 */
/***/ function(module, exports) {

	function messageStore() {
	    var self = this;

	    return self;
	}

	ngX.Store({ store: messageStore, providers: ["dispatcher", "MESSAGE_ACTIONS"] });

/***/ },
/* 18 */
/***/ function(module, exports) {

	function profileStore(dispatcher, PROFILE_ACTIONS) {
	    var self = this;

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

/***/ }
/******/ ]);