export const Role = {
    SUPER_ADMIN: 'super-admin',
    ADMIN: 'admin',
    STAFF: 'staff',
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
