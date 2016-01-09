using Slack.Data.Contracts;
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