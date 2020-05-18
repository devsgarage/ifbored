<template>
  <Layout>
    <div>
        <h1 v-html="$page.questions.name"/>
        <p v-html="$page.questions.question" />
        <input id="questionAnswer" placeholder="answer" v-model="formData.questionAnswer" />
        <button type="submit">Submit answer</button>
    </div>    
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  questions(id: $id) {
    name      
    question
  }
}
</page-query>

<script>
export default {
    data() {
      return {
        formData: {}
      }
    },
    methods: {
      handleSubmit(e) {
        
      }
    },
    watch: {
      formData: {
        handler() {
          localStorage.setItem('question', this.formData.questionAnswer);
          console.log("handler fired");
        },
        deep: true,
      }
    }
}
</script>

<style>

</style>