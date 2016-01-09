using Microsoft.Practices.Unity;
using Slack.Config;
using Slack.Config.Contracts;
using Slack.Data;
using Slack.Data.Contracts;
using Slack.Services;
using Slack.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Slack.Server
{
    public class UnityConfiguration
    {
        public static IUnityContainer GetContainer(bool useMock = false)
        {
            var container = new UnityContainer();
            container.RegisterType<IConfigurationProvider, ConfigurationProvider>();
            container.RegisterType<ISlackUow, SlackUow>();
            container.RegisterType<ISlackContext, SlackContext>();
            container.RegisterType<IIdentityService, IdentityService>();
            return container;
        }
    }
}