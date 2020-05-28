const querystring = require("querystring");
const KontentManagement = require('@kentico/kontent-management');

exports.handler = async function(event, context, callback) {
    //TODO: Only allow POST and OPTIONS verbs
    /*
    if (event.httpMethod !== 'POST') {
        // To enable CORS
        return {
        statusCode: 200, // <-- Important!
        headers,
        body: 'This was not a POST request!'
        };
    }
    */
   const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers,
            body: ''
        }
    }

    if (event.httpMethod === 'POST') {
        let suggestion = JSON.parse(event.body);
        console.log(event);
        console.log(suggestion.title);

        const client = new KontentManagement.ManagementClient({
            projectId: process.env.KONTENT_PROJECT_ID, // id of your Kentico Kontent project
            apiKey: process.env.KONTENT_MANAGEMENT_KEY, // Content management API token
        });

        let result = await client.addContentItem()
            .withData(
                {
                    name: '[S] ' + suggestion.title,
                    codename: 's' + new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
                    type: {
                        codename: 'things_to_do' // codename of content type
                    }
                }
            )
        .toPromise();

        console.log(result);
        let id = result.data.id;
        
        result = await client.upsertLanguageVariant().byItemId(id).byLanguageCodename('default').withElements([
            {
                element: {
                    codename: 'title'
                },
                value: suggestion.title
            },
            {
                element: {
                    codename: 'plain_description'
                },
                value: suggestion.description
            }            ,
            {
                element: {
                    codename: 'link_to_content'
                },
                value: suggestion.resource
            }
        ]).toPromise();

        return {
            statusCode: 200,
            headers,
            body: 'hello garage community'
        };
    }
}