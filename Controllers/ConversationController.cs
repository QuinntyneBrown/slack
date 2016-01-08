using Slack.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Slack.Controllers
{
    public class ConversationController : ControllerBase
    {
        public ConversationController(ISlackUow uow) :
            base(uow)
        {

        }
    }
}
