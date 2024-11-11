import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async validateFacebookUser(profile: any): Promise<any> {
        // Lógica para salvar o usuário no banco de dados, por exemplo
        console.log(profile);
        return profile;  // Retorna o perfil obtido do Facebook
      }
}
