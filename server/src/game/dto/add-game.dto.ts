import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class  AddGameDto {

    @IsNotEmpty()
    @IsString()
    firstPlayer: string;
    
    @IsNotEmpty()
    @IsString()
    secondPlayer: string;
    
    @IsNotEmpty()
    @IsNumber()
    scoreFirst: number;
    
    @IsNotEmpty()
    @IsNumber()
    scoreSecond: number;
}