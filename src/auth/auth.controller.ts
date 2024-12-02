import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { SubscriptionRepository } from 'src/payment/repository/subscription.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() args: { email: string; password: string }) {
    try {
      let user = await this.authService.validateUser(args);
      if (!user) return 'Usuário não aturorizado.';

      let subscription =
        await this.subscriptionRepository.findActiveSubscritionByContractor(
          user.contractor
        );

      let token = this.authService.generateToken({
        id: user.id,
        userName: user.fullname,
      });

      return {
        access_token: token,
        configs: {
          hasSubscription: subscription ? true : false,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard) // Inicia o processo de login com o Google
  async googleAuth(@Req() req) {}

  //  @Get('facebook')
  //  @UseGuards(FacebookAuthGuard)
  //  async facebookAuth() {
  //    // O Guard vai automaticamente redirecionar para o Facebook para autenticação
  //  }

  //  @Get('facebook/callback')
  //  @UseGuards(FacebookAuthGuard)
  //  async facebookAuthRedirect() {
  //    // Depois que o usuário for autenticado com sucesso, ele será redirecionado aqui
  //    return 'Usuário autenticado com sucesso com o Facebook';
  //  }
}
