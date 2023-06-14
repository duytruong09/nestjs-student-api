import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import UserRepository from '@authorization/a1-user/user.repository';
import UserService from '@authorization/a1-user/user.service';
import OtpService from '@common/c2-otp/otp.service';
import { UserDocument } from '@authorization/a1-user/schemas/user.schema';
import { Types } from 'mongoose';
import SigninWithSocialDto from './dto/signin-with-social.dto';
import SigninLocalDto from './dto/signin-local.dto';
import SignupLocalDto from './dto/sigup-local.dto';
import TokenService from './token.service';
import { AuthTokenPayload, TokenPayload } from './types';
import SignupDto from './dto/sign-up.dto';
import SignInDto from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
  ) {}

  /**
   * Sign in with social
   * @param data
   * @returns
   */
  public async signinWithSocial(data: SigninWithSocialDto): Promise<AuthTokenPayload> {
    const { deviceID, typeRegister, tokenLogin } = data;

    // require tokenLogin and typeRegister
    if (!tokenLogin || !typeRegister) {
      throw new BadRequestException('TokenSignin and typeRegister are required.');
    }

    // find user by tokenLogin + typeRegister
    let user = await this.userRepository.findOneBy({
      tokenLogin,
      typeRegister,
    });

    // if not exist user => create new
    if (!user) user = await this.userRepository.create(data);

    // if user has been deleted => update deleted = false
    if (user && user.deleted) {
      throw new NotFoundException(
        'The account has been removed from the system. If you want to recover your account, please contact admin at the following email...',
      );

      // user = await this.userService.updateOneById(user._id, {
      //   deleted: false,
      //   ...data,
      // });
    }

    // if exist deviceID => update deviceID and fcmTokens
    if (deviceID) {
      await this.userService.addDeviceID(user._id, deviceID);
      user.deviceID = deviceID;
    }

    // Success
    return this.generateAuthTokens(user);
  }

  /**
   * Sign in with account local
   * @param data
   * @returns
   */
  public async signinLocal(data: SigninLocalDto): Promise<AuthTokenPayload> {
    const { phone, password, deviceID } = data;
    // Check typeRegister = "haqua"
    // if (typeRegister !== TypeRegisterEnum.HAQUA) {
    //   throw new BadRequestException(
    //     'The account does not exist in the system.',
    //   );
    // }

    // const query = { phone, typeRegister };
    // const user = await this.userRepository.findOneBy(query);

    // Get and check user exist by phone
    const user = await this.userRepository.findByPhone(phone);

    if (!user) throw new NotFoundException('The account does not exist in the system.');

    // check deleted
    if (user && user.deleted) {
      throw new NotFoundException(
        'The account has been removed from the system. If you want to recover your account, please contact admin at the following email...',
      );
    }

    // check deleted
    if (user && user.deleted) {
      throw new NotFoundException('The account has been removed from the system.');
    }

    // compare password
    const isValidPassword = await this.userRepository.comparePasswordById(user._id, password);

    // Check valid password
    if (!isValidPassword) throw new BadRequestException('Incorrect phone or password.');

    // if exist deviceID => update deviceID and fcmTokens
    if (deviceID) {
      await this.userService.addDeviceID(user._id, deviceID);
      user.deviceID = deviceID;
    }

    // return authTokens
    return this.generateAuthTokens(user);
  }

  /**
   * Sign up account local
   * @param data
   * @returns
   */
  public async signupLocal(data: SignupLocalDto): Promise<AuthTokenPayload> {
    const {
      phone, deviceID, otpCode, password, ...rest
    } = data;

    // require phone and password
    if (!phone || !password) throw new BadRequestException('Phone and password are required.');

    // validate user
    const userExist = await this.userService.validateUser({ phone });

    if (userExist && !userExist.deleted) throw new BadRequestException('Account already exists in the system.');

    // check identity
    const checkIdentity = await this._checkIdentity(data);
    if (checkIdentity) throw new BadRequestException('Identity already exists in the system.');

    // verify otpCode by phone
    await this.otpService.verifyOtpPhone({ phone, otpCode });

    // user item
    const userItem = {
      ...rest,
      deleted: false,
      phone,
      deviceID,
      password,
      fcmTokens: deviceID ? [deviceID] : [],
    };

    // if user has been deleted => update deleted = false
    if (userExist && userExist.deleted) {
      const userUpdated = await this.userService.updateOneById(userExist._id, userItem);

      // generate auth tokens
      return this.generateAuthTokens(userUpdated);
    }

    // create new user
    const newUser = await this.userRepository.create(userItem);

    // Success
    return this.generateAuthTokens(newUser);
  }

  /**
   * Sign in with email and password
   * @param data
   * @returns
   */
  public async signin(data: SignInDto): Promise<AuthTokenPayload> {
    const { password, email, deviceID } = data;

    // Get and check user exist by phone
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('The account does not exist in the system.');

    // check deleted
    if (user && user.deleted) {
      throw new NotFoundException(
        'The account has been removed from the system. If you want to recover your account, please contact admin at the following email...',
      );
    }

    // compare password
    const isValidPassword = await this.userRepository.comparePasswordById(user._id, password);

    // Check valid password
    if (!isValidPassword) throw new BadRequestException('Incorrect phone or password.');

    // if exist deviceID => update deviceID and fcmTokens
    if (deviceID) {
      await this.userService.addDeviceID(user._id, deviceID);
      user.deviceID = deviceID;
    }

    // return authTokens
    return this.generateAuthTokens(user);
  }

  /**
   * Sign up with account email and password
   * @param data
   * @returns
   */
  public async signup(data: SignupDto): Promise<AuthTokenPayload> {
    const {
      email, deviceID, otpCode, password, ...rest
    } = data;

    // require email and password
    if (!email || !password) throw new BadRequestException('Email and password are required.');

    // validate user
    const userExist = await this.userService.validateUser({ email });

    if (userExist && !userExist.deleted) throw new BadRequestException('Account already exists in the system.');

    // check identity
    const checkIdentity = await this._checkIdentity(data);
    if (checkIdentity) throw new BadRequestException('Identity already exists in the system.');

    // verify otpCode by email
    await this.otpService.verifyOtpEmail({ email, otpCode });

    // user item
    const userItem = {
      ...rest,
      deleted: false,
      email,
      deviceID,
      password,
      fcmTokens: deviceID ? [deviceID] : [],
    };

    // if user has been deleted => update deleted = false
    if (userExist && userExist.deleted) {
      const userUpdated = await this.userService.updateOneById(userExist._id, userItem);

      // generate auth tokens
      return this.generateAuthTokens(userUpdated);
    }

    // create new user
    const newUser = await this.userRepository.create(userItem);

    // Success
    return this.generateAuthTokens(newUser);
  }

  /**
   * Refresh token
   * @param param0
   */
  public async refreshToken({ refreshToken }: RefreshTokenDto) {
    const decoded = await this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.userService.findOneById(new Types.ObjectId(decoded._id));

    if (!user) throw new NotFoundException('Invalid refreshToken');

    return this.generateAuthTokens(user);
  }

  /**
   * Generate auth tokens
   * @param userDoc
   * @returns
   */
  public async generateAuthTokens(userDoc: UserDocument): Promise<AuthTokenPayload> {
    const {
      fcmTokens, password, tokenLogin, ...rest
    } = userDoc.toObject();

    // Create payload
    const tokenPayload: TokenPayload = { _id: rest._id, role: rest.role };

    // Generate ac_token and rf_token
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(tokenPayload),
      this.tokenService.generateRefreshToken(tokenPayload),
    ]);

    return {
      accessToken,
      refreshToken,
      user: rest,
    };
  }

  /**
   * Check identity, dateOfCreatedId exitst
   * @param router
   */
  private async _checkIdentity(data: SignupLocalDto | SignupDto, idUser?: string) {
    // check identity
    if (!data.identity) return null;

    const query: any = { identity: data.identity };

    // check dateOfCreatedId
    if (data.dateOfCreatedId) query.dateOfCreatedId = data.dateOfCreatedId;

    // check idUser
    if (idUser) query._id = { $ne: new Types.ObjectId(idUser) };

    return await this.userService.findOneBy(query);
  }
}
