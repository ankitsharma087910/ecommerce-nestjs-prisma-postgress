import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prismaORM/prisma.module';
import { validateConfig } from './utils/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      envFilePath: ['.env'],
      // to validate the env file
      validate: validateConfig,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
