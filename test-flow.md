# Rent Master Plan - Prototype Test Flow

This document demonstrates the complete working flow for the rent management prototype.

## Test Users Available

### Admin
- **Email**: admin@rentease.co.ke
- **Password**: any (6+ characters)
- **Role**: Can see all applications, approve them, and create leases automatically

### Landlords
- **Email**: peter.kamau@gmail.com
- **Password**: any (6+ characters)
- **Role**: Can see applications for their properties and recommend/reject them

- **Email**: mary.wanjiku@gmail.com  
- **Password**: any (6+ characters)
- **Role**: Can see applications for their properties and recommend/reject them

### Tenants
- **Email**: john.ochieng@gmail.com
- **Password**: any (6+ characters)
- **Role**: Can apply for listings, create maintenance requests, send messages

## Complete Flow Test

### 1. Application Flow
1. **Login as Tenant** (john.ochieng@gmail.com)
   - Browse available listings
   - Apply for a property
   - Fill application form with employment details, income, etc.

2. **Login as Landlord** (peter.kamau@gmail.com)
   - Go to "Applications" section
   - See the tenant's application
   - Click "Recommend" or "Not Recommend" with notes
   - Add comments if needed

3. **Login as Admin** (admin@rentease.co.ke)
   - Go to "Applications" section
   - See all applications with landlord recommendations
   - Click "Approve" on recommended applications
   - **✅ Lease is automatically created and unit status changes to "occupied"**

4. **Login as Tenant** again
   - Go to "My Leases" section
   - See the active lease agreement
   - View lease terms, rent amount, payment schedule

### 2. Maintenance Request Flow
1. **Login as Tenant**
   - Go to "Maintenance" section
   - Create new maintenance request
   - Select category (plumbing, electrical, etc.)
   - Add description and priority level

2. **Login as Landlord**
   - Go to "Maintenance" section
   - See maintenance requests for their properties
   - Update status (Open → In Progress → Completed)
   - Add comments/updates

3. **Login as Admin** (optional)
   - Can see all maintenance requests across all properties
   - Can update status and add comments

### 3. Messaging Flow
1. **Any user can send messages**
   - Go to "Messages" section
   - Compose new message to any other user
   - Messages are stored in localStorage and appear in recipient's inbox

## Key Features Working

✅ **Authentication**: Login/logout with role-based access control
✅ **Application Process**: Complete flow from application to lease creation
✅ **Landlord Recommendations**: Landlords can recommend/reject applications
✅ **Admin Approval**: Admin can approve applications and automatically create leases
✅ **Unit Status Management**: Units automatically change from "available" to "occupied"
✅ **Maintenance Requests**: Full lifecycle with status updates and comments
✅ **Messaging**: Basic messaging system between users
✅ **Dashboard Stats**: Real-time statistics for each role
✅ **Data Persistence**: All data stored in localStorage

## Technical Implementation

- **Backend**: Mock API using localStorage for data persistence
- **API Delays**: 500ms simulated network latency for realistic feel
- **Data Relationships**: Proper foreign key relationships between users, properties, units, applications, leases, etc.
- **Role-based Access**: Different dashboards and permissions for admin/landlord/tenant roles
- **Automatic Workflows**: Lease creation on application approval, unit status updates, etc.

## How to Test

1. Open the browser preview
2. Follow the flow steps above
3. Use different browser tabs or incognito windows to test multiple users simultaneously
4. All data persists across page refreshes (localStorage)

The prototype is now fully functional for client demonstrations!
