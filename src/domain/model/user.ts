
export type UserId = string
export type UserEmail = string
export type UserPassword = string


export type User = {
    id?: UserId, // RDB側で生成されるのでオプショナル
    email: UserEmail, 
    password: UserPassword
}

export type UserDto = Omit<User, "id">
