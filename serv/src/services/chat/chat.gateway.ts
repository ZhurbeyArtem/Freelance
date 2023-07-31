import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageTo } from './chat.interface';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, Socket> = new Map<string, Socket>();

handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId;
    this.connectedUsers.set(String(userId), socket);
    console.log(`User connected: ${userId}`);
  }

handleDisconnect(socket: Socket) {
    const userId = socket.handshake.query.userId;
  if (userId) {
    this.connectedUsers.delete(String(userId));
    console.log(`User disconnected: ${userId}`);
  }
}


  @SubscribeMessage('message')
  handleChatMessage(client: Socket, message: MessageTo) {
    const userId = client.handshake.query.userId;
    console.log(`Received message from user ${userId}: ${message.message}`);
    const targetUserId = userId ? message.userId : userId;
    const targetUserSocket = this.connectedUsers.get(String(targetUserId));
    if (targetUserSocket) {
      targetUserSocket.emit('message', message.message);
  }
}
}

