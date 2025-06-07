import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('CONTRACTOR_REPOSITORY')
    private readonly contractorRepository: Repository<Contractor>,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, displayName } = profile;

    const data = {
      id,
      email: emails[0].value,
      name: displayName,
    };

    let user = await this.contractorRepository.findOneBy({
      email: data.email,
      active: true,
    });

    if (!user) return done(null, false);

    done(null, user); // Retorna o usuário autenticado
  }
}
