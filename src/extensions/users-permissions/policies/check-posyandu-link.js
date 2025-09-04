'use strict';

// Policy untuk memastikan user POSYANDU sudah punya relasi ke data posyandu
module.exports = async (ctx, config, {
  strapi
}) => {
  const userId = ctx.state.user && ctx.state.user.id;
  if (!userId) return ctx.unauthorized('Unauthorized');

  const user = await strapi.entityService.findOne(
    'plugin::users-permissions.user',
    userId, {
      populate: ['role', 'posyandu'],
    }
  );

  // ⛔️ Jangan blokir user selain POSYANDU
  if (!user || !user.role) return ctx.forbidden('Role pengguna tidak ditemukan');

  // Cek hanya jika role-nya POSYANDU
  const roleType = user.role.type;
  if (user.role && user.role.type === 'posyandu' && !user.posyandu) {
    return ctx.forbidden('User POSYANDU belum memiliki relasi posyandu.');
  }

  return true;
};
