import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export function isPublic(reflector: Reflector, executionContext: ExecutionContext): boolean | undefined {
    return reflector.getAllAndOverride<boolean | undefined, string>('isPublic', [
        executionContext.getHandler(),
        executionContext.getClass(),
    ]);
}