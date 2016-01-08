using Slack.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Slack.Controllers
{
    public class ControllerBase: ApiController
    {
        public ControllerBase(ISlackUow uow)
        {
            this.uow = uow;
        }

        protected readonly ISlackUow uow;
    }
}