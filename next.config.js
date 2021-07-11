const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'client'),
      path.join(__dirname, 'common'),
      path.join(__dirname, 'pages')
    ],
  },
}