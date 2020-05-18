// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


module.exports = function (api) {  
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })
  api.createPages(async ({ graphql, createPage }) => {

    const { data } = await graphql(`query {      
      allQuestions (sortBy: "order", order: ASC) {
        edges {
          node{
            id
          }
        }
      }
      allThingsToDo {
        edges {
          node {
            id
          }
        }
      }
    }`);
    data.allQuestions.edges.forEach(({ node }) => {
      createPage({
        path: `/question/${node.id}`,
        component: './src/templates/Question.vue',
        context: {
          id: node.id
        }
      })
    }) ; 
    data.allThingsToDo.edges.forEach(({ node }) => {
      createPage({
        path: `/suggestion/${node.id}`,
        component: './src/templates/Suggestion.vue',
        context: {
          id: node.id
        }
      })
    }) ;
  })
}
