/**
 * 1. 
 * 2. 
 * 3. 
 * 4. 
 */
const fs = require('fs');
/**
 * at first check if 
 * data directory exists
 * if not then create one
 */
exports.onPreBootstrap = ({reporter}) => {
    const contentPath = 'data';

    if (!fs.existsSync(contentPath)){
        reporter.info(`creating the ${contentPath} directory`);
        fs.mkdirSync(contentPath);
    }
}
/**
 * define event type
 * for graphql query 
 */
exports.sourceNodes = ({actions}) => {
    actions.createTypes(`
        type Event implements Node @dontInfer{
            id: ID!
            name: String!
            locaiton: String!
            startDate: Date! @dateformat @proxy(from: "start_date")
            endDate: Date! @dateformat @proxy(from: "end_date")
            url: String!
            slug: String!
        }
    `)
}
/**
 * Define resolver for any 
 * custom fields (slug)
 */
exports.createResolvers = ({createResolvers}) => {
    
    const basePath = '/';
    
    const slugify = str => {
        const slug = str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
    }
    
    createResolvers({
        Event: {
            slug: {
                resolve: source => slugify(source.name)
            }
        }
    })

}
/**
 * Query for event and
 * create pages
 */
exports.createPages = async({actions, graphql, reporter}) => {
    
    const basePath = '/';
    
    actions.createPage({
        path: basePath,
        component: require.resolve('./src/templates/events.js')
    });

    const result = await graphql(`
        query MyQuery {
            allEvent {
                nodes {
                    name
                    slug
                    url
                    startDate
                }
            }
        }
      
    `);

    if(result.errors){
        reporter.panic('error loading events', reporter.error);
        return;
    }
    const events = result.data.allEvent.nodes;

    events.forEach(event => {
        const slug = event.slug;
        
        actions.createPage({
            path: slug,
            component: require.resolve('./src/templates/event.js'),
            context: {
                eventID: event.id
            }
        });
        
    })

}