require('./app/app.module.js');

require('./app/metal/jQuery.js');

require('./app/actions/action-constants.js');
require('./app/actions/conversation-actions.js');
require('./app/actions/profile-actions.js');

require('./app/components/app-component.js');
require('./app/components/conversation-component.js');
require('./app/components/login-component.js');
require('./app/components/registration-component.js');
require('./app/components/conversation-list-component.js');
require('./app/components/message-list-component.js');

require('./app/domain/conversation.js');
require('./app/domain/conversation-list.js');
require('./app/domain/message.js');
require('./app/domain/profile.js');

require('./app/services/conversation-service.js');
require('./app/services/message-service.js');
require('./app/services/profile-service.js');

require('./app/stores/conversation-store.js');
require('./app/stores/message-store.js');
require('./app/stores/profile-store.js');
require('./app/stores/security-store.js');