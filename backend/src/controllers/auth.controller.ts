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
}

export default new AuthController();
