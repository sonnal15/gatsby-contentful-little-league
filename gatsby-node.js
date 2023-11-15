const { error } = import("console")
const path = require('path')
const slash = import('slash')

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions

  return graphql(
    `
    {
      allContentfulTeam{
        edges{
          node{
            slug
          }
        }
      }
    }
    `
  ).then((result) => {
    if(result.errors){
      console.log("Error with contentful data", result.errors)
    }

    const edges = result.data.allContentfulTeam.edges;
    const teamTemplate = path.resolve('./src/templates/team.js')

    if (!edges) {
      console.error('No edges found in the result.');
      return;
    }

    edges.forEach(team => {
      createPage({
        path:`/teams/${team.node.slug}/`,
        component: teamTemplate,
        context:{
          slug: team.node.slug,
        },
      })
      
    });

  }).catch(errors => console.log("Error with contentful data below",errors))
}

