import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { FilterBooksDto } from './dto/filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
@ApiTags('Book Module')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiBearerAuth()
  @ApiOperation({ description: 'Create books' })
  @UseGuards(AuthGuard())
  @Post('/create')
  create(@Body() payload: BookDto) {
    return this.bookService.create(payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'All books' })
  @UseGuards(AuthGuard())
  @Get('/all-books')
  findAll(@Query() filter?: FilterBooksDto) {
    return this.bookService.findAll(filter);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Specific user books' })
  @UseGuards(AuthGuard())
  @Get('/my-books/:id')
  findMyBooks(@Param('id') id: string) {
    return this.bookService.findBooksByUserId(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get popular authors based on user interaction',
  })
  @UseGuards(AuthGuard())
  @Get('/popular-authors')
  async findMostPopularAuthors() {
    return this.bookService.findMostPopularAuthors();
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Find single book' })
  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Average price of specific genre' })
  @UseGuards(AuthGuard())
  @Get('average-price/:genre')
  async getAveragePriceByGenre(@Param('genre') genre: string) {
    return this.bookService.getAveragePriceByGenre(genre);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Update book' })
  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBookDto) {
    return this.bookService.update(id, payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Save user interaction' })
  @UseGuards(AuthGuard())
  @Patch('update-views/:id')
  updateViews(@Param('id') id: string) {
    return this.bookService.updateViews(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete book' })
  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
