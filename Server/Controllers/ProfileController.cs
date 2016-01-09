using Slack.Data.Contracts;
using Slack.Dtos;
using Slack.Services.Contracts;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Net.Http;


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

        [HttpGet]
        [Authorize]
        [Route("getCurrentProfile")]
        public IHttpActionResult GetCurrentProfile()
            => Ok(new ProfileDto(uow.Profiles.GetAll()
                .ToList()
                .Where(x=> x.Username == Username)
                .Single()));

        [HttpGet]
        [Authorize]
        [Route("getOtherProfiles")]
        public IHttpActionResult GetOtherProfiles()
            => Ok(uow.Profiles.GetAll()
                .ToList()
                .Where(x => x.Username != Username)
                .ToList()
                .Select(x=> new ProfileDto(x)));

        [HttpGet]
        [Authorize]
        [Route("getProfileById")]
        public IHttpActionResult GetById(int id)
            => Ok(new ProfileDto(uow.Profiles.GetById(id)));
        
        protected readonly IIdentityService identityService;
    }
}