module.exports = ( {contentPath = './data', basePath = '/'} ) => ({
    plugins: [
        `gatsby-plugin-theme-ui`,
        {
            resolve: `gatsby-transformer-yaml`,
            options: {
                typeName: `Event`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: contentPath,
            },
        },
    ],
});
