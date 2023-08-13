import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define the schema
export type UserDocument = HydratedDocument<User> & User;

@Schema()
export class User {
  @Prop({ required: true }) id: String
  
  @Prop({ required: true, unique: true }) email: String
  
  @Prop({ required: true }) password: String
  
  @Prop({ required: true }) name: String

  @Prop({ required: true }) positions: [ { part: String, experience: Number } ]
  
  @Prop({ required: true }) recruits: [ String ]
  
  @Prop({ required: true }) role: String
  
}

export const UserSchema = SchemaFactory.createForClass(User);