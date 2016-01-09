using Slack.Data.Contracts;
using System.Web.Http;
using System.Net.Http;

namespace Slack.Controllers
{
    public class ControllerBase: ApiController
    {
        public ControllerBase(ISlackUow uow) { this.uow = uow; }

        public string Username { get { return Request.GetRequestContext().Principal.Identity.Name; } }

        protected readonly ISlackUow uow;
    }
}