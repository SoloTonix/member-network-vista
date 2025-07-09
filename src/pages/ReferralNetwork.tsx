import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  TreePine,
  Users,
  Eye,
  ChevronRight,
  ChevronDown,
  User
} from "lucide-react";

// Mock network data
const mockNetworkData = {
  "JD001": {
    id: 1,
    fullName: "John Doe",
    codeId: "JD001",
    stage: 1,
    level: 0,
    children: [
      {
        id: 2,
        fullName: "Jane Smith",
        codeId: "JS002",
        stage: 2,
        level: 1,
        children: [
          {
            id: 3,
            fullName: "Mike Johnson",
            codeId: "MJ003",
            stage: 1,
            level: 2,
            children: [
              {
                id: 4,
                fullName: "Sarah Wilson",
                codeId: "SW004",
                stage: 3,
                level: 3,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 5,
        fullName: "David Brown",
        codeId: "DB005",
        stage: 2,
        level: 1,
        children: [
          {
            id: 6,
            fullName: "Alice Cooper",
            codeId: "AC006",
            stage: 1,
            level: 2,
            children: []
          },
          {
            id: 7,
            fullName: "Bob Wilson",
            codeId: "BW007",
            stage: 1,
            level: 2,
            children: []
          }
        ]
      }
    ]
  }
};

interface NetworkNode {
  id: number;
  fullName: string;
  codeId: string;
  stage: number;
  level: number;
  children: NetworkNode[];
}

const NetworkTreeNode = ({ 
  node, 
  onViewProfile, 
  expanded, 
  onToggleExpanded 
}: { 
  node: NetworkNode;
  onViewProfile: (id: number) => void;
  expanded: boolean;
  onToggleExpanded: (codeId: string) => void;
}) => {
  const getStageColor = (stage: number) => {
    switch (stage) {
      case 1: return "bg-success text-success-foreground";
      case 2: return "bg-warning text-warning-foreground";
      case 3: return "bg-info text-info-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getLevelIndent = (level: number) => {
    return level * 24;
  };

  return (
    <div className="space-y-2">
      <div 
        className="flex items-center gap-3 p-3 bg-gradient-subtle rounded-lg hover:shadow-glow transition-smooth"
        style={{ marginLeft: `${getLevelIndent(node.level)}px` }}
      >
        {node.children.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpanded(node.codeId)}
            className="p-1 h-6 w-6"
          >
            {expanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        )}
        
        {node.children.length === 0 && (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-2 h-2 bg-muted rounded-full" />
          </div>
        )}

        <div className="bg-gradient-primary w-8 h-8 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium">{node.fullName}</p>
            <Badge className={getStageColor(node.stage)} variant="outline">
              Stage {node.stage}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground font-mono">{node.codeId}</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Level {node.level}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {node.children.length} direct
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewProfile(node.id)}
            className="hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {expanded && node.children.map((child) => (
        <NetworkTreeNode
          key={child.id}
          node={child}
          onViewProfile={onViewProfile}
          expanded={false}
          onToggleExpanded={onToggleExpanded}
        />
      ))}
    </div>
  );
};

const ReferralNetwork = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoot, setSelectedRoot] = useState("JD001");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["JD001"]));

  const handleToggleExpanded = (codeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(codeId)) {
      newExpanded.delete(codeId);
    } else {
      newExpanded.add(codeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleViewProfile = (id: number) => {
    navigate(`/member/${id}`);
  };

  const rootNode = mockNetworkData[selectedRoot as keyof typeof mockNetworkData];

  const calculateNetworkStats = (node: NetworkNode): { totalMembers: number; maxDepth: number } => {
    if (!node.children || node.children.length === 0) {
      return { totalMembers: 1, maxDepth: 0 };
    }

    let totalMembers = 1;
    let maxDepth = 0;

    for (const child of node.children) {
      const childStats = calculateNetworkStats(child);
      totalMembers += childStats.totalMembers;
      maxDepth = Math.max(maxDepth, childStats.maxDepth + 1);
    }

    return { totalMembers, maxDepth };
  };

  const stats = rootNode ? calculateNetworkStats(rootNode) : { totalMembers: 0, maxDepth: 0 };

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
              <h1 className="text-2xl font-bold text-foreground">Referral Network</h1>
              <p className="text-muted-foreground">View and navigate the referral tree structure</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Search and Controls */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Network</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalMembers}</p>
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
                  <p className="text-sm text-muted-foreground">Max Depth</p>
                  <p className="text-2xl font-bold text-success">{stats.maxDepth} levels</p>
                </div>
                <div className="bg-success/10 p-3 rounded-full">
                  <TreePine className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Tree */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="w-5 h-5" />
              Network Tree Structure
            </CardTitle>
            <CardDescription>
              Explore the referral network starting from {rootNode?.fullName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {rootNode ? (
              <div className="space-y-4">
                <NetworkTreeNode
                  node={rootNode}
                  onViewProfile={handleViewProfile}
                  expanded={expandedNodes.has(rootNode.codeId)}
                  onToggleExpanded={handleToggleExpanded}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <TreePine className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No network data found</h3>
                <p className="text-muted-foreground">
                  Select a different root member or check back later.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Network Legend */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle>Network Legend</CardTitle>
            <CardDescription>
              Understanding the network tree structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Stage Colors</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success text-success-foreground">Stage 1</Badge>
                    <span className="text-sm text-muted-foreground">New members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-warning text-warning-foreground">Stage 2</Badge>
                    <span className="text-sm text-muted-foreground">Intermediate level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-info text-info-foreground">Stage 3</Badge>
                    <span className="text-sm text-muted-foreground">Advanced level</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Navigation</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Click the eye icon to view full member profile</p>
                  <p>• Use chevron buttons to expand/collapse branches</p>
                  <p>• Level indicates depth in the referral tree</p>
                  <p>• "Direct" shows immediate downline count</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReferralNetwork;