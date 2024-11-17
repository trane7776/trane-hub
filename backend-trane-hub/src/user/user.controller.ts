import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Post('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toggleFavorite(
    @Body('movieId') movieId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.userService.toggleFavorite(movieId, userId);
  }

  // Запросы для админки
  @Get()
  @Auth('admin')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm);
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, dto);
    if (!updatedUser) throw new NotFoundException('Пользователь не найден');
    return updatedUser;
  }

  @Delete(':id')
  @Auth('admin')
  async deleteById(@Param('id') id: string) {
    const deletedUser = await this.userService.delete(id);
    if (!deletedUser) throw new NotFoundException('Пользователь не найден');
    return deletedUser;
  }
}
