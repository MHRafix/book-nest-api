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
  create(payload: [BookDto]) {
    return this.bookModel.insertMany(payload);
  }

  /**
   * find book list
   * @returns
   */
  async findAll(filter: FilterBooksDto) {
    // destructure the filter
    const {
      genre,
      publicationDate,
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
    if (genre) pipeline.push({ $match: { genre } }); // filter by genre

    // filter by price range
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

    // get the current date
    const endPublicationDate = new Date(publicationDate);

    // qdd one day to the current date
    endPublicationDate.setDate(endPublicationDate.getDate() + 1);

    // filter by publication date
    if (publicationDate) {
      pipeline.push({
        $match: {
          createdAt: {
            $gte: new Date(publicationDate),
            $lte: endPublicationDate,
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

    // get total books count
    const totalCount = await this.bookModel.countDocuments();

    // get total results count
    const totalResult = books.length;

    return {
      books,
      page,
      limit,
      totalResult,
      totalCount,
      totalPages: Math.ceil(totalResult / limit),
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
   * calculate average price in specific genre
   * @param genre string
   * @returns
   */
  async getAveragePriceByGenre(genre: string): Promise<any> {
    const booksByGenre = await this.bookModel.find({ genre }).countDocuments();

    const result = await this.bookModel.aggregate([
      { $match: { genre } },
      {
        $group: {
          _id: '$genre',
          averagePrice: { $avg: '$price' },
        },
      },
    ]);

    return { ...result[0], totalBooks: booksByGenre };
  }

  /**
   * find most popular author based on interactions
   * @returns
   */
  async findMostPopularAuthors(): Promise<any> {
    return this.bookModel.aggregate([
      {
        $group: {
          _id: '$author',
          views: { $sum: '$views' },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 6 },
    ]);
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
   * update views - add 1 with existing views amount
   * @param _id string
   * @returns
   */
  updateViews(_id: string) {
    return this.bookModel.updateMany({ _id }, { $inc: { views: 1 } });
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
