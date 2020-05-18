// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'ifBored',
  plugins: [{
    use: '@meeg/gridsome-source-kentico-kontent',
    options: {
      deliveryClientConfig: {
        projectId: process.env.KENTICO_KONTENT_PROJECT_ID
      }
    }
  }]
}
