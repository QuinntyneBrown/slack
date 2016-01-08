using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Slack.Startup))]

namespace Slack
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}