import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie{
    @Prop({default: ''})
    title: string;

    @Prop({default: ''})
    description: string;

    @Prop({default: ''})
    year: string;

    @Prop({default: ''})
    genre: string;

    @Prop({default: ''})
    duration: string;

    @Prop({default: ''})
    video: string;

    @Prop({default: ''})
    trailer: string;

    @Prop({default: ''})
    image: string;

    isSeries: boolean;

    isDestroy: boolean;

    @Prop({default: Date.now()})
    createdAt: Date;

    @Prop({default: Date.now()})
    updatedAt: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
