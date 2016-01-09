using Microsoft.Owin.Security.OAuth;
using Slack.Services.Contracts;
using System.Security.Claims;
using System.Threading.Tasks;
using System;

namespace Slack.Auth
{
    public class OAuthProvider : OAuthAuthorizationServerProvider
    {
        public OAuthProvider(IIdentityService identityService)
        {
            this.identityService = identityService;
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity("slackish");

            var username = context.OwinContext.Get<string>("slackish:username");

            foreach (var claim in this.identityService.GetClaimsForUser(username))
            {
                identity.AddClaim(claim);
            }

            context.Validated(identity);
            return Task.FromResult(0);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            try
            {
                var username = context.Parameters["username"];
                var password = context.Parameters["password"];

                if (identityService.AuthenticateUser(username, password))
                {
                    context.OwinContext.Set("slackish:username", username);
                    context.Validated();
                }
                else
                {
                    context.SetError("Invalid credentials");
                    context.Rejected();
                }
            }
            catch(Exception exception)
            {
                context.SetError("Server error");
                context.Rejected();
            }
            return Task.FromResult(0);
        }

        protected IIdentityService identityService { get; set; }
    }
}
