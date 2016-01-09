using Common.Data.Contracts;
using Slack.Data.Contracts;
using Slack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Slack.Data
{
    public class SlackUow : Common.Data.BaseUow, ISlackUow
    {
        public SlackUow(SlackContext slackContext)
            : base(slackContext)
        {
            
        }

        public IRepository<Profile> Profiles { get { return GetStandardRepo<Profile>(); } }

        public IRepository<Message> Messages { get { return GetStandardRepo<Message>(); } }

        public IRepository<Conversation> Conversations { get { return GetStandardRepo<Conversation>(); } }

        public void SaveChanges()
        {
            base.dbContext.SaveChanges();
        }
    }
}