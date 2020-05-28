const KontentDelivery = require('@kentico/kontent-delivery');

const deliveryClient = new KontentDelivery.DeliveryClient({
    projectId: process.env.KONTENT_PROJECT_ID
});

exports.handler= async function(event, context, callback) {
    const headers = {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Headers': 'Content-Type',
     'Access-Control-Allow-Methods': 'GET, OPTIONS',
     'Content-Type': 'application/json'
     };
 
     if (event.httpMethod === 'OPTIONS') {
         return {
             statusCode: 204,
             headers,
             body: ''
         }
     }

     if (event.httpMethod !== 'GET'){
         return {
             statusCode: 404,
             headers,
             body:''
         }
     }
    let nextQuestion = await getNextQuestion(parseInt(event.queryStringParameters.questionNumber)); 
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(nextQuestion)
    };
}

async function getNextQuestion(lastQuestionId) {
    const nextQuestionNumber = lastQuestionId + 1;
    const response = await deliveryClient.items()
        .type('questions')
        .equalsFilter('elements.order', nextQuestionNumber)
        .toPromise();
    const returnValue = (response.isEmpty ? undefined : response.items[0].system.id);
    return { nextQuestionId: returnValue, nextQuestionNumber };
}