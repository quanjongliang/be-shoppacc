import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      // host: process.env["POSTGRES_HOST"] || "localhost",
      // port: parseInt(process.env["POSTGRES_PORT"] || "5432", 10),
      // username: process.env["POSTGRES_USER"] || "postgres",
      // password: process.env["POSTGRES_PASSWORD"] || "postgres",
      // database: process.env["POSTGRES_DB"] || "acc",
      host: process.env["POSTGRES_HOST"] || "db-postgresql-sgp1-26012-do-user-11469090-0.b.db.ondigitalocean.com",
      port: parseInt(process.env["POSTGRES_PORT"] || "25060", 10),
      username: process.env["POSTGRES_USER"] || "doadmin",
      password: process.env["POSTGRES_PASSWORD"] || "AVNS_iJkMaPG3cQTcceBSgsI",
      database: process.env["POSTGRES_DB"] || "defaultdb",
      ssl:{require},
      // url: process.env.DATABASE_URL,
      // ssl: { rejectUnauthorized: false },
      synchronize: !!JSON.parse(process.env["TYPEORM_SYNCHRONIZE"] || "true"),
      entities: [__dirname + "/dist/**/*.entity.js"],
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
