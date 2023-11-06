//import { IsType } from '@/middlewares/validation.middleware';
import { IsEmail, IsString, IsNumber, IsDate, Allow, IsDateString, IsNumberString } from 'class-validator';

export class EntradaDto {
    @IsNumber()
    id: number;
    @IsString()
    titulo: string;
    @IsString()
    autor: string;
    @IsDateString()
    fecha: Date;
    @IsString()
    contenido: string;
}
