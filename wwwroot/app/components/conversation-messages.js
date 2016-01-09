function conversationMessagesComponent($location, $scope, conversationList, conversationStore, messageStore, profileActions, profileStore, safeDigest) {
    var self = this;

    self.conversations = [];

    self.messages = [];

    self.onInit = function () {
        for (var i = 0; i < messageStore.items.length; i++) {
            if(messageStore.items[i].fromId == profileStore.current.id 
                && messageStore.items[i].toId == profileStore.other.id) {
                self.messages.push(messageStore.items[i]);
            }

            if (messageStore.items[i].toId == profileStore.current.id
                && messageStore.items[i].fromId == profileStore.other.id) {
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
        '           <span>{{ ::message.content }}</span>',
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
