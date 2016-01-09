using Slack.Data.Contracts;
using System.Web.Http;

namespace Slack.Controllers
{
    [Authorize]
    [RoutePrefix("api/message")]
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
