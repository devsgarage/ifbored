<template>
    <Layout>
        <h1>Developer Survey</h1>
        <p>Please fill out the survey to help train our recommendation engine to provide awesome suggestions for people to explore and learn! :)</p>
        <h2 v-html="thankYouText"></h2>
        <form @submit.prevent="formSubmit">            
            <div class="inputGroup" v-for="(node, index) in $page.survey.surveyQuestions_2" :key="node.id">
                <label v-html="node.questionToAsk"></label>
                <input :placeholder="node.placeholderText" v-model="survey['answer'+(index+1)]" />
            </div>
            <button class="surveyButton" type="submit">Submit Answers</button>
        </form>
    </Layout>
</template>

<page-query>
query {
  survey (id: "241e9840-8e31-44a0-b289-2f9c9860c9b6") {
          id,
          surveyQuestions_2 {
            id,
            questionToAsk,
            placeholderText
          }
        }
       
  }
</page-query>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            survey: {},
            thankYouText: ""
        }
    },
    created() {
        if(this.$page){
            this.$page.survey.surveyQuestions_2.forEach((node, index) => {
                this.survey['questionId'+(index+1)] = node.id;
                this.survey['questionText'+(index+1)] = node.questionToAsk;
            })
        }
    },
    methods: {
        async formSubmit(e) {            
            let surveyResults = Object.assign({}, this.survey);
            console.log(surveyResults);
            try{
                //let result = await axios.post(process.env.GRIDSOME_FUNCTIONS_URL +'/submit-survey/', surveyResults );
                this.thankYouText = "Thank you for your taking the time to complete the survey!";
                this.survey = {};
            } catch(error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>
.inputGroup{
    display: block;
    margin-left: .5rem;
    margin-bottom: 1rem;
}

.inputGroup label {
    font-size: .75rem;
    font-weight: bold;
    display: block;
}

.inputGroup input {
    width: 23.5rem;
}

.inputGroup textarea {
    width: 23.5rem;
}

.surveyButton {    
    display: block;
    margin-left: .5rem;
    margin-bottom: 1rem;
}
</style>