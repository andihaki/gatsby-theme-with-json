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
exports.onPreBootstrap = ({reporter}, options) => {
    const contentPath = options.contentPath || 'data';

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
            location: String!
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
exports.createResolvers = ({createResolvers}, options) => {
    
    const basePath = options.basePath || '/';
    
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
 * create single event pages and llist page
 */
exports.createPages = async({actions, graphql, reporter}, options) => {
    
    const basePath = options.basePath || '/';
    
    actions.createPage({
        path: basePath,
        component: require.resolve('./src/templates/events.js')
    });

    const result = await graphql(`
        query MyQuery {
            allEvent(sort: {fields: startDate, order: ASC}) {
                nodes {
                    id
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