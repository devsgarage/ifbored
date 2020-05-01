const MessagingResponse = require('twilio').twiml.MessagingResponse;
const KontentDelivery = require('@kentico/kontent-delivery');
const { urlencoded } = require('body-parser');
const querystring = require("querystring");
const faunadb = require('faunadb'), q = faunadb.query;  
var client = new faunadb.Client({ secret: process.env.FAUNA_DB_KEY });
const deliveryClient = new KontentDelivery.DeliveryClient({
    projectId: '2b50092a-f839-0060-b2a5-928d55e08e1b',
    typeResolvers: [
        new KontentDelivery.TypeResolver('movie', () => new Movie()),
    ]
});

class Questions extends KontentDelivery.ContentItem {
    constructor() {
        super();
    }
}

class Conversation {
    constructor(ref, number, questions, suggestions) {
        this.ref = ref
        this.number = number;
        this.questions = questions || [];
        this.suggestions = suggestions || [];
    }
}

getQuestionAnswers = async function (phonenumber) {    
    /** Get conversation from database (FaunaDB) */
    /** Determine if a question was asked */      
    let conversation;

    try {
        let result = await client.query(
            q.Get(
            q.Match(q.Index('PhoneNumber'), phonenumber)
            )
        );
        conversation = new Conversation(result.ref, result.data.number, result.data.questions, result.data.suggestions);
    }
    catch(exception) {
        console.log(exception)
        conversation = new Conversation(undefined, phonenumber, undefined);
    }
    return conversation;
}

updateDocument = async function (conversation) {  

    if (conversation.ref){
        let b = await client.query(
            q.Update(
                conversation.ref,
                { data: { questions: conversation.questions, suggestions: conversation.suggestions } },
            )
        );
    } else {
        let a = await client.query(
            q.Create(
                q.Collection('BoredPeople'),
                { data: { number: conversation.number, questions: conversation.questions, suggestions: conversation.suggestions } },
            )
          );
    }
}

exports.handler = async function(event, context) {       
    const twilioData = querystring.parse(event.body);
    
    let qAndA = await getQuestionAnswers(twilioData.From);  

    /** if question was asked store result */
    let didUpdate = false;
    let lastQuestionId = 0;
    qAndA.questions.filter((value) => value.questionId !== undefined & value.questionAnswer === undefined
    ).forEach((value)=> { value.questionAnswer = twilioData.Body; didUpdate = true; lastQuestionId = value.questionId; });    

    /** Update FaunaDB Document */
    if (didUpdate) {
        await updateDocument(qAndA);
    }

    /** Get next question */
    /** Getting items from Kentico Kontent as Promise */
    const { question, nextQuestionNumber } = await getnextQuestion(lastQuestionId);
        
    const twiml = new MessagingResponse();
    if (question){
        qAndA.questions.push({questionId:nextQuestionNumber, questionAnswer: undefined});    
        twiml.message(question);
    }
    else {
        const suggestion = await getSuggestion(qAndA);        
        const messageText = formatSMSMessage(suggestion);            
        twiml.message(messageText);
    }

    /**if we get a next question, log it, otherwise get result */
    
    await updateDocument(qAndA);
    return {
        statusCode: 200,
        "headers": {"Content-Type": "text/xml"},
        body: twiml.toString()
    };
}

async function getSuggestion(qAndA) {
    const suggestionResult = await deliveryClient.items()
        .type('things_to_do')
        //.equalsFilter('elements.order', nextQuestionNumber)
        .toPromise();
    const suggestion = suggestionResult.items[0];
    qAndA.suggestions.push({
    answerId: '1',
        suggestionTitle: suggestion.title.value,
        suggestionDescription: suggestion.plain_description.value,
        suggestionLink: suggestion.link_to_content.value
    });
    return suggestion;
}

function formatSMSMessage(suggestion) {
    return `We think you should look at ${suggestion.title.value}.
${suggestion.plain_description.value} 
${suggestion.link_to_content.value}`;
}

async function getnextQuestion(lastQuestionId) {
    const nextQuestionNumber = lastQuestionId + 1;
    const response = await deliveryClient.items()
        .type('questions')
        .equalsFilter('elements.order', nextQuestionNumber)
        .toPromise();
    const returnValue = (response.isEmpty ? undefined : response.items[0].question.value);
    return { question: returnValue, nextQuestionNumber };
}
