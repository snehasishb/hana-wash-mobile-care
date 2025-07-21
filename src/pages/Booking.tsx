import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { location: serviceLocation, vehicle, services } = location.state || {};
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("one-time");

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const plans = [
    {
      id: "one-time",
      name: "One-time Service",
      description: "Single service booking",
      discount: 0
    },
    {
      id: "daily",
      name: "Daily Plan",
      description: "Service every day for a month",
      discount: 15
    },
    {
      id: "monthly",
      name: "Monthly Plan", 
      description: "Service once a month for 6 months",
      discount: 25
    }
  ];

  const serviceNames = {
    jetwash: "Jet Wash",
    drywash: "Dry Wash",
    polishing: "Polishing"
  };

  const servicePrices = {
    jetwash: 200,
    drywash: 150,
    polishing: 300
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

  const getTotalPrice = () => {
    const basePrice = services?.reduce((total: number, serviceId: string) => {
      return total + (servicePrices[serviceId] || 0);
    }, 0) || 0;

    const selectedPlanData = plans.find(p => p.id === selectedPlan);
    const discount = selectedPlanData?.discount || 0;
    
    return Math.round(basePrice * (1 - discount / 100));
  };

  const generateBookingId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `HC${timestamp.toString().slice(-8)}${random.toString().padStart(3, '0')}`;
  };

  const handleBookService = () => {
    if (!selectedDate || !selectedTime) return;
    
    const bookingId = generateBookingId();
    
    navigate("/confirmation", {
      state: {
        booking: {
          id: bookingId,
          location: serviceLocation,
          vehicle,
          services,
          date: selectedDate,
          time: selectedTime,
          plan: selectedPlan,
          totalPrice: getTotalPrice(),
          customerPhone: localStorage.getItem("userPhone") || ""
        }
      }
    });
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
            <h1 className="text-xl font-bold text-primary">Book Your Service</h1>
            <p className="text-sm text-muted-foreground">
              {getVehicleName(vehicle)} • {serviceLocation === "home" ? "Home Service" : "Service Center"}
            </p>
          </div>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Service Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Selected Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {services?.map((serviceId: string) => (
                  <Badge key={serviceId} variant="secondary" className="text-sm">
                    {serviceNames[serviceId]} - ₹{servicePrices[serviceId]}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plan Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>Select a service plan that suits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{plan.name}</div>
                            <div className="text-sm text-muted-foreground">{plan.description}</div>
                          </div>
                          {plan.discount > 0 && (
                            <Badge variant="secondary" className="ml-2 bg-accent text-accent-foreground">
                              {plan.discount}% OFF
                            </Badge>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose your preferred service date</CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Time</CardTitle>
              <CardDescription>Choose your preferred time slot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-3 w-3" />
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Total and Book Button */}
          <Card className="bg-gradient-primary text-white">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Total Amount</h3>
                  <p className="text-white/80">
                    {selectedPlan !== "one-time" && (
                      <span className="text-sm">
                        {plans.find(p => p.id === selectedPlan)?.discount}% discount applied
                      </span>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">₹{getTotalPrice()}</div>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                className="w-full" 
                size="lg"
                onClick={handleBookService}
                disabled={!selectedDate || !selectedTime}
              >
                Book Service
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;