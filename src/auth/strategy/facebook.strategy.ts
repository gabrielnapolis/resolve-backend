import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('CONTRACTOR_REPOSITORY')
    private readonly contractorRepository: Repository<Contractor>,
  ) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name'], // Campos que serão retornados pelo Facebook
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { emails, name, id } = profile;
    const email = emails?.[0]?.value;
    if (!email) return null;

    let user = await this.contractorRepository.findOneBy({
      email,
      active: true,
    });

    if (!user) return null;

    if (!user.facebookId) {
      user.facebookId = id;
      await this.contractorRepository.update(user.id, user);
    } else if (user.facebookId != id) {
      return null;
    }

    return user;
  }
}
