import type { User, Property, Unit, Application, Lease, Payment, MaintenanceRequest, Message } from '@/types';
import { usersApi, propertiesApi, unitsApi, applicationsApi, leasesApi, paymentsApi, maintenanceApi, messagesApi } from './api';

// Generate sample data for testing
export const generateSampleData = async () => {
  try {
    console.log('Generating sample data...');

    // 1. Create sample landlords
    const landlord1 = await usersApi.create({
      email: 'peter.kamau@gmail.com',
      firstName: 'Peter',
      lastName: 'Kamau',
      phone: '+254 722 456 789',
      role: 'landlord',
      status: 'active',
    });

    const landlord2 = await usersApi.create({
      email: 'mary.wanjiku@gmail.com',
      firstName: 'Mary',
      lastName: 'Wanjiku',
      phone: '+254 733 567 890',
      role: 'landlord',
      status: 'active',
    });

    // 2. Create sample tenants
    const tenant1 = await usersApi.create({
      email: 'john.ochieng@gmail.com',
      firstName: 'John',
      lastName: 'Ochieng',
      phone: '+254 744 678 901',
      role: 'tenant',
      status: 'active',
    });

    const tenant2 = await usersApi.create({
      email: 'grace.akinyi@gmail.com',
      firstName: 'Grace',
      lastName: 'Akinyi',
      phone: '+254 755 789 012',
      role: 'tenant',
      status: 'active',
    });

    // 3. Create properties
    const prop1 = await propertiesApi.create({
      name: 'Kilimani Heights',
      address: '123 Argwings Kodhek Road',
      city: 'Nairobi',
      county: 'Nairobi',
      description: 'Modern apartment complex in the heart of Kilimani with excellent amenities and security.',
      imageUrls: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
      landlordId: landlord1.data!.id,
      totalUnits: 24,
      occupiedUnits: 0,
      amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Backup Generator'],
      status: 'active',
    });

    const prop2 = await propertiesApi.create({
      name: 'Westlands Gardens',
      address: '456 Waiyaki Way',
      city: 'Nairobi',
      county: 'Nairobi',
      description: 'Luxury apartments with modern finishes and great city views.',
      imageUrls: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80'],
      landlordId: landlord2.data!.id,
      totalUnits: 18,
      occupiedUnits: 0,
      amenities: ['Gym', 'Parking', 'Solar Water Heating', 'High-Speed Internet'],
      status: 'active',
    });

    // 4. Create units
    const unit1 = await unitsApi.create({
      propertyId: prop1.data!.id,
      unitNumber: 'A-101',
      type: '1br',
      bedrooms: 1,
      bathrooms: 1,
      squareMeters: 45,
      rentAmount: 25000,
      depositAmount: 50000,
      status: 'available',
      floor: 1,
      amenities: ['Balcony', 'Built-in Wardrobes'],
      imageUrls: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
    });

    const unit2 = await unitsApi.create({
      propertyId: prop1.data!.id,
      unitNumber: 'A-102',
      type: '2br',
      bedrooms: 2,
      bathrooms: 2,
      squareMeters: 65,
      rentAmount: 35000,
      depositAmount: 70000,
      status: 'available',
      floor: 1,
      amenities: ['Balcony', 'Built-in Wardrobes', 'DSQ'],
      imageUrls: ['https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'],
    });

    const unit3 = await unitsApi.create({
      propertyId: prop2.data!.id,
      unitNumber: 'B-201',
      type: 'studio',
      bedrooms: 0,
      bathrooms: 1,
      squareMeters: 30,
      rentAmount: 18000,
      depositAmount: 36000,
      status: 'available',
      floor: 2,
      amenities: ['Built-in Wardrobes'],
      imageUrls: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    });

    // 5. Create sample applications
    const app1 = await applicationsApi.create({
      unitId: unit1.data!.id,
      tenantId: tenant1.data!.id,
      employmentStatus: 'Employed',
      monthlyIncome: 80000,
      emergencyContact: 'Jane Ochieng',
      emergencyPhone: '+254 744 678 902',
      moveInDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });

    // 6. Create sample maintenance request
    await maintenanceApi.create({
      unitId: unit1.data!.id,
      tenantId: tenant1.data!.id,
      category: 'plumbing',
      title: 'Leaking Kitchen Tap',
      description: 'The kitchen tap has been leaking for the past 2 days. Needs urgent attention.',
      priority: 'medium',
      imageUrls: [],
    });

    // 7. Create sample messages
    await messagesApi.send({
      senderId: tenant1.data!.id,
      receiverId: landlord1.data!.id,
      subject: 'Question about parking',
      content: 'Hello, I wanted to ask if there are additional parking spaces available for visitors.',
    });

    console.log('Sample data generated successfully!');
    return true;
  } catch (error) {
    console.error('Failed to generate sample data:', error);
    return false;
  }
};
