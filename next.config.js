const path = require('path');

module.exports = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:8080/api/:path*'
  //     }
  //   ]
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
