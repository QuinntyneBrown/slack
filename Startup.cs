using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Unity.WebApi;

[assembly: OwinStartup(typeof(Slack.Startup))]

namespace Slack
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(Slack.Server.UnityConfiguration.GetContainer());

            GlobalConfiguration.Configure(config => Slack.Server.ApiConfiguration.Install(config, app));
        }
    }
}