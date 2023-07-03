import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { SignupCredentialsDto } from '../dto/signup-credentials.dto';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';
import { UserInfoPayload } from '../interface/user-info-payload.interface copy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signupCredentialsDto: SignupCredentialsDto,
  ): Promise<{ message: string }> {
    return this.userRepository.signUp(signupCredentialsDto);
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: UserInfoPayload }> {
    const resp = await this.userRepository.validateUserPassword(
      signInCredentialsDto,
    );
    if (!resp) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = resp;
    const accessToken = await this.jwtService.sign(payload);
    const userInfo = {
      email: resp.username,
      name: resp.userInfo.fullName,
      address: resp.userInfo.address,
      photo: resp.userInfo.photo,
    };
    return {
      accessToken,
      user: userInfo,
    };
  }
}
