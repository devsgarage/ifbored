const querystring = require("querystring");
const KontentManagement = require('@kentico/kontent-management');
const {performance} = require('perf_hooks');

// SO: https://stackoverflow.com/a/8809472/13636490
function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

exports.handler = async function(event, context, callback) {
    //TODO: Only allow POST and OPTIONS verbs
    
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
        let newUUID = generateUUID();
        let result = await client.addContentItem()
            .withData(
                {
                    name: '[S] ' + suggestion.title,
                    codename: 's' + newUUID,
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
            },
            {
                element: {
                    codename: 'link_to_content'
                },
                value: suggestion.resource
            },
            {
                element: {
                    codename: 'suggested_tags_by_suggestor'
                },
                value: suggestion.tags
            }
        ]).toPromise();

        return {
            statusCode: 200,
            headers,
            body: 'hello garage community'
        };
    }
}