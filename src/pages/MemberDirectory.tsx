import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, User, Phone, Mail, Eye } from "lucide-react";

// Mock data - in real app, this would come from database
const mockMembers = [
  {
    id: 1,
    fullName: "John Doe",
    codeId: "JD001",
    email: "john.doe@example.com",
    phone: "+1234567890",
    stage: 1,
    referralCodeId: "REF001",
    downlineCount: 5
  },
  {
    id: 2,
    fullName: "Jane Smith",
    codeId: "JS002",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    stage: 2,
    referralCodeId: "JD001",
    downlineCount: 3
  },
  {
    id: 3,
    fullName: "Mike Johnson",
    codeId: "MJ003",
    email: "mike.johnson@example.com",
    phone: "+1234567892",
    stage: 1,
    referralCodeId: "JS002",
    downlineCount: 8
  },
  {
    id: 4,
    fullName: "Sarah Wilson",
    codeId: "SW004",
    email: "sarah.wilson@example.com",
    phone: "+1234567893",
    stage: 3,
    referralCodeId: "MJ003",
    downlineCount: 2
  },
  {
    id: 5,
    fullName: "David Brown",
    codeId: "DB005",
    email: "david.brown@example.com",
    phone: "+1234567894",
    stage: 2,
    referralCodeId: "SW004",
    downlineCount: 12
  }
];

const MemberDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMembers = mockMembers.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.codeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              onClick={() => navigate("/")}
              className="transition-smooth hover:shadow-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Member Directory</h1>
              <p className="text-muted-foreground">Browse and search all registered members</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Members
            </CardTitle>
            <CardDescription>
              Search by name, Code ID, or email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredMembers.length} of {mockMembers.length} members
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card 
              key={member.id}
              className="shadow-card hover:shadow-glow transition-smooth cursor-pointer group"
              onClick={() => navigate(`/member/${member.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                        {member.fullName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-mono">
                        {member.codeId}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStageColor(member.stage)}>
                    Stage {member.stage}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Referral:</span>{" "}
                    <span className="font-mono">{member.referralCodeId}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Downlines:</span>{" "}
                    <span className="font-semibold text-primary">{member.downlineCount}</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/member/${member.id}`);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredMembers.length === 0 && searchTerm && (
          <Card className="shadow-card">
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No members found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto"
                  onClick={() => setSearchTerm("")}
                >
                  clear the search
                </Button>
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MemberDirectory;