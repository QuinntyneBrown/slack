using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using Slack.Dtos;
using Slack.Services.Contracts;
using Slack.Data.Contracts;
using Slack.Models;

namespace Slack.Services
{
    public class IdentityService : IIdentityService
    {
        public IdentityService(ISlackUow uow) { this.uow = uow; }

        public bool AuthenticateUser(string username, string password)
        {
            return this.uow.Profiles
                .GetAll()
                .Where(x => x.Username == username && x.Password == password)
                .FirstOrDefault() != null;
        }

        public ICollection<Claim> GetClaimsForUser(string username)
        {
            var claims = new List<Claim>();            
            claims.Add(new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", username));            
            return claims;
        }
        
        public TokenDto TryToRegister(RegistrationRequestDto registrationRequestDto)
        {
            var profile = uow.Profiles.GetAll().Where(x => x.Username == registrationRequestDto.Username).FirstOrDefault();

            if (profile != null)
                throw new InvalidOperationException();

            uow.Profiles.Add(new Profile()
            {
                Username = registrationRequestDto.Username,
                Password = registrationRequestDto.Password
            });

            uow.SaveChanges();
            return null;
        }

        protected readonly ISlackUow uow;
    }
}