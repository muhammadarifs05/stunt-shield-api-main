"use strict";

/**
 * favorite controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::favorite.favorite",
  ({ strapi }) => ({
    async recipe(ctx, next) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(null, [
          { messages: [{ id: "No authorization header was found" }] },
        ]);
      }

      const data = await strapi.entityService.findMany(
        "api::favorite.favorite",
        {
          filters: {
            user: {
              id: user.id,
            },
          },
          populate: {
            user: {
              fields: ["id", "email"],
            },
            recipes: {
              fields: ["id", "name", "age"],
              populate: {
                img: {
                  fields: ["url"],
                },
              },
            },
          },
        }
      );

      if (!data) {
        return ctx.notFound();
      }

      const sanitizedEvents = await this.sanitizeOutput(data, ctx);

      return this.transformResponse(sanitizedEvents);
    },
  })
);