using System.Collections.Generic;

namespace Slack.Models
{
    public class Profile
    {
        public Profile()
        {
            this.Conversations = new HashSet<Conversation>();
        }

        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public ICollection<Conversation> Conversations { get; set; }


    }
}