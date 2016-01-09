using Microsoft.Owin.Security.Jwt;
using Slack.Config;
using Slack.Config.Contracts;

namespace Slack.Auth
{
    public class JwtOptions : JwtBearerAuthenticationOptions
    {
        public JwtOptions(IConfigurationProvider configurationProvider)
        {
            var config = AppConfiguration.Config;

            AllowedAudiences = new[] { config.JwtAudience };
            IssuerSecurityTokenProviders = new[] 
            {
                new SymmetricKeyIssuerSecurityTokenProvider(config.JwtIssuer, config.JwtKey)
            };
        }
    }
}