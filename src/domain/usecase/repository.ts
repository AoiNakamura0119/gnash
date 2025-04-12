import { UserEmail, User, UserId, UserDto } from "../model/user";
import { Role, RoleId, RoleName } from "../model/role";


export interface Repository {
    setup(): Promise<void>
    find_user(user_id: UserId): Promise<User | null>
    find_user_by_email(user_email: UserEmail): Promise<User | null>
    register_user(user_dto: UserDto, new_role_ids?: RoleId[]): Promise<UserId> // ここどうするか. 失敗した場合
    update_user_role(user_id: UserId, new_role_ids: RoleId[]): Promise<null>
    find_role_id_by_name(role_name: RoleName): Promise<RoleId | undefined>
}

