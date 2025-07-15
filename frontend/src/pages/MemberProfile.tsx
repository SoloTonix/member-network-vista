import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Building,
  CreditCard,
  Users,
  TreePine,
  Eye
} from "lucide-react";

// Mock data - in real app, this would come from database
const mockMemberData = {
  1: {
    id: 1,
    fullName: "John Doe",
    codeId: "JD001",
    email: "john.doe@example.com",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    address: "123 Main Street, New York, NY 10001",
    occupation: "Software Engineer",
    dateOfBirth: "1990-05-15",
    bankName: "Chase Bank",
    bankAccountNo: "1234567890",
    referralPhone: "+1234567895",
    referralCodeId: "REF001",
    nextOfKinName: "Jane Doe",
    nextOfKinPhone: "+1234567891",
    nextOfKinEmail: "jane.doe@example.com",
    nextOfKinAddress: "456 Oak Avenue, Brooklyn, NY 11201",
    stage: 1,
    registrationDate: "2024-01-15",
    downlines: [
      { id: 2, fullName: "Jane Smith", codeId: "JS002", stage: 2 },
      { id: 3, fullName: "Mike Johnson", codeId: "MJ003", stage: 1 },
      { id: 6, fullName: "Alice Cooper", codeId: "AC006", stage: 1 }
    ]
  }
};

const MemberProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const memberId = parseInt(id || "1");
  const member = mockMemberData[memberId as keyof typeof mockMemberData];

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="shadow-card max-w-md">
          <CardContent className="py-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Member not found</h3>
            <p className="text-muted-foreground mb-4">
              The member you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/directory")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStageColor = (stage: number) => {
    switch (stage) {
      case 1: return "bg-success text-success-foreground";
      case 2: return "bg-warning text-warning-foreground";
      case 3: return "bg-info text-info-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-elegant border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/directory")}
              className="transition-smooth hover:shadow-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Button>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{member.fullName}</h1>
                <p className="text-muted-foreground font-mono">{member.codeId}</p>
              </div>
              <Badge className={getStageColor(member.stage)}>
                Stage {member.stage}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Personal & Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{member.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{member.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
                      <p className="font-medium">{member.whatsapp}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{member.dateOfBirth}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Occupation</p>
                      <p className="font-medium">{member.occupation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Registration Date</p>
                      <p className="font-medium">{member.registrationDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{member.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Banking Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Banking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bank Name</p>
                      <p className="font-medium">{member.bankName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Account Number</p>
                      <p className="font-medium font-mono">{member.bankAccountNo}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next of Kin Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Next of Kin Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{member.nextOfKinName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{member.nextOfKinPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{member.nextOfKinEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{member.nextOfKinAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Referral Info */}
          <div className="space-y-6">
            {/* Referral Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="w-5 h-5" />
                  Referral Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Referral Code</p>
                      <p className="font-medium font-mono">{member.referralCodeId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Referral Phone</p>
                      <p className="font-medium">{member.referralPhone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Downline Network */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Direct Downlines
                </CardTitle>
                <CardDescription>
                  Members directly referred by {member.fullName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {member.downlines.length > 0 ? (
                  <div className="space-y-3">
                    {member.downlines.map((downline) => (
                      <div
                        key={downline.id}
                        className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg hover:shadow-glow transition-smooth cursor-pointer"
                        onClick={() => navigate(`/member/${downline.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-primary w-8 h-8 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{downline.fullName}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {downline.codeId}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStageColor(downline.stage)} variant="outline">
                            Stage {downline.stage}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No direct downlines yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberProfile;