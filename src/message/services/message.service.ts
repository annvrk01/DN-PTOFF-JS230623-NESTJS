import { Injectable } from '@nestjs/common';
import { Message } from '../entity/message.entity';
import { MessageDTO } from '../request/message.request';

@Injectable()
export class MessageService {
  private readonly messages: Message[] = [
    {
      id: null,
      content: '',
      createdAt: new Date(),
      isDeleted: false,
      senderUserId: 0,
      receiverUserId: 0,
    },
  ];

  create(messageDTO: MessageDTO) {
    const message = new Message();
    message.content = messageDTO.content;
    message.receiverUserId = messageDTO.receiverUserId;
    this.messages.push(message);
  }

  findAll(): Message[] {
    return this.messages;
  }
}
