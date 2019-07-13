module.exports = {
    plugins: [
        {
            resolve: `gatsby-transformer-yaml`,
            options: {
                typeName: `Event`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./data`,
            },
        },
    ],
};
