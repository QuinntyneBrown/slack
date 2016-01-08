using Slack.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Slack.Controllers
{
    public class ProfileController : ControllerBase
    {
        public ProfileController(ISlackUow uow):
            base(uow)
        {

        }

        [HttpPost]
        public IHttpActionResult Login(string username)
        {
            return Ok();
        }
        
    }
}