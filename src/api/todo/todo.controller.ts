import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Body,
  Put,
  Query,
  Delete,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // Create a todo
  @Post('/')
  async create(@Res() res, @Body() createTodoDTO: CreateTodoDTO) {
    const newTodo = await this.todoService.createTodo(createTodoDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been submitted successfully!',
      todo: newTodo,
    });
  }

  // Fetch a particular todo using ID
  @Get('/:id')
  async getTodo(@Res() res, @Param('id') todoID) {
    const todo = await this.todoService.findOne(todoID);
    if (!todo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json(todo);
  }

  // Fetch all todos
  @Get('/')
  async getTodos(@Res() res) {
    const todos = await this.todoService.findAll();
    return res.status(HttpStatus.OK).json(todos);
  }

  // Edit a particular todo using ID
  @Put('/:id')
  async editTodo(
    @Res() res,
    @Param('id') id: number,
    @Body() todo: UpdateTodoDTO,
  ) {
    const editedTodo = await this.todoService.update(id, todo);
    if (!editedTodo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated',
      todo: editedTodo,
    });
  }

  //Delete a todo using ID
  @Delete(':id')
  async deleteTodo(@Res() res, @Param('id') id: number) {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo does not exist!');
    }

    await this.todoService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been deleted!',
      todo: todo,
    });
  }
}
