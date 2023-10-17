## Escalator

A Discord bot that provides a method for anonymous concern escalation, doubles as a suggestion box.

### About

It's designed to provide users a way to escalate issues to Dünhold's leadership team.

### Usage

To use the bot, follow these steps:

1. Obtain a Discord Bot Token:
   Visit Discord Developer Portal and create a new application. Then, set up a bot user and obtain the token. Save this to a notepad temporarily.

2. (Optional) Obtain your Discord server's server ID:
   Enable Discord Developer Mode, navigate to your Discord server, right-click the server icon, select "Copy Server ID". Save this to a notepad temporarily.

3. Docker Compose:
   Use the provided Docker Compose file to easily set up and run the bot in a Docker container.

4. Invite the bot to your server:
   Replace CLIENT_ID with your application's Client ID in the link below, the browse to it.
   https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=2048&scope=bot

```
version: '3'
services:
  escalator:
    container_name: escalator
    image: pingupox/escalator:latest
    environment:
      # Optional guild ID for local command registration, typically only used for development
      - GUILD_ID=
      # All of the IDs for the roles
      - IRONGUARD=
      - RAMHEART=
      - RUNEFORGE=
      - MATRIARCH=
      # All the IDs of the users
      - IRONGUARD_COMMERCIAL=
      - IRONGUARD_LOGISTICAL=
      - IRONGUARD_MARTIAL=
      - RAMHEART_COMMERCIAL=
      - RAMHEART_LOGISTICAL=
      - RAMHEART_MARTIAL=
      - RUNEFORGE_COMMERCIAL=
      - RUNEFORGE_LOGISTICAL=
      - RUNEFORGE_MARTIAL=
      # Bot token, obtained from https://discord.com/developers when creating a bot user
      - TOKEN=
    restart: always
```

Run the bot using `docker-compose up -d`. I suggest setting up your system to auto-launch the bot so it can be left unattended. Optionally use Watchtower to have Escalator update automatically when a new image is pushed to the Docker hub, or simply restart the Docker container every now and then to get updates.

## Contributing

Feel free to contribute by creating issues or submitting pull requests. Follow the guidelines in CONTRIBUTING.md for more details.

## License

This project is licensed under the MIT License.
