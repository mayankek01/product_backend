import {IsEnum, IsString , IsNotEmpty , IsNumber, IsOptional, IsEmpty, IsArray} from 'class-validator'
import { Category } from '../schemas/product.schema';
import { User } from '../../auth/schemas/user.schemas';

export class UpdateProductDto{

    @IsOptional()
    @IsString({message: "Must be a string"})
    readonly  title: string;

    @IsOptional()
    @IsString({message: "Must be a string"})
    readonly  description: string;

    @IsOptional()
    @IsNumber()
    readonly  price: number;

    @IsOptional()
    @IsNumber()
    readonly  discount:number;

    @IsOptional()
    @IsNumber()
    readonly  rating: number;

    @IsOptional()
    @IsNumber()
    readonly  stock: number;

    @IsOptional()
    @IsString({message: "Must be a string"})
    readonly  brand: string

    @IsOptional()
    @IsEnum(Category, {message: 'please enter correct Category'})
    readonly category: Category;

    @IsEmpty({message: "you cannot pass user id"})
    readonly user: User;

    // @IsOptional()
    // thumbnailImage: string;

    // @IsOptional()
    // @IsArray({message: 'enter more then one image'})
    // images: string[];

}