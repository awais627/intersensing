# Settings Page

A comprehensive user profile and account management page for the Intersensing platform.

## Features

### 1. Profile Management
- **Personal Information**: First name, last name, email, phone number
- **Profile Picture**: Avatar display with online status indicator
- **Account Details**: Role, department, member since, last login
- **Edit Mode**: Toggle between view and edit modes
- **Form Validation**: Real-time validation with error messages

### 2. Password Management
- **Current Password**: Verify existing password
- **New Password**: Strong password requirements
- **Password Strength Indicator**: Visual strength meter (Very Weak to Strong)
- **Password Requirements**: Real-time checklist validation
- **Show/Hide Passwords**: Toggle password visibility for all fields
- **Form Validation**: Comprehensive password validation rules

### 3. User Experience
- **Tabbed Interface**: Clean separation between profile and password sections
- **Responsive Design**: Works on mobile and desktop
- **Real-time Feedback**: Success messages and error handling
- **Loading States**: Submit button with loading spinner
- **Form Reset**: Automatic form clearing after successful submission

## Profile Fields

### Editable Fields
- **First Name**: Required text input
- **Last Name**: Required text input  
- **Email**: Required email with format validation
- **Phone Number**: Required phone with format validation

### Read-only Fields
- **User ID**: System-generated identifier
- **Role**: User's job title/position
- **Department**: User's organizational unit
- **Member Since**: Account creation date
- **Last Login**: Most recent login timestamp

## Password Requirements

The system enforces strong password policies:

1. **Minimum Length**: 8 characters
2. **Character Types**:
   - Lowercase letters (a-z)
   - Uppercase letters (A-Z)
   - Numbers (0-9)
   - Special characters (@$!%*?&)
3. **Validation Rules**:
   - New password must differ from current
   - Passwords must match confirmation
   - Real-time strength assessment

## Demo Data

The page includes sample user profile data:
- **Name**: John Doe
- **Role**: Senior IoT Engineer
- **Department**: Engineering
- **Email**: john.doe@intersensing.com
- **Phone**: +1 (555) 123-4567
- **Avatar**: Professional headshot
- **Status**: Online (green indicator)

## Navigation

Access the settings page via:
- Sidebar navigation → Settings
- Direct URL: `/settings`

## Technical Implementation

- **TypeScript interfaces** for type safety
- **React hooks** for state management
- **Tailwind CSS** for styling
- **Form validation** with comprehensive error handling
- **Password strength algorithm** with visual indicators
- **Responsive grid layouts** for optimal display
- **Icon integration** with React Icons
- **Date formatting** with date-fns

## Future Enhancements

- Profile picture upload functionality
- Two-factor authentication settings
- Notification preferences
- Privacy and security settings
- Account deletion options
- Activity log and login history
- Integration with authentication services
- Multi-language support
