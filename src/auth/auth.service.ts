import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('CONTRACTOR_REPOSITORY')
    private contractorRepository: Repository<Contractor>,
    private readonly jwtService: JwtService,
  ) {}

  // Gera um token JWT com o payload
  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async validateUser(user: { email: string; password: string }): Promise<any> {
    let contractor = await this.contractorRepository.findOneBy({
      email: user.email?.toLocaleLowerCase(),
      password: user.password,
    });

    if (!contractor) return null;

    let payload = {
      id: contractor.id,
      userName: contractor.fullname,
      contractor,
    };

    return payload;
  }

  async validateFacebookUser(profile: any): Promise<any> {
    // Lógica para salvar o usuário no banco de dados, por exemplo
    return profile; // Retorna o perfil obtido do Facebook
  }
  async verifyAsync(token: any): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      console.log(payload);
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
