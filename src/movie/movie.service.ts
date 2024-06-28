import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-user.dto';
import { Movie, MovieDocument } from './models/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<MovieDocument>,
  ) {}

  async getAllMovies() {
    return await this.movieModel.find();
  }

  async getMovieById(movieID: string) {
    const checkMovieID = await this.movieModel.findOne({ _id: movieID });
    if (!checkMovieID) {
      return { message: 'Movie not found' };
    }
    return await this.movieModel.findById(movieID);
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    try {
      const newMovie = new this.movieModel({
        ...createMovieDto,
        createdAt: new Date(),
      });
      return await newMovie.save();
    } catch (error) {
      return error;
    }
  }

  async updateMovie(movieID: string, updateMovieDto: UpdateMovieDto) {
    try {
      const checkMovieID = await this.movieModel.findOne({ _id: movieID });
      if (!checkMovieID) {
        return { message: 'Movie not found' };
      }
      return await this.movieModel.findByIdAndUpdate(movieID, updateMovieDto);
    } catch (error) {
      return error;
    }
  }

  async deleteMovie(movieID: string) {
    try {
      const checkMovieID = await this.movieModel.findOne({ _id: movieID });
      if (!checkMovieID) {
        return { message: 'Movie not found' };
      }
      await this.movieModel.findByIdAndDelete(movieID);
      return { message: 'Movie deleted successfully' };
    } catch (error) {
      return error; 
    }
  }
}
