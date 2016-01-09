using Slack.Data.Contracts;
using Slack.Dtos;
using Slack.Services.Contracts;
using System.Web.Http;

namespace Slack.Controllers
{
    [Authorize]
    [RoutePrefix("api/profile")]
    public class ProfileController : ControllerBase
    {
       
        public ProfileController(ISlackUow uow, IIdentityService identityService)
            :base(uow)
        {
            this.identityService = identityService;
        }
        
        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public IHttpActionResult Register(RegistrationRequestDto dto)
            => Ok(this.identityService.TryToRegister(dto));
        
        protected readonly IIdentityService identityService;
    }
}