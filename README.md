# telegram-bot-nodejs-azure-function-starter

Yes, that's really what it is. A Telegram bot using Node.js hosted as an Azure Function App. 

The stack that's used by this starter: 
- [telegraf.js](https://telegraf.js.org/) - Node.js Telegram bot
- Typescript - type safety
- [Azure Function App](https://docs.microsoft.com/en-us/azure/azure-functions/) - as a host for your bot
- [Github Actions](https://github.com/features/actions) - building and deploying to Azure

This started provides a mode for developing your bot on your local machine as well as a mode for running in production. The difference is that the production mode works using a Telegram webhook while the development mode uses the default Telegram pulling mechanism. This way there's no hassle using tunneling software like ngrok. 

# Setting up Azure Function App
## Step 1: Create an Azure Function App
<img src="/docs/create-function-app.jpg" alt="Create Azure Function App" align="right" width="400" />

First step is creating a Node.js Azure Function App. You can run through the default setup with all the settings you like. The only thing I advice is running it on __Windows__ OS. This might seem unnecessary but I found Windows Azure Function Apps to run Timer triggers more consistent than on a Linux OS. 

When asked for a plan type, select __Consumption (Serverless)__. By default Apps running on a Consumption plan will timeout after a maximum 10 minutes of inactivity, but we will use a Timer trigger Function App to fix that. More about that later. 

<img src="/docs/publish-profile.jpg" alt="Download publish profile" align="right" width="400" />

After creating your Node.js Azure Function App, go to the Function App resource and download the __publish profile__. We will need that later. 


