import { ProjectPermissions, Roles, SUBSCRIPTION_PLANS } from '@/constants/enum'

export const PLANS = [
    { label: SUBSCRIPTION_PLANS.BASIC, price: 0 },
    { label: SUBSCRIPTION_PLANS.PRO, price: 10 },
]

const Member_Owner_Permission = [
    ProjectPermissions.CAN_CREATE_PROJECT,
    ProjectPermissions.CAN_DELETE_PROJECT,
    ProjectPermissions.CAN_EDIT_PROJECT,
    ProjectPermissions.CAN_VIEW_PROJECT,
]

export const ROLES = [
    {
        label: Roles.MEMBER,
        permissions: Member_Owner_Permission,
    },
    {
        permissions: Member_Owner_Permission,
        label: Roles.OWNER,
    },
    {
        label: Roles.VIEWER,
        permissions: [ProjectPermissions.CAN_VIEW_PROJECT],
    },
]
