import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('msg')
    handleMessage(@MessageBody() data: any): any {
        console.log(data);

        return '收到';
    }

    send(msg: any) {
        this.server.emit('msg', msg);
    }
}
