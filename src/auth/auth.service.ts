import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
        ) {}

        async signUp(signUpDto : SignUpDto) : Promise<{token: string}>{
            try{
            const {name,email,password} = signUpDto

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword
            })

            const token = this.jwtService.sign({id: user._id})

            return {token}
        }catch(error){
            throw new UnauthorizedException("EMAIL ALREADY USED");
        }
        }

        async login(loginDto : LoginDto) : Promise<{token: string}>{
            const {email, password} = loginDto;

            const user = await this.userModel.findOne({email})

            if(!user){
                throw new UnauthorizedException("invalid email or password ")
            }

            const isPasswordMatched = await bcrypt.compare(password,user.password)

            if(!isPasswordMatched){
                throw new UnauthorizedException("invalid email or password")
            }

            const token = this.jwtService.sign({id: user._id})

            return {token}

        }
}
    
