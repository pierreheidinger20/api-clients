import { Prop, Schema, SchemaFactory ,} from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ClientDocument = Client & Document;

@Schema({
  versionKey:false
})
export class Client {
  @Prop()
  _id:string;
  @Prop()
  addresses: [];
  @Prop()
  orders: [];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
