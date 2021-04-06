# telegram-bot-nodejs-azure-function-starter

Yes, that's really what it is. A Telegram bot using Node.js hosted as an Azure Function App. 

The stack that's used by this starter: 
- [telegraf.js](https://telegraf.js.org/) - Node.js Telegram bot
- Typescript - type safety
- [Azure Function App](https://docs.microsoft.com/en-us/azure/azure-functions/) - as a host for your bot
- [Github Actions](https://github.com/features/actions) - building and deploying to Azure

This started provides a mode for developing your bot on your local machine as well as a mode for running in production. The difference is that the production mode works using a Telegram webhook while the development mode uses the default Telegram pulling mechanism. This way there's no hassle using tunneling software like ngrok. 

# Setting up the bot
## Step 1: Preparing the code
Let's start easy, fork/clone this repository. This repo provides all code to create a bot that only knows a `Hello Word` command. Good enough to start with! 

In the root of this repository you see a `.env.example` file. Rename this file to `.env`. This is where your secret Telegram bot token will be stored on your local machine. For now leave the value as is, we will replace it with the real value later on. 

## Step 2: Create an Azure Function App
<img src="/docs/create-function-app.jpg" alt="Create Azure Function App" align="right" width="400" />

First step is creating a Node.js Azure Function App. You can run through the default setup with all the settings you like. The only thing I advice is running it on __Windows__ OS. This might seem unnecessary but I found Windows Azure Function Apps to run Timer triggers more consistent than on a Linux OS. 

When asked for a plan type, select __Consumption (Serverless)__. By default Apps running on a Consumption plan will timeout after a maximum 10 minutes of inactivity, but we will use a Timer trigger Function App to fix that. More about that later. 

<img src="/docs/publish-profile.jpg" alt="Download publish profile" align="right" width="400" />

After creating your Node.js Azure Function App, go to the Function App resource and download the __publish profile__. We will need that later when configuring our automatic deployment.

Next thing we will have to configure is our `AzureWebJobsStorage` connection string. While creating your Azure Function App, you also had to configure a __Storage account__. Navigate to that storage account in the Azure portal. Next go to the __Access keys__ menu item, click __Show keys__ and copy either one of the Connection strings. Now paste that connection string in the `AzureWebJobsStorage` field in `local.settings.json`. 

## Step 3: Registering the bot
In order to register your Telegram bot you need to talk to the [BotFather](https://core.telegram.org/bots#6-botfather) on Telegram. 

<img src="/docs/botfather.jpg" alt="BotFather" align="center" width="600" />

By typing `/newbot` your new bot will be registered. The __name__ that you enter is displayed in contact details and elsewhere. The __Username__ as a short name, to be used in mentions an t.me links. This name __must__ end in 'bot', e.g. 'tetris_bot' or 'TetrisBot'.

When done registering the bot you'll get a token to access the HTTP API. 

<img src="/docs/botfather-done.jpg" alt="BotFather" align="center" width="600" />

This access token is what should be placed as a value of the `BOT_TOKEN` key in your `.env` file in the root of this project. 

The bot is now almost ready!

## Step 4: Deployment 
Within the project I used a GitHub Action to build and deploy the code to the Azure Function App. In order to run it properly we need to adjust 2 settings.

1. In `.github/workflows/main.yml` we need to set the `AZURE_FUNCTIONAPP_NAME` variable. This should be the name of your __Azure Function App__.
2. On GitHub go to your repository Settings page, and navigate to the Secrets tab: 
    <img src="/docs/github-actions-secrets.jpg" alt="GitHub Secrets" align="center" />
    Over here test


