import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
// import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  imports: [
    TodosModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        stream: pino.destination({
          dest: './hello-nest.log', // omit for stdout
          minLength: 4096, // Buffer before writing
          sync: false, // Asynchronous logging
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }
export class AppModule {}
