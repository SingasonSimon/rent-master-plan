# Rent Master Plan - Dynamic Prototype Test Flow

This document demonstrates the complete working flow for the **dynamic** rent management prototype with **zero hardcoded data**.

## Initial Setup

### 1. Start Fresh
- The system starts with only **1 admin user**: `admin@rentease.co.ke`
- All other data (properties, units, users) is created dynamically through the UI

### 2. Generate Sample Data (Optional)
1. **Login as Admin**
2. Go to **Settings → System → Data Management**
3. Click **"Generate Sample Data"** to create:
   - 2 Landlords with properties
   - 2 Tenants
   - 3 Properties with multiple units
   - Sample applications and maintenance requests

### 3. Start from Scratch
1. **Login as Admin** 
2. Go to **Settings → System → Data Management**
3. Click **"Clear All Data"** to reset everything except admin user

## Dynamic User Creation

### Create Landlords
1. **Login as Admin**
2. Go to **Users → Add User**
3. Create landlords with role "landlord"
4. Landlords can then log in and add their own properties

### Create Tenants  
1. **Login as Admin** OR enable public registration
2. Go to **Users → Add User**
3. Create tenants with role "tenant"
4. Tenants can then log in, browse properties, and apply

## Complete Flow Test

### 1. Property Setup Flow
1. **Login as Landlord**
   - Go to "Properties" section
   - Add new properties with details
   - Add units to each property (rent amount, deposit, etc.)
   - Set unit status to "available"

### 2. Application Flow
1. **Login as Tenant**
   - Browse available listings
   - Apply for a property
   - Fill application form with employment details, income, etc.

2. **Login as Landlord**
   - Go to "Applications" section
   - See the tenant's application for their properties
   - Click "Recommend" or "Not Recommend" with notes

3. **Login as Admin**
   - Go to "Applications" section
   - See all applications with landlord recommendations
   - Click "Approve" on recommended applications
   - **✅ Lease is automatically created and unit status changes to "occupied"**

4. **Login as Tenant** again
   - Go to "My Leases" section
   - See the active lease agreement
   - View lease terms, rent amount, payment schedule

### 3. Maintenance Request Flow
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

### 4. Messaging Flow
1. **Any user can send messages**
   - Go to "Messages" section
   - Compose new message to any other user
   - Messages are stored in localStorage and appear in recipient's inbox

### 5. User Deletion Flow (Data Integrity)
1. **Login as Admin**
   - Go to "Users" section in admin dashboard
   - Select any user and click "Delete"
   - **✅ All related data is automatically cleaned up:**
     - User's applications are deleted
     - User's leases are deleted and units become available again
     - User's maintenance requests are deleted
     - User's messages (sent and received) are deleted
     - If landlord: All their properties, units, and related data are deleted
     - User's activity logs are cleaned up
     - User is logged out if currently active

## Key Features Working

✅ **Zero Hardcoded Data**: Everything created dynamically through UI
✅ **Dynamic Data Generation**: One-click sample data creation for testing
✅ **Complete Data Reset**: Clear all data except admin user
✅ **Authentication**: Login/logout with role-based access control
✅ **Application Process**: Complete flow from application to lease creation
✅ **Landlord Recommendations**: Landlords can recommend/reject applications
✅ **Admin Approval**: Admin can approve applications and automatically create leases
✅ **Unit Status Management**: Units automatically change from "available" to "occupied"
✅ **Maintenance Requests**: Full lifecycle with status updates and comments
✅ **Messaging**: Basic messaging system between users
✅ **Dashboard Stats**: Real-time statistics for each role
✅ **Data Persistence**: All data stored in localStorage
✅ **Cascading Deletes**: Complete data cleanup when users are deleted
✅ **Data Integrity**: Unit status updates when leases are deleted

## Technical Implementation

- **Backend**: Mock API using localStorage for data persistence
- **Dynamic Data**: No hardcoded mock data - everything created through UI
- **API Delays**: 500ms simulated network latency for realistic feel
- **Data Relationships**: Proper foreign key relationships between users, properties, units, applications, leases, etc.
- **Role-based Access**: Different dashboards and permissions for admin/landlord/tenant roles
- **Automatic Workflows**: Lease creation on application approval, unit status updates, etc.

## Database Options (If you want real DB)

### Option 1: Enhanced localStorage (Current)
✅ **Pros**: Simple, no setup, works offline
❌ **Cons**: Limited to single browser, not scalable

### Option 2: In-Browser SQL Database
- **DuckDB-WASM** or **SQL.js**
✅ **Pros**: Real SQL, complex queries, ACID compliance
❌ **Cons**: Browser storage limits, learning curve

### Option 3: Cloud Database (No Backend)
- **Firebase** or **Supabase**
✅ **Pros**: Real database, multi-user, cloud sync
❌ **Cons**: Internet required, account setup

## How to Test

1. **Clear existing data**: Admin → Settings → System → Clear All Data
2. **Generate sample data**: Admin → Settings → System → Generate Sample Data
3. **Follow the flow steps** above
4. **Use different browser tabs** to test multiple users simultaneously
5. **Test data integrity**: Delete users and verify cleanup

The prototype is now **truly dynamic** with zero hardcoded data - perfect for client demonstrations!
