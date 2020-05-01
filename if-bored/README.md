# If Bored Service

## Phase 1
### Kentico Kontent
TBA

### Netlify Functions

#### prerequisites:
- [Netlify CLI](https://cli.netlify.com/)
`npm install netlify-cli -g`

- [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart)
`npm install twilio-cli -g`

#### Start up the environment
In separate, command-line windows run the following commands to start up the development environment.

Window 1 - Netlify CLI
`netlify dev -c "npm run develop" -f functions\`

Window 2 - Twilio CLI
`twilio phone-numbers:update "<twilio_phone_number>" --sms-url="http://localhost:34567/question"`

## Phase 2

This is the project you get when you run `gridsome create new-project`.

### 1. Install Gridsome CLI tool if you don't have

`npm install --global @gridsome/cli`

### 2. Create a Gridsome project

1. `gridsome create my-gridsome-site` to install default starter
2. `cd my-gridsome-site` to open the folder
3. `gridsome develop` to start a local dev server at `http://localhost:8080`
4. Happy coding 🎉🙌
