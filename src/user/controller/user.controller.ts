import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Header,
  ParseIntPipe,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserDTO } from '../request/user.request';
import { UserService } from '../service/user.service';
import { UserResponse } from '../responses/user.response';
import { UserSearchRequest } from '../request/user.search.request';
import { Paginate } from 'src/common/paginate';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

 /**
  * 
  * @param userSearchRequest 
  * @returns 
  */
  @Get()
  async findAll(
    @Query() userSearchRequest: UserSearchRequest,
  ): Promise<Paginate> {
    try {
      return this.userService.findAll(userSearchRequest);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id)
  }

   /**
   *
   * @param userDTO
   * @returns
   */
   @Post('')
   @Header('Cache-Control', 'none')
   create(@Body() userDTO: UserDTO): Promise<UserResponse> {
       return this.userService.create(userDTO);
   }

  /**
   *
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() userDTO: UserDTO): string {
    this.userService.update(id, userDTO)
    return 'update success';
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
