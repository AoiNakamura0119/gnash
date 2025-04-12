import { Role, RoleId } from "../../model/role";
import { UserDto, UserId } from "../../model/user";
import { Repository } from "../repository";


export const RegisterUser = (repo: Repository) => async (user_dto: UserDto): Promise<UserId> => {
    const exist = await repo.find_user_by_email(user_dto.email)
    if (exist) {
        throw new Error("invalid")
    }
    const role_id = await repo.find_role_id_by_name("reader") || "" // TODO: 修正

    const user_id = await repo.register_user(user_dto, [role_id])
    if (!user_id) {
        throw new Error("invalid")
    }
    return user_id
    
}

export const UpdateUser = (repo: Repository) => async (user_id: UserId, new_role_ids: RoleId[]) => {
    const user = await repo.find_user(user_id);
    if (!user) {
        throw new Error("invalid")
    }
    await repo.update_user_role(user_id, new_role_ids)
}
