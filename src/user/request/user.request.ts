import {
  validate,
  Length,
  IsInt,
  Min,
  Max,
  IsEmail,
  IsDate,
  IsBoolean,
  MinLength,
  MaxLength,
} from '@nestjs/class-validator';

export class UserDTO {
  @Length(5, 25)
  @MinLength(5, {
    message: 'name is too short',
  })
  @MaxLength(25, {
    message: 'name is too long',
  })
  firstName: string;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @IsEmail()
  email: string;

  @IsDate()
  createDate: string;

  @IsInt()
  @Min(0)
  @Max(11)
  phoneNumber: number;

  @IsBoolean()
  isLogin: boolean;
}
