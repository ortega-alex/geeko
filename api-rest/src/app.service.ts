import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
    constructor(@InjectConnection() private connection: Connection) {}

    async onModuleInit() {
        const isConnected = (await this.connection.readyState) === 1;
        console.log(`MongoDB is ${isConnected ? 'connected' : 'disconnected'}`);
    }
}
