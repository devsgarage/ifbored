const faunadb = require('faunadb'), q = faunadb.query;  
var client = new faunadb.Client({ secret: process.env.FAUNA_DB_KEY });

exports.handler =async function(event, context, callback) {
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
        };
        console.log("HTTP Method: " + event.httpMethod)
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 204,
                headers,
                body: ''
            }
        }
        console.log("HTTP Method 2: " + event.httpMethod)
        if (event.httpMethod !== 'POST'){
            return {
                statusCode: 404,
                headers,
                body:''
            }
        }

        try{
            console.log("STEP 1")
            let surveyResults = JSON.parse(event.body);

            let a = await client.query(
                q.Create(
                    q.Collection('SurveyResults'),
                    { data: surveyResults },
                )
              );
        } catch(e) {

        }
        return {
            statusCode: 200,
            headers,
            body:''
        }

}