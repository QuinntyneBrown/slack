using System;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Owin;
using Owin;
using Unity.WebApi;
using Slack.Server;

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