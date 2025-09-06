module.exports = ({
  env
}) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "aws-1-ap-southeast-1.pooler.supabase.com"),
      port: env.int("DATABASE_PORT", 6543),
      database: env("DATABASE_NAME", "postgres"),
      user: env("DATABASE_USERNAME", "postgres.uyebosoghilznktltdgu"),
      password: env("DATABASE_PASSWORD", "Stuntshield%24123."),
      ssl: {
        // ini kunci supaya tidak error self-signed
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});
