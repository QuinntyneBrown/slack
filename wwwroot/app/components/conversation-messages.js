function conversationMessagesComponent($location, $scope, conversationList, conversationStore, messageStore, profileActions, profileStore, safeDigest) {
    var self = this;

    self.conversations = [];

    self.messages = [];

    self.current = profileStore.current;
    self.other = profileStore.other;

    self.isFromOther = function (message) {
        return message.toId == profileStore.current.id
                && message.fromId == profileStore.other.id
    }

    self.isToOther = function (message) {
        return message.fromId == profileStore.current.id
                && message.toId == profileStore.other.id
    }

    self.isInCurrentConversation = function (message) {
        return self.isFromOther(message) || self.isToOther(message);
    }

    self.onInit = function () {
        for (var i = 0; i < messageStore.items.length; i++) {
            if (self.isInCurrentConversation(messageStore.items[i])) {
                self.messages.push(messageStore.items[i]);
            }
        }
    }

    self.storeOnChange = function () {
        self.messages = [];
        self.onInit();
        safeDigest($scope);
    }

    return self;
}

ngX.Component({
    isBootstrapped: true,
    selector: "conversation-messages",
    component: conversationMessagesComponent,
    template: [
        '<div class="conversationMessagesComponent">',
        '   <message-form></message-form>',
        '   <div>',
        '       <div data-ng-repeat="message in vm.messages">',
        '           <span data-ng-if="vm.isFromOther(message)">{{ ::vm.other.username }} : {{ ::message.content }}</span>',
        '           <span data-ng-if="vm.isToOther(message)">{{ ::vm.current.username }} : {{ ::message.content }}</span>',
        '       </div>',
        '   </div>',
        '</div>'
    ],
    providers: [
        '$location',
        '$scope',
        'conversationList',
        'conversationStore',
        'messageStore',
        'profileActions',
        'profileStore',
        'safeDigest'
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
