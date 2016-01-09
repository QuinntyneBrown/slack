using Slack.Models;

namespace Slack.Dtos
{
    public class MessageDto
    {
        public MessageDto(Message message)
        {
            this.FromId = message.FromId;
            this.ToId = message.ToId;
            this.Content = message.Content;
            this.ConversationId = message.ConversationId;
        }

        public int FromId { get; set; }

        public int ToId { get; set; }

        public int ConversationId { get; set; }

        public string Content { get; set; }
    }
}