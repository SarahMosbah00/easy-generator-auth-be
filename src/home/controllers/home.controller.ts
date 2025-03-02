import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/decorators/user.decorator';
import { UserAccount } from 'src/auth/interfaces/user-account.interface';

@ApiCookieAuth()
@ApiTags('Home')
@Controller('home')
export class HomeController {
  @Get('')
  getHome(@User() user: UserAccount) {
    return {
      message: `Welcome to the home page ${user.email}!`
    };
  }
}
