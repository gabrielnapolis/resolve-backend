import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    @Inject('CONTRACTOR_REPOSITORY')
    private readonly contractorRepository: Repository<Contractor>,
  ) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'email', 'name'], // Campos que serão retornados se a permissão for concedida
    });
  }

  protected getAuthenticateOptions(req: any) {
    return {
      scope: ['public_profile', 'email'], // Solicita explicitamente as permissões necessárias
    };
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { emails, name, id } = profile;
    const email = emails?.[0]?.value;

    if (!email && accessToken) {
      const data = await this.findUserEmail(accessToken);
      console.log('Dados obtidos via fallback:', data);
      return null;
    }

    let user = await this.contractorRepository.findOneBy({
      email,
      active: true,
    });

    if (!user) return null;

    if (!user.facebookId) {
      user.facebookId = id;
      await this.contractorRepository.update(user.id, user);
    } else if (user.facebookId !== id) {
      return null;
    }

    return user;
  }

  private async findUserEmail(accessToken: string) {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/me?fields=id,name,email&access_token=${accessToken}`,
    );
    if (response.status !== 200) return null;
    const data = await response.json();
    return data;
  }
}
