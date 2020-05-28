<template>
  <Layout>

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="~/future_logo.png" width="135" />

    <h1>Welcome</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
    </p>

    <p class="action-links">
      <g-link :to="`/question/${$page.allQuestions.edges[0].node.id}`">Let's get started</g-link>
      <g-link to="/make-a-suggestion">Make a suggestion</g-link>
    </p>
    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>

  </Layout>
</template>

<page-query>
query {
  allQuestions(filter: { order: { eq: 1 }}, limit: 1) {
      edges{
        node{
          id
        }
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Welcome'
  },
  created: function () {
    localStorage.removeItem('answers');
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}

.action-links a {
  margin-right: 1rem;
}
</style>
