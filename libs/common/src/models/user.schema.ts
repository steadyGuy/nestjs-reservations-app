import { AbstractDocument } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class UserDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @Field(() => [String])
  roles?: string[];
}

export const UsersSchema = SchemaFactory.createForClass(UserDocument);
