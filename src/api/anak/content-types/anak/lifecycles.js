// 'use strict';

// module.exports = {
//   async beforeDelete(event) {
//     const {
//       where
//     } = event.params;

//     // Ambil semua anak yang akan dihapus, beserta data perkembangan mereka
//     const anakList = await strapi.entityService.findMany('api::anak.anak', {
//       where,
//       populate: ['perkembangans'],
//     });

//     // Loop untuk menghapus semua perkembangan terkait
//     for (const anak of anakList) {
//       const perkembanganIds = anak.perkembangans.map(p => p.id);
//       for (const id of perkembanganIds) {
//         await strapi.entityService.delete('api::perkembangan.perkembangan', id);
//       }
//     }
//   },
// };

'use strict';

module.exports = {
  async beforeDelete(event) {
    const {
      where
    } = event.params;

    // Pastikan hanya satu anak yang diambil berdasarkan ID
    if (!where || !where.id) return;

    // Ambil satu anak berdasarkan ID dan data perkembangan terkait
    const anak = await strapi.entityService.findOne('api::anak.anak', where.id, {
      populate: ['perkembangans'],
    });

    // Hapus semua perkembangan yang terkait hanya dengan anak ini
    if (anak && anak.perkembangans && anak.perkembangans.length > 0) {
      for (const perkembangan of anak.perkembangans) {
        await strapi.entityService.delete('api::perkembangan.perkembangan', perkembangan.id);
      }
    }
  },
};
