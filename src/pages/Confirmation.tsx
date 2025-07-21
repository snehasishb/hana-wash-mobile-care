import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Clock, MapPin, Phone, Home as HomeIcon } from "lucide-react";
import { format } from "date-fns";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) {
    navigate("/");
    return null;
  }

  const serviceNames = {
    jetwash: "Jet Wash",
    drywash: "Dry Wash", 
    polishing: "Polishing"
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

  const planNames = {
    "one-time": "One-time Service",
    "daily": "Daily Plan",
    "monthly": "Monthly Plan"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold text-primary">Booking Confirmation</h1>
          <p className="text-sm text-muted-foreground">Your service has been booked successfully</p>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Success Message */}
          <Card className="text-center bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="pt-8 pb-6">
              <div className="mx-auto mb-4 p-4 bg-success rounded-full w-16 h-16 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-success mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Your car wash service has been successfully booked with Hana Car Solutions
              </p>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Please keep this information for your reference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Service Type & Vehicle */}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Service Type</span>
                <div className="flex items-center gap-2">
                  {booking.location === "home" ? (
                    <><HomeIcon className="h-4 w-4" /> Home Service</>
                  ) : (
                    <><MapPin className="h-4 w-4" /> Service Center</>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Vehicle</span>
                <span className="font-medium">{getVehicleName(booking.vehicle)}</span>
              </div>

              {/* Selected Services */}
              <div className="py-2 border-b">
                <span className="text-muted-foreground">Services</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {booking.services?.map((serviceId: string) => (
                    <Badge key={serviceId} variant="secondary">
                      {serviceNames[serviceId]}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Plan */}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{planNames[booking.plan]}</span>
              </div>

              {/* Date & Time */}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Date</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{format(booking.date, "PPP")}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Time</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{booking.time}</span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center py-3 bg-muted rounded-lg px-4">
                <span className="font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{booking.totalPrice}</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-sm text-muted-foreground">Call us for any queries</p>
                  </div>
                </div>
                
                {booking.location === "center" && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Service Center</p>
                      <p className="text-sm text-muted-foreground">
                        Near Monalisa Hotel, Badambadi, Cuttack
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button variant="gradient" className="w-full" size="lg">
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/")}
            >
              Book Another Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;