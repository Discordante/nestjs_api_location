import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { exceptionFilterProviders } from './config/errors/filters/exception.filter.providers';
import { LoggerConfigService } from './config/logger/logger.config';
import {
  RequestContextMiddleware,
  RequestContextModule,
  RequestLoggerInterceptor,
  RequestLoggerModule,
} from './config/logger/logging';
import { TypeOrmConfigService } from './config/typeorm/conn1/typeorm.config.service';
import { AutonomousRegionsModule } from './autonomous-regions/autonomous-regions.module';
import { ProvincesModule } from './provinces/provinces.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RequestContextModule,
    RequestLoggerModule.forRootAsync({
      useClass: LoggerConfigService,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AutonomousRegionsModule,
    ProvincesModule,
    MunicipalitiesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useExisting: RequestLoggerInterceptor,
    },
    ...exceptionFilterProviders,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
