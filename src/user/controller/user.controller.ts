import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Header, ParseIntPipe } from '@nestjs/common';
import { UserDTO } from "../request/user.request"
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {

  constructor(private userService  : UserService  ) {}
  
  @Post('')
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Body() userDTO: UserDTO): string {
    return 'This action adds a new User';
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any): string {
    return 'update success'
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this is remove'
  }
}
