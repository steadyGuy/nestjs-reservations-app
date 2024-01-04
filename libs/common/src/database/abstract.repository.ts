import mongoose, { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    const doc = await createdDocument.save();
    return doc.toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne({
        ...filterQuery,
        _id: new mongoose.Types.ObjectId(filterQuery._id),
      })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn(`Document not found with filterQuery`, filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(
      {
        ...filterQuery,
        _id: new mongoose.Types.ObjectId(filterQuery._id),
      },
      update,
      {
        lean: true,
        new: true,
      },
    );
    if (!document) {
      this.logger.warn(`Document not found with filterQuery`, filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    const documents = await this.model.find(filterQuery, {}, { lean: true });
    return documents;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
