// Set up a collection for storing user information
const userData = new Discord.Collection();

client.on('message', message => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Split the message into individual words
  const args = message.content.split(/ +/);
  // Get the command from the first word of the message
  const command = args.shift().toLowerCase();

  // Check if the command is 'level'
  if (command === 'level') {
    // Initialize the user's data if it doesn't exist yet
    if (!userData.has(message.author.id)) {
      userData.set(message.author.id, { xp: 0, level: 1 });
    }

    // Get the user's data from the collection
    const userData = userData.get(message.author.id);
    // Calculate the next level's XP threshold
    const nextLevelXP = userData.level * 100;
    // Add 10 XP to the user's current XP
    userData.xp += 10;
    // If the user has reached the next level's XP threshold, increase their level
    if (userData.xp >= nextLevelXP) {
      userData.level++;
      message.reply(`Congratulations, you have reached level ${userData.level}!`);
    }

    // Save the user's data back to the collection
    userData.set(message.author.id, userData);
  }
});
