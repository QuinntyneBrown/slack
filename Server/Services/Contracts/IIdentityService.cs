using System.Collections.Generic;
using System.Security.Claims;
using Slack.Dtos;

namespace Slack.Services.Contracts
{
    public interface IIdentityService
    {

        TokenDto TryToRegister(RegistrationRequestDto registrationRequestDto);

        bool AuthenticateUser(string username, string password);

        ICollection<Claim> GetClaimsForUser(string username);
    }
}