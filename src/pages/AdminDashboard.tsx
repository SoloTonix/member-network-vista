import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Upload, 
  Search,
  Shield,
  BarChart3,
  Download,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock admin data
const mockAdminData = {
  totalMembers: 1234,
  totalReferrals: 456,
  totalStages: 7,
  recentRegistrations: 23,
  topPerformers: [
    { name: "John Doe", codeId: "JD001", referrals: 15, stage: 3 },
    { name: "Jane Smith", codeId: "JS002", referrals: 12, stage: 2 },
    { name: "Mike Johnson", codeId: "MJ003", referrals: 10, stage: 1 }
  ],
  stageDistribution: [
    { stage: 1, count: 500 },
    { stage: 2, count: 300 },
    { stage: 3, count: 200 },
    { stage: 4, count: 150 },
    { stage: 5, count: 84 }
  ]
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login validation
    if (loginData.email === "admin@example.com" && loginData.password === "admin123") {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful!",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "File Upload",
        description: `${file.name} uploaded successfully. Connect to Supabase to process the file.`,
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary text-primary-foreground hover:shadow-glow"
              >
                Login
              </Button>
            </form>
            <div className="mt-4 p-3 bg-gradient-subtle rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Demo credentials:</strong><br />
                Email: admin@example.com<br />
                Password: admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-elegant border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage members and view analytics</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsLoggedIn(false)}
              className="transition-smooth hover:shadow-glow"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold text-primary">{mockAdminData.totalMembers}</p>
                </div>
                <div className="bg-gradient-primary/10 p-3 rounded-full">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                  <p className="text-2xl font-bold text-success">{mockAdminData.totalReferrals}</p>
                </div>
                <div className="bg-success/10 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Network Levels</p>
                  <p className="text-2xl font-bold text-info">{mockAdminData.totalStages}</p>
                </div>
                <div className="bg-info/10 p-3 rounded-full">
                  <BarChart3 className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recent Registrations</p>
                  <p className="text-2xl font-bold text-warning">{mockAdminData.recentRegistrations}</p>
                </div>
                <div className="bg-warning/10 p-3 rounded-full">
                  <Users className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bulk Upload */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Bulk Upload Members
              </CardTitle>
              <CardDescription>
                Upload Excel or CSV files to add multiple members at once
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop files here or click to browse
                </p>
                <Input
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </Label>
              </div>
              <div className="p-3 bg-gradient-subtle rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Connect to Supabase to enable file processing and database storage.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Performers
              </CardTitle>
              <CardDescription>
                Members with the most referrals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAdminData.topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-primary w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{performer.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{performer.codeId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{performer.referrals} referrals</p>
                      <Badge variant="outline">Stage {performer.stage}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stage Distribution */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Stage Distribution
            </CardTitle>
            <CardDescription>
              Number of members per stage level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAdminData.stageDistribution.map((stage) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">
                    Stage {stage.stage}
                  </div>
                  <div className="flex-1 bg-gradient-subtle rounded-full h-6 relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${(stage.count / mockAdminData.totalMembers) * 100}%` }}
                    />
                  </div>
                  <div className="w-16 text-sm font-medium text-right">
                    {stage.count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;