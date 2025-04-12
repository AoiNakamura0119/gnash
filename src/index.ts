import express from 'express'
import { Repository } from './domain/usecase/repository'
import { RdbRepository } from './gateway/rdb/mod'
import 'dotenv/config';
import { UserDto } from './domain/model/user';

const app = express()
app.use(express.json())
const port = 3985


// app.post('/login', )

// TODO: 修正
export const Setup = (repo: Repository) => async (): Promise<void> => {
    await repo.setup()
    const role_id = await repo.find_role_id_by_name("admin")
    if (!role_id) {
        throw new Error("inconsistant")
    }
    const user_dto: UserDto = { // 後から修正 環境変数から読み込む
        email: "example@example.com",
        password: "password"
    }
    await repo.register_user(user_dto, [role_id])
}

const running = async () => {
    try {
        const setup = Setup(RdbRepository)
        await setup()

        app.listen(port, () => {
            console.log(`Auth Server is Running...: http://localhost:${port}`)
        })
    } catch (e) {
        console.error(e)
        process.exit(1);
    }
}

running()
