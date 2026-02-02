import type { User, Property, Unit, Application, Lease, Payment, MaintenanceRequest, Message } from '@/types';
import { usersApi, propertiesApi, unitsApi, applicationsApi, leasesApi, paymentsApi, maintenanceApi, messagesApi } from './api';

// Generate comprehensive sample data for testing
export const generateSampleData = async () => {
  try {
    console.log('Generating comprehensive sample data...');

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

    const landlord3 = await usersApi.create({
      email: 'james.muriuki@gmail.com',
      firstName: 'James',
      lastName: 'Muriuki',
      phone: '+254 711 234 567',
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

    const tenant3 = await usersApi.create({
      email: 'david.njoroge@gmail.com',
      firstName: 'David',
      lastName: 'Njoroge',
      phone: '+254 766 890 123',
      role: 'tenant',
      status: 'active',
    });

    const tenant4 = await usersApi.create({
      email: 'susan.mutua@gmail.com',
      firstName: 'Susan',
      lastName: 'Mutua',
      phone: '+254 777 901 234',
      role: 'tenant',
      status: 'active',
    });

    // 3. Create properties
    const prop1 = await propertiesApi.create({
      name: 'Kilimani Heights',
      address: '123 Argwings Kodhek Road',
      city: 'Nairobi',
      county: 'Nairobi',
      description: 'Modern apartment complex in the heart of Kilimani with excellent amenities and security. Close to shopping centers, restaurants, and public transport.',
      imageUrls: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
      ],
      landlordId: landlord1.data!.id,
      totalUnits: 24,
      occupiedUnits: 0,
      amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Backup Generator', 'High-Speed Internet', 'Solar Water Heating'],
      status: 'active',
    });

    const prop2 = await propertiesApi.create({
      name: 'Westlands Gardens',
      address: '456 Waiyaki Way',
      city: 'Nairobi',
      county: 'Nairobi',
      description: 'Luxury apartments with modern finishes and great city views. Premium location with easy access to Westlands business district.',
      imageUrls: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'
      ],
      landlordId: landlord2.data!.id,
      totalUnits: 18,
      occupiedUnits: 0,
      amenities: ['Gym', 'Parking', 'Solar Water Heating', 'High-Speed Internet', 'Rooftop Terrace', 'Concierge Service'],
      status: 'active',
    });

    const prop3 = await propertiesApi.create({
      name: 'Lavington Green Apartments',
      address: '789 Lavington Crescent',
      city: 'Nairobi',
      county: 'Nairobi',
      description: 'Serene environment with lush gardens and modern amenities. Perfect for families looking for quiet living with city access.',
      imageUrls: [
        'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
      ],
      landlordId: landlord3.data!.id,
      totalUnits: 30,
      occupiedUnits: 0,
      amenities: ['Children Playground', 'Gym', 'Parking', 'Garden', 'Backup Generator', 'High-Speed Internet'],
      status: 'active',
    });

    // 4. Create units for each property
    // Kilimani Heights Units
    const units = [];
    for (let floor = 1; floor <= 4; floor++) {
      // Studio units
      units.push(await unitsApi.create({
        propertyId: prop1.data!.id,
        unitNumber: `A-${floor}01`,
        type: 'studio',
        bedrooms: 0,
        bathrooms: 1,
        squareMeters: 30,
        rentAmount: 18000,
        depositAmount: 36000,
        status: 'available',
        floor,
        amenities: ['Built-in Wardrobes', 'Balcony'],
        imageUrls: ['https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'],
      }));

      // 1BR units
      units.push(await unitsApi.create({
        propertyId: prop1.data!.id,
        unitNumber: `A-${floor}02`,
        type: '1br',
        bedrooms: 1,
        bathrooms: 1,
        squareMeters: 45,
        rentAmount: 25000,
        depositAmount: 50000,
        status: 'available',
        floor,
        amenities: ['Balcony', 'Built-in Wardrobes', 'Open Kitchen'],
        imageUrls: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
      }));

      // 2BR units
      units.push(await unitsApi.create({
        propertyId: prop1.data!.id,
        unitNumber: `A-${floor}03`,
        type: '2br',
        bedrooms: 2,
        bathrooms: 2,
        squareMeters: 65,
        rentAmount: 35000,
        depositAmount: 70000,
        status: 'available',
        floor,
        amenities: ['Balcony', 'Built-in Wardrobes', 'DSQ', 'Master Ensuite'],
        imageUrls: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
      }));
    }

    // Westlands Gardens Units
    for (let floor = 1; floor <= 3; floor++) {
      units.push(await unitsApi.create({
        propertyId: prop2.data!.id,
        unitNumber: `B-${floor}01`,
        type: '1br',
        bedrooms: 1,
        bathrooms: 1,
        squareMeters: 50,
        rentAmount: 30000,
        depositAmount: 60000,
        status: 'available',
        floor,
        amenities: ['City View', 'Built-in Wardrobes', 'High-End Finishes'],
        imageUrls: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80'],
      }));

      units.push(await unitsApi.create({
        propertyId: prop2.data!.id,
        unitNumber: `B-${floor}02`,
        type: '2br',
        bedrooms: 2,
        bathrooms: 2,
        squareMeters: 75,
        rentAmount: 45000,
        depositAmount: 90000,
        status: 'available',
        floor,
        amenities: ['City View', 'DSQ', 'Master Ensuite', 'Walk-in Closet'],
        imageUrls: ['https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'],
      }));
    }

    // Lavington Green Units
    for (let floor = 1; floor <= 3; floor++) {
      units.push(await unitsApi.create({
        propertyId: prop3.data!.id,
        unitNumber: `C-${floor}01`,
        type: '2br',
        bedrooms: 2,
        bathrooms: 1,
        squareMeters: 60,
        rentAmount: 28000,
        depositAmount: 56000,
        status: 'available',
        floor,
        amenities: ['Garden View', 'Built-in Wardrobes', 'Family Bathroom'],
        imageUrls: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'],
      }));

      units.push(await unitsApi.create({
        propertyId: prop3.data!.id,
        unitNumber: `C-${floor}02`,
        type: '3br',
        bedrooms: 3,
        bathrooms: 2,
        squareMeters: 85,
        rentAmount: 40000,
        depositAmount: 80000,
        status: 'available',
        floor,
        amenities: ['Garden View', 'DSQ', 'Master Ensuite', 'Family Room'],
        imageUrls: ['https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'],
      }));
    }

    // 5. Create sample applications
    const app1 = await applicationsApi.create({
      unitId: units[1].data!.id, // First 1BR unit
      tenantId: tenant1.data!.id,
      employmentStatus: 'Employed',
      monthlyIncome: 80000,
      emergencyContact: 'Jane Ochieng',
      emergencyPhone: '+254 744 678 902',
      moveInDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });

    const app2 = await applicationsApi.create({
      unitId: units[4].data!.id, // First 2BR unit
      tenantId: tenant2.data!.id,
      employmentStatus: 'Self-Employed',
      monthlyIncome: 120000,
      emergencyContact: 'Robert Akinyi',
      emergencyPhone: '+254 755 789 013',
      moveInDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    });

    // 6. Create active leases for some tenants
    const lease1 = await leasesApi.create({
      unitId: units[0].data!.id, // Studio unit
      tenantId: tenant3.data!.id,
      startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months ago
      endDate: new Date(Date.now() + 305 * 24 * 60 * 60 * 1000).toISOString(), // ~1 year from start
      rentAmount: 18000,
      depositAmount: 36000,
      paymentFrequency: 'monthly',
      status: 'active',
      terms: 'Standard lease agreement for 12 months with option to renew.',
    });

    const lease2 = await leasesApi.create({
      unitId: units[6].data!.id, // Another 1BR unit
      tenantId: tenant4.data!.id,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
      endDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(), // ~1 year from start
      rentAmount: 30000,
      depositAmount: 60000,
      paymentFrequency: 'monthly',
      status: 'active',
      terms: 'Premium lease agreement with included parking space.',
    });

    // Update unit status for leased units
    await unitsApi.update(units[0].data!.id, { status: 'occupied' });
    await unitsApi.update(units[6].data!.id, { status: 'occupied' });

    // 7. Create payment history
    const now = new Date();
    for (let i = 0; i < 3; i++) {
      // Past payments for tenant3
      await paymentsApi.create({
        leaseId: lease1.data!.id,
        tenantId: tenant3.data!.id,
        amount: 18000,
        dueDate: new Date(now.getFullYear(), now.getMonth() - (2 - i), 1).toISOString(),
        paidDate: new Date(now.getFullYear(), now.getMonth() - (2 - i), 5).toISOString(),
        status: 'paid',
        method: 'mpesa',
        transactionRef: `MPESA${Date.now()}${i}`,
      });

      // Past payments for tenant4
      await paymentsApi.create({
        leaseId: lease2.data!.id,
        tenantId: tenant4.data!.id,
        amount: 30000,
        dueDate: new Date(now.getFullYear(), now.getMonth() - (1 - i), 1).toISOString(),
        paidDate: new Date(now.getFullYear(), now.getMonth() - (1 - i), 3).toISOString(),
        status: 'paid',
        method: 'bank_transfer',
        transactionRef: `BANK${Date.now()}${i}`,
      });
    }

    // Current month payments (pending)
    await paymentsApi.create({
      leaseId: lease1.data!.id,
      tenantId: tenant3.data!.id,
      amount: 18000,
      dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
      status: 'pending',
      method: 'mpesa',
    });

    await paymentsApi.create({
      leaseId: lease2.data!.id,
      tenantId: tenant4.data!.id,
      amount: 30000,
      dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
      status: 'pending',
      method: 'bank_transfer',
    });

    // 8. Create maintenance requests
    await maintenanceApi.create({
      unitId: units[0].data!.id,
      tenantId: tenant3.data!.id,
      category: 'plumbing',
      title: 'Leaking Kitchen Tap',
      description: 'The kitchen tap has been leaking for the past 2 days. Needs urgent attention.',
      priority: 'medium',
      imageUrls: [],
    });

    await maintenanceApi.create({
      unitId: units[6].data!.id,
      tenantId: tenant4.data!.id,
      category: 'electrical',
      title: 'Bedroom Light Not Working',
      description: 'The main bedroom light fixture stopped working. Changed bulb but still not working.',
      priority: 'low',
      imageUrls: [],
    });

    await maintenanceApi.create({
      unitId: units[1].data!.id,
      tenantId: tenant1.data!.id,
      category: 'hvac',
      title: 'AC Not Cooling Properly',
      description: 'Air conditioner is running but not cooling the room effectively.',
      priority: 'high',
      imageUrls: [],
    });

    // 9. Create messages between users
    await messagesApi.send({
      senderId: tenant1.data!.id,
      receiverId: landlord1.data!.id,
      subject: 'Question about parking',
      content: 'Hello, I wanted to ask if there are additional parking spaces available for visitors?',
    });

    await messagesApi.send({
      senderId: landlord1.data!.id,
      receiverId: tenant1.data!.id,
      subject: 'Re: Question about parking',
      content: 'Hi! Yes, we have visitor parking available at KES 200 per day. First 2 hours are free.',
    });

    await messagesApi.send({
      senderId: tenant3.data!.id,
      receiverId: landlord1.data!.id,
      subject: 'Maintenance Request Follow-up',
      content: 'Just following up on the leaking tap issue. Is someone coming to fix it today?',
    });

    await messagesApi.send({
      senderId: tenant2.data!.id,
      receiverId: landlord2.data!.id,
      subject: 'Application Status',
      content: 'Hi, I submitted an application for unit B-102. Wanted to check on the status.',
    });

    console.log('Comprehensive sample data generated successfully!');
    console.log(`Created: 3 landlords, 4 tenants, 3 properties, ${units.length} units, 2 applications, 2 leases, multiple payments, maintenance requests, and messages.`);
    return true;
  } catch (error) {
    console.error('Failed to generate sample data:', error);
    return false;
  }
};
