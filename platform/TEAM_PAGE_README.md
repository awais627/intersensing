# Team Management Page

A comprehensive team management system for the Intersensing platform where administrators can add, remove, and manage team members.

## Features

### 1. Team Overview & Statistics
- **Member Counts**: Total, active, inactive, and pending members
- **Department Distribution**: Visual representation of team members across departments
- **Role Distribution**: Breakdown of team members by job roles
- **Real-time Updates**: Statistics update automatically when members are added/removed

### 2. Team Member Management
- **Add New Members**: Complete form with validation
- **Remove Members**: Delete team members with confirmation
- **Status Management**: Update member status (active, inactive, pending)
- **Member Details**: Expandable view with comprehensive information

### 3. Search & Filtering
- **Text Search**: Search by name, email, or role
- **Status Filter**: Filter by member status
- **Department Filter**: Filter by department
- **Real-time Results**: Instant filtering and search results

### 4. Member Information Display
- **Profile Pictures**: Avatar display with status indicators
- **Contact Details**: Name, email, role, department
- **Permissions**: Visual display of assigned permissions
- **Timeline**: Join date and last active information

## Demo Data

The page includes sample team members:
- **John Doe** - Senior IoT Engineer (Engineering)
- **Sarah Johnson** - Data Scientist (Analytics)
- **Michael Chen** - Product Manager (Product)
- **Emily Davis** - UX Designer (Design)
- **David Wilson** - DevOps Engineer (Engineering) - Inactive
- **Lisa Brown** - Marketing Specialist (Marketing) - Pending
- **Alex Martinez** - Frontend Developer (Engineering)
- **Rachel Taylor** - Business Analyst (Analytics)

## Available Roles

- Senior IoT Engineer, IoT Engineer
- Data Scientist, Business Analyst
- Product Manager, Project Manager
- UX Designer, Frontend Developer, Backend Developer
- DevOps Engineer, Full Stack Developer
- Marketing Specialist, Team Lead, Intern

## Available Departments

- Engineering, Analytics, Product
- Design, Marketing, Sales
- Operations, HR, Finance, Legal

## Available Permissions

- **read**: Basic access to view data
- **write**: Ability to create and modify data
- **admin**: Administrative privileges
- **delete**: Permission to remove data
- **approve**: Ability to approve actions
- **export**: Permission to export data

## Team Member Status

- **Active**: Fully functional team members
- **Inactive**: Temporarily disabled accounts
- **Pending**: New members awaiting activation

## Navigation

Access the team page via:
- Sidebar navigation → Team
- Direct URL: `/team`

## Technical Implementation

- **TypeScript interfaces** for type safety
- **React hooks** for state management
- **Tailwind CSS** for responsive design
- **Form validation** with error handling
- **Modal forms** for adding members
- **Real-time filtering** and search
- **Responsive grid layouts** for optimal display
- **Icon integration** with React Icons
- **Date formatting** with date-fns

## Key Actions

### Adding Team Members
1. Click "Add Team Member" button
2. Fill in required information (name, email, role, department)
3. Select appropriate permissions
4. Submit form to add member

### Managing Existing Members
1. Click the expand button (⋮) on any member card
2. View detailed information and permissions
3. Update status using the dropdown
4. Remove member using the remove button

### Filtering and Search
1. Use search bar to find specific members
2. Filter by status (active/inactive/pending)
3. Filter by department
4. Combine multiple filters for precise results

## Future Enhancements

- Bulk member operations
- Member invitation system
- Role-based access control (RBAC)
- Team member performance metrics
- Integration with HR systems
- Advanced permission management
- Member activity tracking
- Team collaboration features
- Export team data functionality
- Member onboarding workflows
