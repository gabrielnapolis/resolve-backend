import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() args: {email:String,password:string}) {
     try {
    
     } catch (error) {
       return error
     }
   }
}
