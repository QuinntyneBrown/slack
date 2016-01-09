using Slack.Data.Contracts;
using System.Linq;
using System.Data.Entity;
using System.Web.Http;
using Slack.Dtos;

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

        [HttpGet]
        public IHttpActionResult GetByCurrentProfile()
            => Ok(uow.Conversations.GetAll()
                .Include(x => x.Profiles)
                .Include(x => x.Messages)
                .Where(x => x.Profiles.Any(p => p.Username == Username))
                .ToList()
                .Select(x => new ConversationDto(x)));
    }
}
