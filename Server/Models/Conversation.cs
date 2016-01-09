using System.Collections.Generic;

namespace Slack.Models
{
    public class Conversation
    {
        public Conversation()
        {
            this.Profiles = new HashSet<Profile>();
            this.Messages = new HashSet<Message>();
        }

        public int Id { get; set; }
        public ICollection<Profile> Profiles { get; set; }
        public ICollection<Message> Messages { get; set; }
   
    }
}