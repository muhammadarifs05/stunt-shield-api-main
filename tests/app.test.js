const fs = require("fs");
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

it("Strapi is defined", () => {
  expect(strapi).toBeDefined();
});
