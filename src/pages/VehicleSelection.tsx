import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, Bike } from "lucide-react";

const VehicleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceLocation = location.state?.location || "home";
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const carTypes = [
    {
      id: "hatchback",
      name: "Hatchback",
      description: "Small to medium sized cars",
      icon: "🚗",
      popular: true
    },
    {
      id: "sedan",
      name: "Sedan/Sub4mtrs",
      description: "Standard sedans under 4 meters",
      icon: "🚙",
      popular: false
    },
    {
      id: "suv",
      name: "SUV",
      description: "Large vehicles and SUVs",
      icon: "🚐",
      popular: false
    }
  ];

  const handleVehicleSelect = (vehicleType: string) => {
    setSelectedVehicle(vehicleType);
    navigate("/service-selection", { 
      state: { 
        location: serviceLocation, 
        vehicle: vehicleType 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-primary">Select Your Vehicle</h1>
            <p className="text-sm text-muted-foreground">
              Service Type: {serviceLocation === "home" ? "Home Service" : "Service Center"}
            </p>
          </div>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Vehicle Type</h2>
            <p className="text-muted-foreground">Select the type of vehicle you want to service</p>
          </div>

          <div className="grid gap-6 mb-8">
            {/* Car Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Cars</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {carTypes.map((car) => (
                  <Card 
                    key={car.id}
                    className="cursor-pointer transition-all hover:shadow-elegant hover:scale-105 relative" 
                    onClick={() => handleVehicleSelect(car.id)}
                  >
                    {car.popular && (
                      <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                        Popular
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <div className="text-4xl mb-2">{car.icon}</div>
                      <CardTitle className="text-lg">{car.name}</CardTitle>
                      <CardDescription>{car.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button variant="outline" className="w-full">
                        Select {car.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bike Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent rounded-lg">
                  <Bike className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Bikes</h3>
              </div>
              
              <div className="grid md:grid-cols-1 max-w-md">
                <Card 
                  className="cursor-pointer transition-all hover:shadow-elegant hover:scale-105" 
                  onClick={() => handleVehicleSelect("bike")}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-2">🏍️</div>
                    <CardTitle className="text-lg">Motorcycle</CardTitle>
                    <CardDescription>All types of motorcycles and scooters</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="accent" className="w-full">
                      Select Motorcycle
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;