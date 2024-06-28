import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { MovieService } from './movie.service';

@Controller('')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  
  @Get('/movies')
  async getAllMovie() {
    return await this.movieService.getAllMovies();
  }

  @Get('/movie/:movieID')
  async getMovieById(@Param('movieID') movieID: string) {
    return await this.movieService.getMovieById(movieID);
  }

  @Post('/movie')
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.createMovie(createMovieDto);
  }

  @Put('/movie/:movieID')
  async updateMovie(
    @Param('movieID') movieID: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.updateMovie(movieID, updateMovieDto);
  }

  @Delete('/movie/:movieID')
  async deleteMovie(@Param('movieID') movieID: string) {
    return await this.movieService.deleteMovie(movieID);
  }
}