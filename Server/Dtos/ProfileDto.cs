using Slack.Models;

namespace Slack.Dtos
{
    public class ProfileDto
    {
        public ProfileDto(Profile profile)
        {
            this.Id = profile.Id;
            this.Username = profile.Username;
        }

        public int Id { get; set; }
        public string Username { get; set; }
    }
}