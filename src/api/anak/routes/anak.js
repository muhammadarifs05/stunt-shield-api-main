'use strict';

/**
 * anak router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::anak.anak');

// 'use strict';

// module.exports = {
//   routes: [{
//       method: 'POST',
//       path: '/anaks',
//       handler: 'api::anak.anak.create',
//       config: {
//         policies: [],
//         middlewares: [],
//       },
//     },
//     {
//       method: 'GET',
//       path: '/anaks',
//       handler: 'api::anak.anak.find',
//       config: {
//         policies: [],
//         middlewares: [],
//       },
//     },
//   ],
// };
