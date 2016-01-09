using Slack.Data.Contracts;
using Slack.Server.Dtos;
using System.Web.Http;
using System.Data.Entity;
using System.Linq;
using Slack.Models;
using Slack.Dtos;

namespace Slack.Controllers
{
    [Authorize]
    [RoutePrefix("api/message")]
    public class MessageController : ControllerBase
    {
        public MessageController(ISlackUow uow)
        :base(uow) { }

        [HttpPost]
        [Route("send")]
        public IHttpActionResult Send(SendMessageRequestDto dto)
        {
            var currentProfile = uow.Profiles
                .GetAll()
                .Where(x => x.Username == Username)
                .Single();

            var conversation = uow.Conversations
                .GetAll()
                .Where(x => x.Profiles.Any(p => p.Id == currentProfile.Id))
                .Where(x => x.Profiles.Any(p => p.Id == dto.OtherProfileId))
                .FirstOrDefault();

            if (conversation == null)
            {
                conversation = new Conversation();
                conversation.Profiles.Add(currentProfile);
                conversation.Profiles.Add(uow.Profiles.GetById(dto.OtherProfileId));
                uow.Conversations.Add(conversation);
            }

            var message = new Message();
            message.FromId = currentProfile.Id;
            message.ToId = dto.OtherProfileId;
            message.Content = dto.Content;
            conversation.Messages.Add(message);

            uow.SaveChanges();
            
            return Ok(new MessageDto(message));
        }
    }
}
