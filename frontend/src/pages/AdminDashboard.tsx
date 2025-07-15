// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { adminService } from "@/api/admin";
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

// Mock data for sections not yet implemented in backend
const mockDashboardData = {
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
  const { user, isAdmin, adminStats, login, logout, loading: authLoading } = useAuth();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await adminService.getUsers();
      setUsers(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.username, loginData.password);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUploading(true);
      try {
        // Here you would actually upload to your backend
        // For now we'll just mock the upload
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: "File Uploaded",
          description: `${file.name} has been uploaded successfully`,
        });
        
        // Refresh user data after upload
        await fetchUsers();
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "There was an error processing your file",
          variant: "destructive",
        });
      } finally {
        setFileUploading(false);
      }
    }
  };

  if (!isAdmin && !authLoading) {
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
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
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
                disabled={authLoading}
              >
                {authLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-gradient-subtle rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Use your admin credentials
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading dashboard...</div>
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
                <p className="text-muted-foreground">
                  Welcome back, {user?.username}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={logout}
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
                  <p className="text-2xl font-bold text-primary">
                    {adminStats?.total_members || 0}
                  </p>
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
                  <p className="text-2xl font-bold text-success">
                    {adminStats?.total_referrals || 0}
                  </p>
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
                  <p className="text-2xl font-bold text-info">
                    {adminStats?.total_stages || 0}
                  </p>
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
                  <p className="text-2xl font-bold text-warning">
                    {adminStats?.recent_registrations || 0}
                  </p>
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
                  disabled={fileUploading}
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    disabled={fileUploading}
                  >
                    {fileUploading ? "Uploading..." : "Choose File"}
                  </Button>
                </Label>
              </div>
              <div className="p-3 bg-gradient-subtle rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Supported formats:</strong> CSV, Excel (XLSX)
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
                {adminStats.top_performers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-primary w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{performer.full_name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{performer.code_id}</p>
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
              {adminStats.stage_distribution.map((stage) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">
                    Stage {stage.stage}
                  </div>
                  <div className="flex-1 bg-gradient-subtle rounded-full h-6 relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(stage.count / adminStats?.total_members) * 100 || 0}%` 
                      }}
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

        {/* User Management Table */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
            <CardDescription>
              View and manage all registered users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                className="pl-10 w-full"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingUsers ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : (
                  users
                  .filter(user =>
                    (user.username?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                    (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
                  )
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {new Date(user.date_joined).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.is_active ? "default" : "destructive"}>
                            {user.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;

