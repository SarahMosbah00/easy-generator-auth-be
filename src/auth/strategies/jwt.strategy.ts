import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "../constants/environment-variables";
import { UserAccount } from "../interfaces/user-account.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(private readonly configService: ConfigService<EnvironmentVariables>) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let token = null;
                if (request && request.cookies) {
                    token = request.cookies['jwt'];
                }
                return token;
            }]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_PUBLIC_SECRET', { infer: true }), 
            algorithms: ['RS256'],
        });
    }

    validate(payload: UserAccount) {
        if (!payload) {
            this.logger.warn('Invalid JWT payload');
            throw new UnauthorizedException();
        }
        this.logger.log(`JWT validated for user: ${payload.email}`);
        return payload;
    }
}