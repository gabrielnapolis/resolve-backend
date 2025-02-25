import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { SubscriptionRepository } from 'src/payment/repository/subscription.repository';
import { AuthGuard } from '@nestjs/passport';
import { FacebookAuthGuard } from './guard/facebook-auth.guard';
import * as jwt from 'jsonwebtoken';

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
          user.contractor,
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

  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<void> {
    // Inicia o fluxo de login com o Facebook
  }

  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  async facebookCallback(@Req() req,  @Res() res) {

    let authenticatedUser = req.user; // O usuário retornado pela estratégia
    
    if (!authenticatedUser) {
      const frontendUrl = process.env.FRONTEND_URL;
      res.redirect(`${frontendUrl}/auth/error?error=unauthorized`);
      return;
    }

    const token = jwt.sign(
      { id: authenticatedUser.id, email: authenticatedUser.email, name: authenticatedUser.name },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    const frontendUrl = process.env.FRONTEND_URL;
    res.redirect(`${frontendUrl}/auth/success?token=${token}`);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(): Promise<void> {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res) {
    console.log(" google callback",req);
    const user = req.user as { id: string; email: string; name: string };
    console.log(" google callback",user);
    if (!user) {
      const frontendUrl = process.env.FRONTEND_URL;
      return res.redirect(`${frontendUrl}/auth/error?error=unauthorized`);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    const frontendUrl = process.env.FRONTEND_URL;
    res.redirect(`${frontendUrl}/auth/success?token=${token}`);
  }
}
