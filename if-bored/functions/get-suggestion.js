const KontentDelivery = require('@kentico/kontent-delivery');

const deliveryClient = new KontentDelivery.DeliveryClient({
    projectId: process.env.KONTENT_PROJECT_ID
});

exports.handler = async function(event, context, callback) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
        };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers,
            body: ''
        }
    }

    if (event.httpMethod !== 'POST'){
        return {
            statusCode: 404,
            headers,
            body:''
        }
    }

    var questionAndAnswers = JSON.parse(event.body);
    var suggestion = await getSuggestion();
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(suggestion)
    }
}

async function getSuggestion() {
    const suggestionResult = await deliveryClient.items()
        .type('things_to_do')
        //.equalsFilter('elements.order', nextQuestionNumber)
        .toPromise();
    const suggestion = suggestionResult.items[0];
    
    return {
        answerId: suggestion.system.id,
        suggestionTitle: suggestion.title.value,
        suggestionDescription: suggestion.plain_description.value,
        suggestionLink: suggestion.link_to_content.value
    };
}