using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Slack.Dtos;

namespace Slack.Hubs
{
    [HubName("messageHub")]
    public class MessageHub : Hub
    {
        public void Send(MessageDto dto)
        {
            Clients.Others.broadcastMessage(dto);
        }
    }
}