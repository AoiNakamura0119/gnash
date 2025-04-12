import { UserDto } from "../../../domain/model/user";
import { RegisterUser } from "../../../domain/usecase/user/mod";
import { RdbRepository } from "../../rdb/mod";


const register = RegisterUser(RdbRepository)

const to_input = (req: any) => {
    const user_dto: UserDto = {
        email: req.body.email,
        password: req.body.password
    }
    return user_dto
}

export const RegisterHandler = {
    post: async (req: any, res: any) => {
        try {
            // ここに認証のミドルウェアを挟む
            const user_dto = to_input(req)
            const user_id = register(user_dto)
            res.status(200).json(user_id)
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    }
}
