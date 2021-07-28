import { Request, Response } from 'express';

class UserController {
  async findMyProfile (req: Request, res: Response) {
    const { user } = req;

    res.status(200).json({
      message: '본인 프로필 조회에 성공했습니다',
      user
    });
  }
}

export default new UserController();
