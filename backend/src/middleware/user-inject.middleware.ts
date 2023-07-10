import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { NextFunction, Response, Request } from 'express';

export type RequestPlayer = Request & { player: User };

@Injectable()
export class UserInjectMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(
    @Req() req: RequestPlayer,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const playerId = req.headers['player-id'] as string;
    console.log({ playerId });

    let user = await this.usersService.findOne(playerId);
    if (!user) {
      const userObj = new User();
      userObj.socketId = playerId;
      user = await this.usersService.create(userObj);
    }

    req.player = user;
    console.log(req.player);
    next();
  }
}
