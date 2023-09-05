import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductSchema, Category } from './schemas/product.schema';
import { User } from '../auth/schemas/user.schemas';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async searchByCategory(category: string): Promise<Product[]> {
    try {
      const filteredProducts = await this.productModel
        .find({ category })
        .exec();
      if (filteredProducts.length == 0) {
        throw new Error();
      }
      return filteredProducts;
    } catch (error) {
      throw new NotFoundException(
        'the category you are looking for does not exist',
      );
    }
  }

  async searchByKeyword(keyword: string): Promise<Product[]> {
    try {
      const filteredProducts = await this.productModel
        .find({
          $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
          ],
        })
        .exec();

      if (filteredProducts.length == 0) {
        throw new Error();
      }

      return filteredProducts;
    } catch (error) {
      throw new NotFoundException(
        'the Keyword you are looking for does not exist',
      );
    }
  }

  async create(product: CreateProductDto): Promise<Product> {
    // const data = Object.assign(product, { user: user._id });
    const res = await this.productModel.create(product);
    return res;
  }

  // async create(product: CreateProductDto, user: User): Promise<Product> {
  //   const data = Object.assign(product, { user: user._id });
  //   const res = await this.productModel.create(data);
  //   return res;
  // }

  async findById(id: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('This is an Invalid ID');
    }
    try {
      const product = await this.productModel.findById(id);
      return product;
    } catch (error) {
      throw new NotFoundException(
        'the Product you are looking for does not exist',
      );
    }
  }

  async updateById(id: string, product: UpdateProductDto): Promise<Product> {
    try {
      return await this.productModel.findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new NotFoundException(
        'The Product you want to update does not exist',
      );
    }
  }

  async deleleteById(id: string): Promise<Product> {
    try {
      return await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException(
        'the Product you want to delete does not exist',
      );
    }
  }
}
