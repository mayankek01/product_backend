import {IsString , IsNotEmpty ,MinLength} from 'class-validator'

export class LoginDto{

    @IsNotEmpty()
    @IsString({message: "Please enter correct email"})
    readonly  email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

}