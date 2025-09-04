// 'use strict';

// /**
//  * posyandu controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::posyandu.posyandu');

'use strict';

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::posyandu.posyandu', ({
  strapi
}) => ({
  async createWithUser(ctx) {
    const {
      nama,
      alamat,
      email,
      username,
      password,
      desaId
    } = ctx.request.body;

    try {
      const posyanduRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({
          where: {
            type: 'posyandu'
          }
        });

      if (!posyanduRole) return ctx.badRequest('Role posyandu tidak ditemukan');

       // ✅ CEK EMAIL SUDAH TERDAFTAR ATAU BELUM
       const existingUser = await strapi
         .query('plugin::users-permissions.user')
         .findOne({
           where: {
             email
           }
         });

       if (existingUser) {
         return ctx.badRequest('Email sudah digunakan.');
       }

       const existingUsername = await strapi
         .query('plugin::users-permissions.user')
         .findOne({
           where: {
             username
           }
         });

       if (existingUsername) {
         return ctx.badRequest('Username sudah digunakan.');
       }

      // // Buat user baru TANPA relasi posyandu
      const newUser = await strapi
        .plugin('users-permissions')
        .service('user')
        .add({
          email,
          username,
          password,
          confirmed: true,
          blocked: false,
          role: posyanduRole.id,
        });

      // Buat posyandu dan relasikan ke user
      const newPosyandu = await strapi.entityService.create('api::posyandu.posyandu', {
        data: {
          nama,
          alamat,
          user: newUser.id,
          desa: desaId,
          publishedAt: new Date(),
        },
      });

      // Update user untuk menyisipkan relasi ke posyandu
      await strapi.entityService.update('plugin::users-permissions.user', newUser.id, {
        data: {
          posyandu: newPosyandu.id,
        },
      });

      const updatedUser = await strapi.entityService.findOne('plugin::users-permissions.user', newUser.id, {
        populate: ['posyandu'],
      });

      if (!updatedUser.posyandu) {
        return ctx.badRequest('Relasi posyandu gagal terbentuk.');
      }

      return ctx.send({
        message: 'Berhasil membuat posyandu dan user',
        data: newPosyandu,
      });

    } catch (err) {
      console.error(err);
      return ctx.internalServerError('Gagal membuat posyandu dan user');
    }
  },
}));