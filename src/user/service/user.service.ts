import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/entity/user.entity';
import { UserInfoDto } from '../dto/user-info.dto';
import { UserInfo } from '../entity/user-info.entity';
import { userInfoData } from '../interface/user-info.interface';
import { UserInfoRepository } from '../repository/user-info.repository';
import { UserRepository } from 'src/auth/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfoRepository)
    private userInfoRepository: UserInfoRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUser(user: User): Promise<UserInfo> {
    const userInfo = await this.userInfoRepository.findOne({
      where: { id: user.userInfo.id },
    });

    if (!userInfo) {
      throw new NotFoundException('User not found.');
    }
    return userInfo;
  }
  async getListUserByListUuid(listUuid: string[]): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        uuid: { in: listUuid },
      },
    });
    return users;
  }

  async updateUserProfile(
    user: User,
    userInfoDto: UserInfoDto,
  ): Promise<userInfoData> {
    const userInfo = await this.getUser(user);

    if (userInfoDto.address) userInfo.address = userInfoDto.address;
    if (userInfoDto.fullName) userInfo.fullName = userInfoDto.fullName;
    if (userInfoDto.photo) userInfo.photo = userInfoDto.photo;
    if (userInfoDto.modifiedPhoto)
      userInfo.modifiedPhoto = userInfoDto.modifiedPhoto;

    await userInfo.save();
    return userInfo;
  }
}
