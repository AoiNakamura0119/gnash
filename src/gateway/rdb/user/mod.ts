import { Role, RoleId, RoleName } from "../../../domain/model/role";
import { User, UserDto, UserEmail, UserId } from "../../../domain/model/user";
import { UserRole } from "../../../domain/model/user_role";
import prisma from "../../../lib/prisma";
import bcrypt from 'bcrypt';

export const handle_find_user = async (user_id: UserId): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id: user_id } })
}

export const handle_find_user_by_email = async (user_email: UserEmail): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email: user_email}})
}

export const handle_register_user = async (user_dto: UserDto, new_role_ids?: RoleId[]): Promise<UserId> => {
    return await prisma.$transaction(async (tx) => {
        const hashed_password = await bcrypt.hash(user_dto.password, 10)
        const user: User = {
            id: crypto.randomUUID(),
            email: user_dto.email,
            password: hashed_password
        }
        
        const new_user = await tx.user.create({data: user})
        
        if (new_role_ids) {
            for (const new_role_id of new_role_ids) {
                const user_role: UserRole = {
                    id: crypto.randomUUID(),
                    user_id: new_user.id,
                    role_id: new_role_id
                }
                await tx.userRole.create({data: {
                        user: { connect: { id: user_role.user_id } },
                        role: { connect: { id: user_role.role_id } },
                    }
                })
            }
        }
        return new_user.id
    })
}

export const handle_update_user_role = async (user_id: UserId, new_role_ids: RoleId[]): Promise<null> => {
    await prisma.$transaction(async (tx) => {
        // 既存のロールを全削除
        await tx.userRole.deleteMany({ where: { userId: user_id } })

        // 新しいロールを追加
        for (const role_id of new_role_ids) {
            await tx.userRole.create({
                data: {
                    userId: user_id,
                    roleId: role_id,
                },
            });
        }
    })
    return null // ここも後から修正
}

export const handle_find_role_id_by_name = async (role_name: RoleName): Promise<RoleId | undefined> => {
    const role = await prisma.role.findUnique({where: { name: role_name } })
    return role?.id
    
}
