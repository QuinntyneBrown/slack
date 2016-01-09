using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Slack.Hubs
{
    [HubName("messageHub")]
    public class MessageHub : Hub
    {
        public void Send(string username, string message)
        {
            Clients.All.broadcastMessage(new { username = username, message = message });
        }
    }
}