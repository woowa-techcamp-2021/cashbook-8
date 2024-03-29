import { Request, Response } from 'express';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import jwtService from '../services/jwt.service';
import dotenv from '../config/dotenv';

class AuthController {
  async callback (req: Request, res: Response) {
    const { code } = req.query;

    const githubToken = await authService.getAccessToken(code as string);
    const user = await userService.syncUser(githubToken);
    const accessToken = await jwtService.generate(user);

    res.cookie('accessToken', accessToken);
    res.redirect(dotenv.CLIENT_URL);
  }

  async guestLogin (req: Request, res: Response) {
    const guest = await userService.findGuestUser();
    const accessToken = await jwtService.generate(guest);

    res.status(200).json({
      message: '게스트 로그인 성공',
      accessToken
    });
  }
}

export default new AuthController();
