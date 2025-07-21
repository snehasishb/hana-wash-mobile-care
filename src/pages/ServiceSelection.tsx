import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Droplets, Wind, Sparkles, Check } from "lucide-react";

const ServiceSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { location: serviceLocation, vehicle } = location.state || {};
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    {
      id: "jetwash",
      name: "Jet Wash",
      description: "High-pressure water cleaning for thorough dirt removal",
      icon: Droplets,
      price: "₹200",
      duration: "30 min",
      popular: true,
      features: ["High-pressure cleaning", "Undercarriage wash", "Wheel cleaning"]
    },
    {
      id: "drywash",
      name: "Dry Wash",
      description: "Waterless cleaning solution, eco-friendly option",
      icon: Wind,
      price: "₹150",
      duration: "45 min",
      popular: false,
      features: ["Waterless technology", "Eco-friendly", "Safe for all surfaces"]
    },
    {
      id: "polishing",
      name: "Polishing",
      description: "Premium polish for that showroom shine",
      icon: Sparkles,
      price: "₹300",
      duration: "60 min",
      popular: true,
      features: ["Premium wax", "UV protection", "Long-lasting shine"]
    }
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) return;
    
    navigate("/booking", { 
      state: { 
        location: serviceLocation, 
        vehicle, 
        services: selectedServices 
      } 
    });
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + parseInt(service?.price.replace('₹', '') || '0');
    }, 0);
  };

  const getVehicleName = (vehicleType: string) => {
    const names = {
      hatchback: "Hatchback",
      sedan: "Sedan/Sub4mtrs", 
      suv: "SUV",
      bike: "Motorcycle"
    };
    return names[vehicleType] || vehicleType;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-primary">Select Services</h1>
            <p className="text-sm text-muted-foreground">
              {getVehicleName(vehicle)} • {serviceLocation === "home" ? "Home Service" : "Service Center"}
            </p>
          </div>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Services</h2>
            <p className="text-muted-foreground">Select one or more services for your {getVehicleName(vehicle)}</p>
          </div>

          <div className="grid gap-6">
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              const IconComponent = service.icon;
              
              return (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all hover:shadow-elegant relative ${
                    isSelected ? "ring-2 ring-primary shadow-elegant" : ""
                  }`}
                  onClick={() => toggleService(service.id)}
                >
                  {service.popular && (
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isSelected ? "bg-primary" : "bg-muted"}`}>
                          <IconComponent className={`h-6 w-6 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {service.name}
                            {isSelected && <Check className="h-5 w-5 text-success" />}
                          </CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{service.price}</div>
                        <div className="text-sm text-muted-foreground">{service.duration}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary and Continue */}
          {selectedServices.length > 0 && (
            <div className="mt-8">
              <Card className="bg-gradient-primary text-white">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Selected Services</h3>
                      <p className="text-white/80">
                        {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₹{getTotalPrice()}</div>
                      <div className="text-white/80 text-sm">Total Amount</div>
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    className="w-full" 
                    size="lg"
                    onClick={handleContinue}
                  >
                    Continue to Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;