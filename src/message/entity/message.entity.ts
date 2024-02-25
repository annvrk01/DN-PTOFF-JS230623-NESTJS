export class Message {
  id: number;

  content: string;

  createdAt: Date;

  senderUserId: number;

  receiverUserId: number;

  isDeleted: boolean = false;
}
