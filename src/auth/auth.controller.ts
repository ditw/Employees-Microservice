import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from 'src/users/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({
        description: 'Login (using a username and password) - No database integration for this use case',
      })    
    signIn(@Body() loginDto: LoginDto) {
      return this.authService.signIn(loginDto.username, loginDto.password);
    }
}
