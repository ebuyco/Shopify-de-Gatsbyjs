/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = async({ graphql, action: { createPage }}) =>{
    const pages = await graphql(`
    
            query PagesQuery{
                allShopifyProduct{
                    edges {
                        node {
                            id
                            handle
                        }
                    }
                }
            }
    `)


    pages.data.allShopifyProduct.edges.forEach(( {node: {id, handle}}) => {
            createPage({
                path: `/product/${handle}`,
                component: path.resolve('./src/templates/ProductDetailTemplate.js'),
                context: {
                    id,
                    handle
                },
            })        
    })
}