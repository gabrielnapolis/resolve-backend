import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';

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


   @Get('google')
   @UseGuards(GoogleAuthGuard) // Inicia o processo de login com o Google
   async googleAuth(@Req() req) {}



   @Get('facebook')

   async facebookAuth() {
     // O Guard vai automaticamente redirecionar para o Facebook para autenticação
   }
 
   @Get('facebook/callback')

   async facebookAuthRedirect() {
     // Depois que o usuário for autenticado com sucesso, ele será redirecionado aqui
     return 'Usuário autenticado com sucesso com o Facebook';
   }
}
