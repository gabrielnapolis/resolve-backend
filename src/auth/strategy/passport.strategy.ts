import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('CONTRACTOR_REPOSITORY') 
    private readonly contractorRepository: Repository<Contractor>) {
      super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!, 
    });
  }

  async validate(payload: any) {
    
    let user = await this.contractorRepository.findOneBy({
      id: payload.id,
      active: true
    })

    if(!user) return false;

    return user;
  }
}
