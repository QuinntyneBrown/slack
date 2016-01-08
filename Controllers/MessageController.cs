using Slack.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Slack.Controllers
{
    public class MessageController : ControllerBase
    {
        public MessageController(ISlackUow uow)
        :base(uow)
        {

        }

        public IHttpActionResult Send()
        {
            return Ok();
        }
    }
}
