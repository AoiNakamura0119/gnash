import { Role, RoleId, RoleName } from "../../domain/model/role";
import { User, UserDto, UserEmail, UserId } from "../../domain/model/user";
import { Repository } from "../../domain/usecase/repository";
import { handle_setup } from "./setup";
import { handle_find_role_id_by_name, handle_find_user, handle_find_user_by_email, handle_register_user, handle_update_user_role } from "./user/mod";


export const RdbRepository: Repository = {
    async setup(): Promise<void> {
        return await handle_setup()
    },
    async find_user(user_id: UserId): Promise<User | null> {
        return await handle_find_user(user_id)
    },
    async find_user_by_email(user_email: UserEmail): Promise<User | null> {
        return await handle_find_user_by_email(user_email)
    },
    async register_user(user_dto: UserDto, new_role_ids?: RoleId[]): Promise<UserId> {
        return await handle_register_user(user_dto, new_role_ids)
    },
    async update_user_role(user_id: UserId, new_role_ids: RoleId[]): Promise<null> {
        return await handle_update_user_role(user_id, new_role_ids)
    },
    async find_role_id_by_name(role_name: RoleName): Promise<RoleId | undefined> {
        return await handle_find_role_id_by_name(role_name)
    }
}
