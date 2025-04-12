
export const ROLES = {
    ADMIN: "admin",
    READER: "reader",
    WRITER: "writer",
} as const;

export type RoleName = typeof ROLES[keyof typeof ROLES]

export type RoleId = string

export type Role = {
    id: RoleId,
    name: RoleName,
}
