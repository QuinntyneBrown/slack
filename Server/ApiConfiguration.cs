using System.Web.Http;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using Owin;
using Slack.Auth;
using Microsoft.Practices.Unity;
using Microsoft.AspNet.SignalR;
using Slack.Config.Contracts;

namespace Slack.Server
{
    public class ApiConfiguration : Common.Web.ApiConfiguration
    {
        public new static void Install(HttpConfiguration config, IAppBuilder app)
        {
            config.SuppressHostPrincipal();

            Slack.Services.Contracts.IIdentityService identityService = UnityConfiguration.GetContainer().Resolve<Slack.Services.Contracts.IIdentityService>();

            Slack.Config.Contracts.IConfigurationProvider configurationProvider = UnityConfiguration.GetContainer().Resolve<IConfigurationProvider>();

            app.UseOAuthAuthorizationServer(new OAuthOptions(identityService));

            app.UseJwtBearerAuthentication(new Slack.Auth.JwtOptions(configurationProvider));

            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            app.UseCors(CorsOptions.AllowAll);

            app.MapSignalR();

            var jSettings = new JsonSerializerSettings();

            jSettings.ContractResolver = new SignalRContractResolver();

            jSettings.Formatting = Formatting.Indented;

            var serializer = JsonSerializer.Create(jSettings);

            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => serializer);

            config.Formatters.Remove(config.Formatters.XmlFormatter);

            config.Formatters.JsonFormatter.SerializerSettings = jSettings;

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );
        }
    }
}