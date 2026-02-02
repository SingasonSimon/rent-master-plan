import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  DollarSign,
  Home,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/mock-data';
import { useState, useEffect } from 'react';
import { unitApi, propertyApi } from '@/lib/api';
import type { Unit, Property } from '@/types';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [unit, setUnit] = useState<Unit | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarUnits, setSimilarUnits] = useState<Unit[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      try {
        const [unitsRes, propsRes] = await Promise.all([
          unitApi.getAll(),
          propertyApi.getAll(),
        ]);
        
        if (unitsRes.data && propsRes.data) {
          const foundUnit = unitsRes.data.find((u) => u.id === id);
          const foundProperty = foundUnit ? propsRes.data.find((p) => p.id === foundUnit.propertyId) : null;
          
          setUnit(foundUnit || null);
          setProperty(foundProperty || null);
          setAllProperties(propsRes.data);
          
          // Load similar units
          if (foundUnit) {
            const similar = unitsRes.data
              .filter((u) => u.id !== foundUnit.id && u.status === 'available')
              .slice(0, 3);
            setSimilarUnits(similar);
          }
        }
      } catch (error) {
        console.error('Failed to load listing:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const allImages = [...( unit?.imageUrls || []), ...(property?.imageUrls || [])];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!unit || !property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Home className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Listing Not Found</h2>
            <p className="mb-4 text-muted-foreground">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/listings">
              <Button>Browse Listings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">RentEase</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Images */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${property.name} - Unit ${unit.unitNumber}`}
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Image Navigation */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={prevImage}
                  disabled={allImages.length <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={nextImage}
                  disabled={allImages.length <= 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={allImages[index]}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {property.name}
                </CardTitle>
                <CardDescription>{property.address}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{unit.type}</Badge>
                  <Badge variant="outline">Unit {unit.unitNumber}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>{unit.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span>{unit.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-4 w-4 text-muted-foreground" />
                    <span>{unit.squareMeters} sqm</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {unit.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Property Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+254 700 000 000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>info@rentease.co.ke</span>
                </div>
                <div className="flex gap-2">
                  <Link to="/login">
                    <Button variant="outline" className="flex-1">
                      Sign in to Apply
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Listings */}
        {similarUnits.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Similar Listings</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarUnits.map((u) => {
                const unitProperty = allProperties.find(p => p.id === u.propertyId);
                return (
                  <Card key={u.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted">
                      <img
                        src={u.imageUrls[0] || unitProperty?.imageUrls[0]}
                        alt={`${unitProperty?.name || 'Property'} - Unit ${u.unitNumber}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-1 font-semibold">{unitProperty?.name || 'Property'}</h3>
                      <p className="mb-2 text-sm text-muted-foreground">Unit {u.unitNumber}</p>

                      <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {unitProperty?.city || 'Location'}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          {formatCurrency(u.rentAmount)}/mo
                        </span>
                        <Link to={`/listings/${u.id}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
