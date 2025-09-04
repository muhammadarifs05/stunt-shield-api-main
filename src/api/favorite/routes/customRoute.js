module.exports = {
  routes: [
    {
      method: "GET",
      path: "/favorite-recipe",
      handler: "favorite.recipe",
      config: {
        policies: [],
      },
    },
  ],
};
