import {IsEnum, IsString , IsNotEmpty , IsNumber, IsEmpty, IsArray} from 'class-validator'
import { Category } from '../schemas/product.schema';
import { User } from '../../auth/schemas/user.schemas';

export class CreateProductDto{

    @IsNotEmpty()
    @IsString({message: "Must be a string"})
    readonly  title: string;

    @IsNotEmpty()
    @IsString({message: "Must be a string"})
    readonly  description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly  price: number;

    @IsNotEmpty()
    @IsNumber()
    readonly  discount:number;

    @IsNotEmpty()
    @IsNumber()
    readonly  rating: number;

    @IsNotEmpty()
    @IsNumber()
    readonly  stock: number;

    @IsNotEmpty()
    @IsString({message: "Must be a string"})
    readonly  brand: string;

    @IsNotEmpty()
    @IsEnum(Category, {message: 'please enter correct Category'})
    readonly category: Category;

    @IsEmpty({message: "you cannot pass user id"})
    user: User
    
    // thumbnailImage: string;

    // @IsArray({message: 'enter more then one image'})
    // images: string[];
    

}