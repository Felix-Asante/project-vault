export enum SUBSCRIPTION_PLANS {
    BASIC = 'basic',
    PRO = 'pro',
}
export enum Roles {
    OWNER = 'owner',
    MEMBER = 'member',
    VIEWER = 'viewer',
}

export enum PROJECT_RESOURCES_TYPE {
    NOTE = 'note',
    ENV = 'env',
}
export enum ProjectPermissions {
    CAN_CREATE_PROJECT = 'CanCreateProject',
    CAN_EDIT_PROJECT = 'CanEditProject',
    CAN_DELETE_PROJECT = 'CanDeleteProject',
    CAN_VIEW_PROJECT = 'CanViewProject',
    CAN_SEND_INVITATION = ' CanSendInvitation',
    CAN_CHANGE_MEMBER_ROLE = 'CanChangeMemberRole',
    CAN_UPDATE_PROJECT_INVITATION = 'CanUpdateProjectInvitation',
}

export enum INVITATION_STATUS {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}
