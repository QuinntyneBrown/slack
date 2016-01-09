using Slack.Data.Contracts;
using System.Web.Http;

namespace Slack.Controllers
{
    [Authorize]
    [RoutePrefix("api/conversation")]
    public class ConversationController : ControllerBase
    {
        public ConversationController(ISlackUow uow)
            :base(uow)
        {

        }
    }
}
