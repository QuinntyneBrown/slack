using Slack.Models;

namespace Slack.Dtos
{
    public class MessageDto
    {
        public MessageDto(Message message)
        {
            this.Id = message.Id;
            this.FromId = message.FromId;
            this.ToId = message.ToId;
            this.Content = message.Content;
            this.ConversationId = message.ConversationId;
        }

        public int Id { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public int ConversationId { get; set; }
        public string Content { get; set; }
    }
}