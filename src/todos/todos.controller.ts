import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todos.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly TodosService: TodosService) {}

  @Get()
  getAll(): Todo[] {
    return this.TodosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') TodoId: number): Todo {
    // console.log(TodoId);
    // console.log(this.TodosService.getOne(TodoId));
    return this.TodosService.getOne(TodoId);
  }

  @Post()
  create(@Body() TodoData: CreateTodoDto) {
    console.log('Controller_post');
    return this.TodosService.create(TodoData);
  }

  @Delete(':id')
  remove(@Param('id') TodoId: number) {
    return this.TodosService.deleteOne(TodoId);
  }

  @Patch(':id')
  patch(@Param('id') TodoId: number, @Body() updateData: UpdateTodoDto) {
    return this.TodosService.update(TodoId, updateData);
  }
}
