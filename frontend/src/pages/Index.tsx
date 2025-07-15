import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, TreePine, Shield, Upload } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: UserPlus,
      title: "Member Registration",
      description: "Register new members with complete profile information",
      action: () => navigate("/register"),
      color: "bg-gradient-primary"
    },
    {
      icon: Users,
      title: "Member Directory",
      description: "Browse and search through all registered members",
      action: () => navigate("/directory"),
      color: "bg-gradient-subtle"
    },
    {
      icon: TreePine,
      title: "Referral Network",
      description: "View referral trees and network connections",
      action: () => navigate("/network"),
      color: "bg-gradient-card"
    },
    {
      icon: Shield,
      title: "Admin Dashboard",
      description: "Manage members and view analytics",
      action: () => navigate("/admin"),
      color: "bg-gradient-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-elegant border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Member Network</h1>
              <p className="text-muted-foreground mt-1">Referral Management System</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/directory")}
                className="transition-smooth hover:shadow-glow"
              >
                <Users className="w-4 h-4 mr-2" />
                Directory
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-bounce"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register Member
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-primary text-transparent bg-clip-text mb-4">
            <h2 className="text-5xl font-bold">Welcome to Your Network</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your referral network, track member progress, and build your community with our comprehensive management system.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="cursor-pointer transition-smooth hover:shadow-glow hover:shadow-card group"
              onClick={feature.action}
            >
              <CardHeader className="text-center">
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-bounce`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">1,234</h3>
              <p className="text-muted-foreground">Total Members</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-success mb-2">456</h3>
              <p className="text-muted-foreground">Active Referrals</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-info mb-2">7</h3>
              <p className="text-muted-foreground">Network Levels</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Notice */}
        <Card className="bg-gradient-subtle border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-warning/20 p-3 rounded-full">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Admin Features Available</h3>
                <p className="text-muted-foreground">
                  Connect to Supabase to enable admin authentication, database storage, and Excel upload functionality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;