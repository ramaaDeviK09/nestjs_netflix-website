import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './models/movie.schema';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  providers: [MovieService],
  controllers: [MovieController],
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
})
export class MovieModule {}