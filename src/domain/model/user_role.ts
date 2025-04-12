import { RoleId } from "./role"
import { UserId } from "./user"

export type UserRoleId = string

export type UserRole = {
    id: UserRoleId,
    user_id: UserId,
    role_id: RoleId,
}
