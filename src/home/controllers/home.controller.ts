import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Home')
@Controller('home')
export class HomeController {
  @Get('')
  getHome() {
    return 'Welcome to the home page!';
  }
}
