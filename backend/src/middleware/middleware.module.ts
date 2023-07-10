import {Module} from '@nestjs/common';
import {UserInjectMiddleware} from "./user-inject.middleware";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([User])],
    providers: [UserInjectMiddleware],
    exports: [UserInjectMiddleware]
})
export class MiddlewareModule {
}
