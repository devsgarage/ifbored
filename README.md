# If Bored Service

### Purpose 
Provide a suggestion service for people looking for something to do during a period of boredom, or inactivity

### Architectrure
:::image type="content" source="assets/ifBored.dev.png" alt-text="Architecture Diagram":::

**Service Providers**
- **CMS:** [Kentico Kontent](https://kontent.ai)
- **Datastore:** [FaunaDB]()
- **API:** [Netlify Functions]()
- **SMS/Voice:** [Twilio](https://twilio.com)
- **Website:** [Vue.js]() + [Gridsome]()
- **Web Host:** [Netlify](https://netlify.com)
- **Contiuous Integration:** [CircleCI](https://circleci.com)
- **Source Code Repo:** [GitHub](https://github.com)

### Things to do
- Learn Web Assembly

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
_Want to help? Suggest ideas by submitting a PR. Please include a title, link to content, your handle._
_Format: [{title}]({link to source}) - {suggested by}_

- [Learn Blazor Web Assembly](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) - @curiousdrive
- [Learn Vue.js]
- Learn Gridsome
- Learn React
- Learn Gatsby

