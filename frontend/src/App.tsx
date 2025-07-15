import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MemberRegistration from "./pages/MemberRegistration";
import MemberDirectory from "./pages/MemberDirectory";
import MemberProfile from "./pages/MemberProfile";
import AdminDashboard from "./pages/AdminDashboard";
import ReferralNetwork from "./pages/ReferralNetwork";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<MemberRegistration />} />
          <Route path="/directory" element={<MemberDirectory />} />
          <Route path="/member/:id" element={<MemberProfile />} /> 
          <Route path="/network" element={<ReferralNetwork />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
