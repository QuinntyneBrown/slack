using Slack.Data.Contracts;
using Slack.Models;
using System.Data.Entity;

namespace Slack.Data
{
    public class SlackContext : Common.Data.BaseDbContext, ISlackContext
    {
        public SlackContext()
            : base("slackContext") { }

        public DbSet<Profile> Profiles { get; set; }

        public DbSet<Conversation> Conversations { get; set; }

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Profile>().
            HasMany(u => u.Conversations).
            WithMany(r => r.Profiles).
            Map(
                m =>
                {
                    m.MapLeftKey("Profile_Id");
                    m.MapRightKey("Conversation_Id");
                    m.ToTable("ProfileConversations");
                });
        }
    }
}