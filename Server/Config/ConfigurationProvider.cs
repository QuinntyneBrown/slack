using Slack.Config.Contracts;
using System;

namespace Slack.Config
{
    public class ConfigurationProvider : IConfigurationProvider
    {
        public T Get<T>() where T : class
        {
            if (typeof(T) == typeof(IAppConfiguration))
                return AppConfiguration.Config as T;

            throw new InvalidOperationException();
        }
    }
}