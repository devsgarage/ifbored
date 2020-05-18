<template>
  <Layout>
    <div>
        <h1 v-html="$page.thingsToDo.title"/>
        <p v-html="$page.thingsToDo.description" />
        <a :href="$page.thingsToDo.linkToContent">{{ $page.thingsToDo.title }}</a>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  thingsToDo(id: $id) {
    title
    plainDescription
    description
    linkToContent
  }
}
</page-query>

<script>
export default {
}
</script>

<style>

</style>