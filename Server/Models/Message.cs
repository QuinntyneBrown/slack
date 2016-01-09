using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Slack.Models
{
    public class Message
    {
        public Message() { }

        public int Id { get; set; }
        [ForeignKey("Conversation")]
        public int ConversationId { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public string Content { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Conversation Conversation { get; set; }
    }
}