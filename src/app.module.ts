import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConnectionSerice } from './database-connection.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DataBaseConnectionSerice
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
