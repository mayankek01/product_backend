import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Category, Product } from './schemas/product.schema';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';




@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('search')
  searchProductsByKeyword(@Query('keyword') keyword: string) {
    return this.productService.searchByKeyword(keyword);
  }

  /*
  @Get('search')
  searchProductByKeyword(@Query('keyword') : keyword: string){
    return this.productService.searchByKeyword(keyword)
  }
   */

  @Get('all')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  /*
@Get("all")
async getAllProduct(): Promise<Product[]>{
  return this.productService.findAll();
}
*/

  @Get('category/:category')
  searchProductsByCategory(@Param('category') category: string) {
    return this.productService.searchByCategory(category);
  }

  /*
  @Get(category/:category)
  async getProductByCategory(@Param('category')):Promise<Product[]>{
    return this.productService.searchByCategory(category);
  }
  */

  @Get('allcategories')
  getAllCategories() {
    return Object.values(Category);
  }

  
  @Post('newproduct')
  // @UseGuards(AuthGuard())
  async addProduct(
    @Body()
    product: CreateProductDto,
    // @Req() req,
  ): Promise<Product> {
    // if (!req.user || !req.user._id) {
    //   // Handle the case where req.user or req.user._id is undefined
    //   throw new Error('User information is missing.');
    // }
    // return this.productService.create(product, req.user);
    return this.productService.create(product);
  }
  

  @Get('getbyid/:id')
  async getProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.findById(id);
  }

  @Put('updatebyid/:id')
  async updateProduct(
    @Param('id')
    id: string,
    @Body()
    product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateById(id, product);
  }

  @Delete('deletebyid/:id')
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.deleleteById(id);
  }

  @Post('uploadimage')
  @UseInterceptors(FileInterceptor('image' , {
    storage : diskStorage({
      destination:'../uploads',
      filename: (req, file, callBack) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
        const extension = path.parse(file.originalname).ext;
        callBack(null, `${filename}${extension}`);
      }
    })
  }))
  uploadFile(@Res() res, @UploadedFile() file){
    return res.status(HttpStatus.OK).json({
      sucess: true,
      data: file.path
    });
  }

}

















// @Post('newproduct')
  // @UseInterceptors(
  //   FileInterceptor('thumbnailImage', {
  //     storage: diskStorage({
  //       destination: './uploads', // Define the upload destination
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //         cb(null, `${uniqueSuffix}-${file.originalname}`);
  //       },
  //     }),
  //   })
  // )
  // async postProduct(
  //   @UploadedFile() thumbnailImage, // Uploaded thumbnail image file
  //   @Body() product: CreateProductDto,
  //   @Req() req
  // ): Promise<Product> {
  //   console.log(req.user);
  //   // product.thumbnailImage = thumbnailImage.path; // Store the thumbnail image URL
  //   return this.productService.create(product, req.user);
  // }