using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc5;
using Slack.Data.Contracts;
using Slack.Data;

namespace Slack
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            container.RegisterType<ISlackUow, SlackUow>();
            container.RegisterType<ISlackContext, SlackContext>();            
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}