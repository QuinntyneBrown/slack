using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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

        public ICollection<Conversation> Conversations { get; set; }


    }
}