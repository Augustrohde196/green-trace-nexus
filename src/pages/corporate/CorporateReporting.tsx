import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, 
  Download, 
  Filter, 
  FileText, 
  Search, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  BarChart, 
  FileBarChart, 
  DownloadCloud,
  Globe,
  Mail,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Fixed import path

// Define report type interfaces
interface Report {
  id: string;
  title: string;
  type: "sustainability" | "consumption" | "impact" | "summary";
  period: string;
  status: "ready" | "processing" | "scheduled";
  lastUpdated: string;
  fileSize?: string;
  description: string;
}

const CorporateReporting = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  const reports: Report[] = [
    {
      id: "SUST-2025-Q2-001",
      title: "Q2 2025 Sustainability Report",
      type: "sustainability",
      period: "Q2 2025",
      status: "ready",
      lastUpdated: "May 4, 2025",
      fileSize: "3.4 MB",
      description: "Comprehensive overview of your organization's sustainability metrics for Q2 2025. This report includes carbon emissions data, renewable energy usage statistics, and sustainability targets progress."
    },
    {
      id: "CONS-2025-04-001",
      title: "April 2025 Energy Consumption Analysis",
      type: "consumption",
      period: "April 2025",
      status: "ready",
      lastUpdated: "May 3, 2025",
      fileSize: "2.1 MB",
      description: "Detailed analysis of your organization's energy consumption patterns for April 2025, including peak usage times, efficiency metrics, and comparison with previous periods."
    },
    {
      id: "IMPC-2025-Q1-001",
      title: "Q1 2025 Environmental Impact Assessment",
      type: "impact",
      period: "Q1 2025",
      status: "ready",
      lastUpdated: "April 15, 2025",
      fileSize: "4.8 MB",
      description: "Assessment of your organization's environmental impact for Q1 2025. Includes carbon footprint calculations, emissions reduction achievements, and environmental compliance status."
    },
    {
      id: "SUMM-2025-Q1-001",
      title: "Q1 2025 Executive Summary",
      type: "summary",
      period: "Q1 2025",
      status: "ready",
      lastUpdated: "April 10, 2025",
      fileSize: "1.2 MB",
      description: "Executive summary of all sustainability and energy metrics for Q1 2025. Designed for leadership and stakeholder communications with high-level insights and key performance indicators."
    },
    {
      id: "SUST-2025-Q1-001",
      title: "Q1 2025 Sustainability Report",
      type: "sustainability",
      period: "Q1 2025",
      status: "ready",
      lastUpdated: "April 5, 2025",
      fileSize: "3.7 MB",
      description: "Comprehensive overview of your organization's sustainability metrics for Q1 2025. This report includes carbon emissions data, renewable energy usage statistics, and sustainability targets progress."
    },
    {
      id: "SUMM-2025-05-001",
      title: "May 2025 Executive Summary",
      type: "summary",
      period: "May 2025",
      status: "processing",
      lastUpdated: "Processing",
      description: "Executive summary of all sustainability and energy metrics for May 2025. Currently being processed and will be available shortly."
    },
    {
      id: "CONS-2025-05-001",
      title: "May 2025 Energy Consumption Analysis",
      type: "consumption",
      period: "May 2025",
      status: "scheduled",
      lastUpdated: "Scheduled for June 1, 2025",
      description: "Detailed analysis of your organization's energy consumption patterns for May 2025. This report is scheduled for generation on June 1, 2025."
    }
  ];
  
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };
  
  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Download started",
      description: `Report ${reportId} is being downloaded.`
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "scheduled":
        return <Badge className="bg-amber-100 text-amber-800">Scheduled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "sustainability":
        return <Globe className="h-5 w-5 text-emerald-500" />;
      case "consumption":
        return <BarChart className="h-5 w-5 text-blue-500" />;
      case "impact":
        return <FileBarChart className="h-5 w-5 text-purple-500" />;
      case "summary":
        return <FileText className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const [activeTab, setActiveTab] = useState<"all" | "sustainability" | "consumption" | "impact" | "summary">("all");
  
  const tabFilteredReports = activeTab === "all" 
    ? filteredReports 
    : filteredReports.filter(report => report.type === activeTab);
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reporting</h2>
          <p className="text-muted-foreground">
            Access and manage your sustainability and energy reports
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export All Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Reports Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reports.filter(r => r.status === "ready").length}</div>
            <p className="text-sm text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Reports Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reports.filter(r => r.status === "processing").length}</div>
            <p className="text-sm text-muted-foreground">Being generated</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              Scheduled Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reports.filter(r => r.status === "scheduled").length}</div>
            <p className="text-sm text-muted-foreground">Upcoming reports</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="text-xl">Your Reports</div>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              May 2025
            </Button>
          </CardTitle>
          <CardDescription>
            Access and download your sustainability and energy reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-[300px]"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-5 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                <TabsTrigger value="consumption">Consumption</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-3 grid grid-cols-12 gap-4 text-sm font-medium">
              <div className="col-span-5">Report</div>
              <div className="col-span-2">Period</div>
              <div className="col-span-2">Last Updated</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            
            <div className="divide-y">
              {tabFilteredReports.length > 0 ? (
                tabFilteredReports.map((report) => (
                  <div 
                    key={report.id} 
                    className="p-3 grid grid-cols-12 gap-4 items-center hover:bg-muted/20 transition-colors"
                  >
                    <div className="col-span-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {getReportTypeIcon(report.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-xs text-muted-foreground">{report.id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-sm">{report.period}</div>
                    <div className="col-span-2 text-sm">{report.lastUpdated}</div>
                    <div className="col-span-1">{getStatusBadge(report.status)}</div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewReport(report)}
                        disabled={report.status !== "ready"}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                        disabled={report.status !== "ready"}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No reports found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schedule a Report</CardTitle>
            <CardDescription>Set up automatic report generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Monthly Consumption Report</h3>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Generates energy consumption reports on the 1st of each month
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Quarterly Sustainability Report</h3>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Generates comprehensive sustainability reports at the end of each quarter
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </div>
            
            <Button className="w-full" onClick={() => toast({ title: "Coming soon", description: "This feature will be available shortly." })}>
              Schedule New Report
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Customize your report templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileBarChart className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Standard Report</h3>
                    <p className="text-sm text-muted-foreground">Basic template with essential metrics</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Globe className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sustainability Report</h3>
                    <p className="text-sm text-muted-foreground">Detailed environmental impact metrics</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Executive Summary</h3>
                    <p className="text-sm text-muted-foreground">Condensed overview for leadership</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => toast({ title: "Coming soon", description: "This feature will be available shortly." })}>
                Create Custom Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Report Preview Dialog */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedReport?.title}</DialogTitle>
            <DialogDescription>
              {selectedReport?.id} • {selectedReport?.period}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-6">
              <div className="bg-muted/20 p-4 rounded-lg">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm text-muted-foreground mb-1">Report ID</div>
                    <div className="font-medium">{selectedReport.id}</div>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm text-muted-foreground mb-1">Type</div>
                    <div className="font-medium capitalize">{selectedReport.type}</div>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm text-muted-foreground mb-1">Period</div>
                    <div className="font-medium">{selectedReport.period}</div>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                    <div className="font-medium">{selectedReport.lastUpdated}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground">{selectedReport.description}</p>
              </div>
              
              <div className="bg-muted/10 rounded-lg border p-8 flex flex-col items-center justify-center">
                <FileBarChart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-1">Report Preview</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  This is a preview of your {selectedReport.title}.
                  Download the full report for complete data and insights.
                </p>
                <div className="flex gap-3">
                  <Button className="gap-2" onClick={() => handleDownloadReport(selectedReport.id)}>
                    <DownloadCloud className="h-4 w-4" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => toast({ title: "Report shared", description: "Report URL copied to clipboard" })}>
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/10 rounded-lg border p-6">
                <h3 className="font-medium mb-4">Report Distribution</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Email this report</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Email sent", description: "Report has been emailed to your address" })}>
                    Send Email
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Schedule regular delivery</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Coming soon", description: "This feature will be available shortly." })}>
                    Set Schedule
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CorporateReporting;
