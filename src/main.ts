import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { logger, stream } from "./util";
import morgan = require('morgan')
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { NestExpressApplication } from "@nestjs/platform-express";




async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors()
  const whitelist = ['tempest.vn','shopgenshin.online','localhost'];
  const limiter = rateLimit({
    // 15 minutes
      windowMs: 15 * 60 * 1000,
    // limit each IP to 100 requests per windowMs
      max: 100
    });
    app.use(limiter);
  app.use(morgan('combined', { stream }))
  app.enableCors({
    origin: function (origin, callback) {
      if ( !origin || whitelist.some(url => origin.includes(url))  ) {
        console.log("allowed cors for:", origin)
        callback(null, true)
      } else {
        console.log("blocked cors for:", origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    // allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe,Authorization',
    methods: "GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS",
    credentials: true,
    });
    setupSecurity(app)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle("Tempest Genshin ")
    .setDescription("Tempest Genshin API description")
    .setVersion("1.0")
    .addTag("tempest-genshin")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();

function setupSecurity(app: NestExpressApplication) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'content-src': ["'self'", 'https:', 'data:'],
          'default-src': ["'self'"],
          'base-uri': ["'self'"],
          'block-all-mixed-content': [],
          'font-src': ["'self'", 'https:', 'data:'],
          'img-src': ["'self'", 'data:'],
          'object-src': ["'none'"],
          'script-src': ["'self'"],
          'script-src-attr': ["'none'"],
          'style-src': ["'self'", 'https:', "'unsafe-inline'"],
          'upgrade-insecure-requests': [],
          'frame-ancestors': ["'self'", 'https://www.tempest.vn'],
        },
      },
    }),
  )
}
