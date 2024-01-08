import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
@ObjectType({ isAbstract: true })
export abstract class AbstractDocument {
  @Prop({ _id: SchemaTypes.ObjectId })
  @Field(() => String)
  _id: Types.ObjectId;
}
