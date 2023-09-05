import { Controller, Get } from '@nestjs/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return 'Todo API';
  }
}
