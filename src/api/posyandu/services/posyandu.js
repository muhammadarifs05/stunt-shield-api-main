'use strict';

/**
 * posyandu service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::posyandu.posyandu');
