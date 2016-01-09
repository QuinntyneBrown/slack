using Common.Data.Contracts;
using Slack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Slack.Data.Contracts
{
    public interface ISlackUow
    {
        IRepository<Profile> Profiles { get; }

        IRepository<Message> Messages { get; }

        IRepository<Conversation> Conversations { get; }

        void SaveChanges();
    }
}
