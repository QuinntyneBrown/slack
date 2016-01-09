require('./app/app.module.js');

require('./app/metal/jQuery.js');

require('./app/actions/action-constants.js');
require('./app/actions/conversation-actions.js');
require('./app/actions/profile-actions.js');
require('./app/actions/messageActions.js');

require('./app/components/about-conversation.js');
require('./app/components/app.js');
require('./app/components/conversation-detail-header.js')
require('./app/components/conversation-detail.js')
require('./app/components/conversation-list-header.js')
require('./app/components/conversation-list.js');
require('./app/components/conversation-messages.js');
require('./app/components/conversation.js');
require('./app/components/login.js');
require('./app/components/profile-list.js');
require('./app/components/registration.js');
require('./app/components/message-form.js');

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