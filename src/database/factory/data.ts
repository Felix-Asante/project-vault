import { Member_Owner_Permission } from '@/constants/data'
import {
    PROJECT_RESOURCES_TYPE,
    ProjectPermissions,
    Roles,
    SUBSCRIPTION_PLANS,
} from '@/constants/enum'

export const PLANS = [
    { label: SUBSCRIPTION_PLANS.BASIC, price: 0 },
    { label: SUBSCRIPTION_PLANS.PRO, price: 10 },
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
export const RESOURCE_TYPES = [
    {
        name: PROJECT_RESOURCES_TYPE.NOTE,
    },
    {
        name: PROJECT_RESOURCES_TYPE.ENV,
    },
]
