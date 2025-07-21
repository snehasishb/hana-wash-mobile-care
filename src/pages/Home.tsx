import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Home as HomeIcon, Phone } from "lucide-react";
import heroImage from "@/assets/hero-car-wash.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    // Navigate to vehicle selection with location
    navigate("/vehicle-selection", { state: { location } });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Hana Car Solutions</h1>
            <p className="text-sm text-muted-foreground">Professional Automotive Care</p>
          </div>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4" />
            Contact
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-80 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Professional car washing service" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-4">Premium Car Wash Services</h2>
            <p className="text-xl text-white/90 mb-6">Choose between home service or visit our service center</p>
          </div>
        </div>
      </section>

      {/* Service Location Selection */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Choose Your Service</h3>
            <p className="text-lg text-muted-foreground">Select how you'd like to receive our premium car care services</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Home Service */}
            <Card className="cursor-pointer transition-all hover:shadow-elegant hover:scale-105" 
                  onClick={() => handleLocationSelect("home")}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <HomeIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Home Service</CardTitle>
                <CardDescription>We come to your location</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Enjoy professional car wash services at the comfort of your home or office
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>✓ Convenient & Time-saving</li>
                  <li>✓ Professional Equipment</li>
                  <li>✓ Water & Power Supply Included</li>
                </ul>
                <Button variant="gradient" className="w-full">
                  Choose Home Service
                </Button>
              </CardContent>
            </Card>

            {/* Service Center */}
            <Card className="cursor-pointer transition-all hover:shadow-elegant hover:scale-105" 
                  onClick={() => handleLocationSelect("center")}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-accent rounded-full w-16 h-16 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Service Center</CardTitle>
                <CardDescription>Visit our professional facility</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Visit our fully equipped service center for comprehensive car care
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>✓ Complete Facility</li>
                  <li>✓ Advanced Equipment</li>
                  <li>✓ Expert Technicians</li>
                </ul>
                <Button variant="accent" className="w-full">
                  Visit Service Center
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Service Center Address */}
          <div className="mt-8 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground">Service Center Location</p>
                <p className="text-sm text-muted-foreground">
                  Near Monalisa Hotel, Badambadi, Cuttack
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;