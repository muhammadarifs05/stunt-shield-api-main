module.exports = {
  routes: [{
    method: 'POST',
    path: '/posyandus/create-with-user',
    handler: 'posyandu.createWithUser',
    config: {
      policies: [],
      auth: false // atau true jika hanya admin yang boleh akses
    },
  }, ],
};
