import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDto } from './dto/book.dto';
import { FilterBooksDto } from './dto/filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  /**
   * create book
   * @param payload BookDto
   * @returns
   */
  create(payload: BookDto) {
    return this.bookModel.create(payload);
  }

  /**
   * find book list
   * @returns
   */
  async findAll(filter: FilterBooksDto) {
    // destructure the filter
    const {
      genre,
      minPrice,
      maxPrice,
      sortBy = 'title',
      order = 'asc',
      page = 1,
      limit = 10,
    } = filter;

    // filter pipeline
    const pipeline: any[] = [];

    // filter push to pipeline
    if (genre) pipeline.push({ $match: { genre } });
    if (minPrice || maxPrice) {
      pipeline.push({
        $match: {
          price: {
            ...(minPrice ? { $gte: minPrice } : {}),
            ...(maxPrice ? { $lte: maxPrice } : {}),
          },
        },
      });
    }

    // sorting filter
    pipeline.push({ $sort: { [sortBy]: order === 'asc' ? 1 : -1 } });

    // pagination
    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // execute aggregation
    const books = await this.bookModel.aggregate(pipeline);
    const total = await this.bookModel.countDocuments();

    return {
      books,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * find single book
   * @param _id string
   * @returns
   */
  findOne(_id: string) {
    return this.bookModel.findOne({ _id });
  }

  /**
   * update book
   * @param _id string
   * @param payload UpdateBookDto
   * @returns
   */
  update(_id: string, payload: UpdateBookDto) {
    return this.bookModel.updateOne({ _id }, payload);
  }

  /**
   * delete a book
   * @param _id string
   * @returns
   */
  remove(_id: string) {
    return this.bookModel.findByIdAndDelete({ _id });
  }
}
