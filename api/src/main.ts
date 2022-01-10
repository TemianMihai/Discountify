import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        "http://localhost:8080",
        "http://localhost:3000",
      ],
      credentials: true
    }
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
}

// eslint-disable-next-line no-void
void bootstrap();
