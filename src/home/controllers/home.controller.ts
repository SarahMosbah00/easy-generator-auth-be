import { Controller, Get, Logger } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/decorators/user.decorator';
import { UserAccount } from 'src/auth/interfaces/user-account.interface';

@ApiCookieAuth()
@ApiTags('Home')
@Controller('home')
export class HomeController {
  private readonly logger = new Logger(HomeController.name);

  @Get('')
  getHome(@User() user: UserAccount) {
    this.logger.log(`Home page accessed by user: ${user.email}`);
    return {
      message: `Welcome to the home page ${user.email}!`
    };
  }
}
