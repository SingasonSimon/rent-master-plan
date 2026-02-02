# Rent Master Plan - Dynamic Property Management Prototype

A fully functional rent management system prototype with complete workflows, dynamic data generation, and real-time analytics.

## 🚀 Quick Start

### Local Development
```bash
# Clone and install
git clone <YOUR_GIT_URL>
cd rent-master-plan
npm install

# Start development server
npm run dev
```

### Vercel Deployment
```bash
# One-command deployment
./deploy.sh

# Or manually
npm run build
vercel --prod
```

## ✨ Key Features

- **🏠 Complete Property Management**: Properties, units, leases, applications
- **👥 Multi-Role System**: Admin, Landlord, Tenant dashboards
- **📊 Real-Time Analytics**: Live stats and reporting from actual data
- **🔄 Dynamic Data**: Zero hardcoded data - generate sample data instantly
- **💾 Data Integrity**: Cascading deletes and proper relationships
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🔐 Authentication**: Role-based access control
- **💬 Messaging**: In-app communication system
- **🔧 Maintenance**: Complete maintenance request workflow

## 🎯 Perfect For

- **Client Demonstrations**: Show production-ready functionality
- **Investor Pitches**: Complete working prototype
- **User Testing**: Real workflows and interactions
- **Development**: Solid foundation for production build

## 📋 Test the System

1. **Login as Admin**: `admin@rentease.co.ke` (any password)
2. **Generate Sample Data**: Settings → System → Generate Comprehensive Data
3. **Test Workflows**: 
   - Tenant applies for property
   - Landlord recommends application  
   - Admin approves → lease created
   - Maintenance requests and messaging

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS + Lucide Icons
- **State**: React Query + Context API
- **Storage**: localStorage (no backend required)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/           # Admin dashboard components
│   ├── landlord/        # Landlord dashboard components
│   ├── tenant/          # Tenant dashboard components
│   └── ui/              # Base UI components
├── contexts/            # React contexts
├── hooks/               # Custom hooks
├── lib/                 # Utilities and API layer
├── pages/               # Route components
└── types/               # TypeScript definitions
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploy on push

### Manual Deployment
```bash
npm run build
# Deploy `dist` folder to any static host
```

## 🔧 Configuration

- **Vite Config**: Optimized for production
- **Vercel Config**: SPA routing included
- **Build**: Code splitting and optimization
- **Environment**: No env vars required (client-side only)

## 📊 Sample Data

The system includes comprehensive sample data generation:
- 3 Landlords with properties
- 4 Tenants
- 3 Properties with 21 units total
- Active leases with payment history
- Maintenance requests and messages

## 🔄 Data Management

- **Generate Data**: One-click sample data creation
- **Clear Data**: Reset everything except admin user
- **Cascading Deletes**: Proper data cleanup on user deletion
- **Unit Status**: Automatic updates (available ↔ occupied)

## 📱 Mobile Ready

Fully responsive design with:
- Touch-friendly interfaces
- Mobile-optimized navigation
- Adaptive layouts
- Progressive enhancement

## 🎨 UI/UX Features

- Modern, clean interface
- Dark mode support ready
- Loading states and transitions
- Form validation
- Error handling
- Success notifications

## 🚀 Production Ready

- Optimized bundle size
- Code splitting
- SEO meta tags
- Performance monitoring ready
- Error boundaries
- Type safety throughout

## 📝 License

MIT License - feel free to use for commercial projects

---

**Built with ❤️ for modern property management**
