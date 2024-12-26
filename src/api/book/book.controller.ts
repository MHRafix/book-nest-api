import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { FilterBooksDto } from './dto/filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
@ApiTags('Book Module')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/create')
  create(@Body() payload: BookDto) {
    return this.bookService.create(payload);
  }

  @Get('/all-books')
  findAll(@Query() filter?: FilterBooksDto) {
    return this.bookService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBookDto) {
    return this.bookService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
