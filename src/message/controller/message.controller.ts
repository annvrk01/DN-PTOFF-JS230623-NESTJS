import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { Message } from '../entity/message.entity';
import { MessageDTO } from '../request/message.request';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }
  @Post()
  async create(@Body() createMessageDTO: MessageDTO) {
    return this.messageService.create(createMessageDTO);
  }
}
