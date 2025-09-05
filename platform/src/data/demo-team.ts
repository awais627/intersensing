import { ITeamMember, ITeamStats } from 'types/team'

export const demoTeamMembers: ITeamMember[] = [
	{
		id: 'member-001',
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@IntSmart.com',
		role: 'Senior IoT Engineer',
		department: 'Engineering',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
		status: 'active',
		joinDate: '2023-06-15T09:00:00Z',
		lastActive: '2024-01-20T14:30:00Z',
		permissions: ['read', 'write', 'admin']
	},
	{
		id: 'member-002',
		firstName: 'Sarah',
		lastName: 'Johnson',
		email: 'sarah.johnson@IntSmart.com',
		role: 'Data Scientist',
		department: 'Analytics',
		avatar:
			'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
		status: 'active',
		joinDate: '2023-08-20T10:00:00Z',
		lastActive: '2024-01-19T16:45:00Z',
		permissions: ['read', 'write']
	},
	{
		id: 'member-003',
		firstName: 'Michael',
		lastName: 'Chen',
		email: 'michael.chen@IntSmart.com',
		role: 'Product Manager',
		department: 'Product',
		avatar:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
		status: 'active',
		joinDate: '2023-07-10T14:00:00Z',
		lastActive: '2024-01-20T11:20:00Z',
		permissions: ['read', 'write', 'admin']
	},
	{
		id: 'member-004',
		firstName: 'Emily',
		lastName: 'Davis',
		email: 'emily.davis@IntSmart.com',
		role: 'UX Designer',
		department: 'Design',
		avatar:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
		status: 'active',
		joinDate: '2023-09-05T09:30:00Z',
		lastActive: '2024-01-18T15:10:00Z',
		permissions: ['read', 'write']
	},
	{
		id: 'member-005',
		firstName: 'David',
		lastName: 'Wilson',
		email: 'david.wilson@IntSmart.com',
		role: 'DevOps Engineer',
		department: 'Engineering',
		avatar:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
		status: 'inactive',
		joinDate: '2023-05-12T11:00:00Z',
		lastActive: '2024-01-10T09:15:00Z',
		permissions: ['read']
	},
	{
		id: 'member-006',
		firstName: 'Lisa',
		lastName: 'Brown',
		email: 'lisa.brown@IntSmart.com',
		role: 'Marketing Specialist',
		department: 'Marketing',
		avatar:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
		status: 'pending',
		joinDate: '2024-01-15T13:00:00Z',
		lastActive: '2024-01-15T13:00:00Z',
		permissions: ['read']
	},
	{
		id: 'member-007',
		firstName: 'Alex',
		lastName: 'Martinez',
		email: 'alex.martinez@IntSmart.com',
		role: 'Frontend Developer',
		department: 'Engineering',
		avatar:
			'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
		status: 'active',
		joinDate: '2023-10-18T16:00:00Z',
		lastActive: '2024-01-20T12:30:00Z',
		permissions: ['read', 'write']
	},
	{
		id: 'member-008',
		firstName: 'Rachel',
		lastName: 'Taylor',
		email: 'rachel.taylor@IntSmart.com',
		role: 'Business Analyst',
		department: 'Analytics',
		avatar:
			'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
		status: 'active',
		joinDate: '2023-11-22T10:15:00Z',
		lastActive: '2024-01-19T17:45:00Z',
		permissions: ['read', 'write']
	}
]

export const demoTeamStats: ITeamStats = {
	totalMembers: 8,
	activeMembers: 6,
	inactiveMembers: 1,
	pendingMembers: 1,
	departments: [
		{ name: 'Engineering', count: 3 },
		{ name: 'Analytics', count: 2 },
		{ name: 'Product', count: 1 },
		{ name: 'Design', count: 1 },
		{ name: 'Marketing', count: 1 }
	],
	roles: [
		{ name: 'Senior IoT Engineer', count: 1 },
		{ name: 'Data Scientist', count: 1 },
		{ name: 'Product Manager', count: 1 },
		{ name: 'UX Designer', count: 1 },
		{ name: 'DevOps Engineer', count: 1 },
		{ name: 'Marketing Specialist', count: 1 },
		{ name: 'Frontend Developer', count: 1 },
		{ name: 'Business Analyst', count: 1 }
	]
}

export const availableRoles = [
	'Senior IoT Engineer',
	'IoT Engineer',
	'Data Scientist',
	'Product Manager',
	'UX Designer',
	'DevOps Engineer',
	'Frontend Developer',
	'Backend Developer',
	'Full Stack Developer',
	'Marketing Specialist',
	'Business Analyst',
	'Project Manager',
	'Team Lead',
	'Intern'
]

export const availableDepartments = [
	'Engineering',
	'Analytics',
	'Product',
	'Design',
	'Marketing',
	'Sales',
	'Operations',
	'HR',
	'Finance',
	'Legal'
]

export const availablePermissions = [
	'read',
	'write',
	'admin',
	'delete',
	'approve',
	'export'
]
