<template>
  <Layout>
    <div>
        <h1 v-html="$page.questions.name"/>
        <p v-html="$page.questions.question" />
        <input id="questionAnswer" placeholder="answer" v-model="formData.questionAnswer" />
        <button type="submit" v-on:click="handleSubmit">Submit answer</button>
    </div>    
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  questions(id: $id) {
    id
    order
    name      
    question
  }
}
</page-query>

<script>
import axios from 'axios'
function storeAnswer(answer, questionNumber){
  let value = localStorage.getItem('answers');
  let answers = {};
    console.log(value);
  if (value){
    answers = JSON.parse(value);
  }
  answers[questionNumber] = answer;
    console.log('answers');
    console.log(answers);
  localStorage.setItem('answers', JSON.stringify(answers));
}

export default {
    data() {
      return {
        formData: {}
      }
    },
    methods: {
      async handleSubmit(e) {                
        storeAnswer(this.formData.questionAnswer, this.$page.questions.order);
        let result = await axios.get(process.env.GRIDSOME_FUNCTIONS_URL + '/get-next-question-answer?questionNumber='+this.$page.questions.order);
        
        if (result.data.nextQuestionId) {
          this.$router.push('/question/' + result.data.nextQuestionId);        
        }
        else {
          let answers = localStorage.getItem('answers');
          result = await axios.post(process.env.GRIDSOME_FUNCTIONS_URL + '/get-suggestion/', answers)
          this.$router.push('/suggestion/' + result.data.answerId);
        }
        this.formData = {};
      }
    },
    watch: {
    }
}
</script>

<style>

</style>