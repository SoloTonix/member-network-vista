import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MemberRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    codeId: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    occupation: "",
    dateOfBirth: "",
    bankName: "",
    bankAccountNo: "",
    referralPhone: "",
    referralCodeId: "",
    nextOfKinName: "",
    nextOfKinPhone: "",
    nextOfKinEmail: "",
    nextOfKinAddress: "",
    stage: "1"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mock submission - in real app, this would save to database
    console.log("Member Registration Data:", formData);
    
    toast({
      title: "Member Registered Successfully!",
      description: `${formData.fullName} has been added to the system with Code ID: ${formData.codeId}`,
    });
    
    // Reset form
    setFormData({
      fullName: "",
      codeId: "",
      email: "",
      phone: "",
      whatsapp: "",
      address: "",
      occupation: "",
      dateOfBirth: "",
      bankName: "",
      bankAccountNo: "",
      referralPhone: "",
      referralCodeId: "",
      nextOfKinName: "",
      nextOfKinPhone: "",
      nextOfKinEmail: "",
      nextOfKinAddress: "",
      stage: "1"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-elegant border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="transition-smooth hover:shadow-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Member Registration</h1>
              <p className="text-muted-foreground">Add a new member to the network</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Basic member details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codeId">Code ID *</Label>
                    <Input
                      id="codeId"
                      name="codeId"
                      value={formData.codeId}
                      onChange={handleInputChange}
                      placeholder="Enter unique code ID"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="Enter WhatsApp number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      placeholder="Enter occupation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stage">Stage Number</Label>
                    <Input
                      id="stage"
                      name="stage"
                      type="number"
                      value={formData.stage}
                      onChange={handleInputChange}
                      placeholder="Enter stage number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Banking Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Banking Information</CardTitle>
                <CardDescription>
                  Bank account details for financial transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankAccountNo">Bank Account Number</Label>
                    <Input
                      id="bankAccountNo"
                      name="bankAccountNo"
                      value={formData.bankAccountNo}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Referral Information</CardTitle>
                <CardDescription>
                  Details about who referred this member
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="referralPhone">Referral's Phone Number</Label>
                    <Input
                      id="referralPhone"
                      name="referralPhone"
                      type="tel"
                      value={formData.referralPhone}
                      onChange={handleInputChange}
                      placeholder="Enter referral's phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referralCodeId">Referral's Code ID</Label>
                    <Input
                      id="referralCodeId"
                      name="referralCodeId"
                      value={formData.referralCodeId}
                      onChange={handleInputChange}
                      placeholder="Enter referral's code ID"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next of Kin Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Next of Kin Information</CardTitle>
                <CardDescription>
                  Emergency contact and next of kin details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nextOfKinName">Next of Kin Name</Label>
                    <Input
                      id="nextOfKinName"
                      name="nextOfKinName"
                      value={formData.nextOfKinName}
                      onChange={handleInputChange}
                      placeholder="Enter next of kin name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextOfKinPhone">Next of Kin Phone</Label>
                    <Input
                      id="nextOfKinPhone"
                      name="nextOfKinPhone"
                      type="tel"
                      value={formData.nextOfKinPhone}
                      onChange={handleInputChange}
                      placeholder="Enter next of kin phone"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nextOfKinEmail">Next of Kin Email</Label>
                    <Input
                      id="nextOfKinEmail"
                      name="nextOfKinEmail"
                      type="email"
                      value={formData.nextOfKinEmail}
                      onChange={handleInputChange}
                      placeholder="Enter next of kin email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nextOfKinAddress">Next of Kin Address</Label>
                  <Textarea
                    id="nextOfKinAddress"
                    name="nextOfKinAddress"
                    value={formData.nextOfKinAddress}
                    onChange={handleInputChange}
                    placeholder="Enter next of kin address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-bounce px-8 py-3 text-lg"
              >
                <Save className="w-5 h-5 mr-2" />
                Register Member
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MemberRegistration;