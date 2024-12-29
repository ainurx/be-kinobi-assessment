export type TUser = {
    id: number,
    name: string,
    username: string,
    password: string
}

export type TUserImage = {
    id: number,
    userId: number,
    image: string,
}