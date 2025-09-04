'use strict';

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::anak.anak', ({
  strapi
}) => ({
  async find(ctx) {
    const {
      user
    } = ctx.state;

    if (user && user.role && user.role.name === 'posyandu') {
      const userWithPosyandu = await strapi.entityService.findOne(
        'plugin::users-permissions.user',
        user.id, {
          populate: ['posyandu']
        }
      );

      let posyanduId = null;

      if (
        userWithPosyandu &&
        userWithPosyandu.posyandu &&
        userWithPosyandu.posyandu.id
      ) {
        posyanduId = userWithPosyandu.posyandu.id;
      } else {
        return ctx.badRequest('User tidak memiliki posyandu.');
      }

      ctx.query = {
        ...ctx.query,
        filters: {
          ...ctx.query.filters,
          posyandu: posyanduId,
        },
        populate: '*',
      };
    }

    return await super.find(ctx);
  },

  async create(ctx) {
    const {
      user
    } = ctx.state;

    if (user && user.role && user.role.name === 'posyandu') {
      const userWithPosyandu = await strapi.entityService.findOne(
        'plugin::users-permissions.user',
        user.id, {
          populate: ['posyandu']
        }
      );

      if (
        !userWithPosyandu ||
        !userWithPosyandu.posyandu ||
        !userWithPosyandu.posyandu.id
      ) {
        return ctx.badRequest('User tidak memiliki posyandu.');
      }

      // const posyanduId = userWithPosyandu.posyandu.id;

      // // Set data anak agar langsung dikaitkan dengan posyandu user
      //   if (
      //     !ctx.request.body.data.posyandu ||
      //     typeof ctx.request.body.data.posyandu !== 'object' ||
      //     !ctx.request.body.data.posyandu.connect
      //   ) {
      //     ctx.request.body.data.posyandu = {
      //       connect: [posyanduId]
      //     };
      }

      return await super.create(ctx);
    }
  }
));