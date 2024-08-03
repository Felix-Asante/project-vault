import {
    NotepadTextIcon,
    SettingsIcon,
    SquareKanbanIcon,
    UsersIcon,
    WorkflowIcon,
} from 'lucide-react'

export const PROJECT_NAVIGATION = [
    {
        label: 'Overview',
        path: (key: string) => `/projects/${key}/overview`,
        icon: SquareKanbanIcon,
    },
    {
        label: 'Resources',
        path: (key: string) => `/projects/${key}/resources`,
        icon: NotepadTextIcon,
    },
    {
        label: 'Members',
        path: (key: string) => `/projects/${key}/members`,
        icon: UsersIcon,
    },
    {
        label: 'integrations',
        path: (key: string) => `/projects/${key}/integrations`,
        icon: WorkflowIcon,
    },
    {
        label: 'settings',
        path: (key: string) => `/projects/${key}/settings`,
        icon: SettingsIcon,
    },
]
