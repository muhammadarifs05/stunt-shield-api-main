'use strict';

/**
 * Policy: Hanya izinkan POSYANDU mengakses anak miliknya sendiri
 */

module.exports = async (ctx, config, {
  strapi
}) => {
  const {
    user
  } = ctx.state;
  const anakId = ctx.params.id;

  // Lewatkan jika bukan user POSYANDU
  if (!user || user.role.name !== 'posyandu') {
    return false;
  }

  // Ambil user POSYANDU lengkap dengan relasi posyandu
  const userWithPosyandu = await strapi.entityService.findOne(
    'plugin::users-permissions.user',
    user.id, {
      populate: ['posyandu']
    }
  );

  if (!userWithPosyandu.posyandu) return false;

  // Ambil data anak yang diminta
  const anak = await strapi.entityService.findOne('api::anak.anak', anakId, {
    populate: ['posyandu'],
  });

  // Bandingkan apakah anak ini milik posyandu user
  if (!anak || !anak.posyandu || anak.posyandu.id !== userWithPosyandu.posyandu.id) {
    return false;
  }

  return true;
};
