import {Prop, Schema , SchemaFactory} from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schemas/user.schemas';

export enum Category{
    SMARTPHONES = "smartphones",
    LAPTOPS = "laptops",
    FRAGRANCES = "fragrances",
    SKINCARE = "skincare",
    GROCERIES = "groceries",
    HOMEDECORATION = "home-decoration",
    FURNITURE = "furniture",
    TOPS = "tops",
    WOMENSDRESSES = "womens-dresses",
    WOMENSSHOES = "womens-shoes",
    MENSSHIRTS = "mens-shirts",
    MENSSHOES = "mens-shoes",
    MENSWATCHES = "mens-watches",
    WOMENSWATCHES = "womens-watches",
    WOMENSBAGS = "womens-bags",
    WOMENSJEWELLERY = "womens-jewellery",
    SUNGLASSES = "sunglasses",
    AUTOMOTIVE = "automotive",
    MOTORCYCLE = "motorcycle",
    LIGHTING = "lighting",
}

@Schema({timestamps: true})

export class Product{
    
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    discount:number;

    @Prop()
    rating: number;

    @Prop()
    stock: number

    @Prop()
    brand: string

    @Prop()
    category: Category;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    // @Prop()
    // thumbnailImage: String;
 
    // @Prop()
    // images: [String];

}

export const ProductSchema = SchemaFactory.createForClass(Product);

