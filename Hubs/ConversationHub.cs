using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Slack.Hubs
{
    [HubName("conversationHub")]
    public class ConversationHub : Hub
    {
        public void Send(string username, string message)
        {
            Clients.All.broadcastMessage(new { username = username, message = message });
        }
    }
}