import { Length, IsInt, MinLength, MaxLength } from '@nestjs/class-validator';

export class MessageDTO {
  @Length(1, 500)
  @MinLength(1, {
    message: 'message is too short',
  })
  @MaxLength(100, {
    message: 'message is too long',
  })
  content: string;

  @IsInt()
  receiverUserId: number;
}
