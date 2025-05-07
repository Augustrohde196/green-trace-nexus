
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar,
  Download,
  FileText, 
  FileChartPie,
  DownloadCloud,
  ChevronDown,
  FileChartColumn,
  CalendarDays
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// Define report type interfaces
interface Report {
  id: string;
  title: string;
  type: "scope2" | "custom";
  period: string;
  status: "ready" | "processing" | "scheduled";
  lastUpdated: string;
  fileSize?: string;
  description: string;
  metrics?: {
    totalConsumption?: string;
    totalRenewable?: string;
    renewablePercentage?: string;
    timeMatchingScore?: string;
    marketBasedEmissions?: string;
  };
  sourceBreakdown?: {
    source: string;
    percentage: number;
  }[];
}

const CorporateReporting = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState<string>("scope2");
  const [timeframe, setTimeframe] = useState<string>("month");
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  // Mock reports data
  const reports: Report[] = [
    {
      id: "S2-2025-Q1",
      title: "Q1 2025 Renewable Energy Certificate Report",
      type: "scope2",
      period: "Q1 2025",
      status: "ready",
      lastUpdated: "April 4, 2025",
      fileSize: "3.2 MB",
      description: "Scope 2 Emissions report for Q1 2025 including renewable energy procurement details, time-matching analysis, and emissions calculations.",
      metrics: {
        totalConsumption: "453.2 MWh",
        totalRenewable: "442.7 MWh",
        renewablePercentage: "97.7%",
        timeMatchingScore: "82.4%",
        marketBasedEmissions: "1.2 tCO2e"
      },
      sourceBreakdown: [
        { source: "Wind", percentage: 64 },
        { source: "Solar", percentage: 28 },
        { source: "Hydro", percentage: 8 }
      ]
    },
    {
      id: "S2-2025-MAR",
      title: "March 2025 Renewable Energy Certificate Report",
      type: "scope2",
      period: "March 2025",
      status: "ready",
      lastUpdated: "April 2, 2025",
      fileSize: "2.8 MB",
      description: "Monthly Scope 2 Emissions report for March 2025 including renewable energy procurement details and emissions calculations.",
      metrics: {
        totalConsumption: "152.6 MWh",
        totalRenewable: "152.6 MWh",
        renewablePercentage: "100%",
        timeMatchingScore: "85.3%",
        marketBasedEmissions: "0 tCO2e"
      },
      sourceBreakdown: [
        { source: "Wind", percentage: 68 },
        { source: "Solar", percentage: 25 },
        { source: "Hydro", percentage: 7 }
      ]
    },
    {
      id: "S2-2025-FEB",
      title: "February 2025 Renewable Energy Certificate Report",
      type: "scope2",
      period: "February 2025",
      status: "ready",
      lastUpdated: "March 3, 2025",
      fileSize: "2.7 MB",
      description: "Monthly Scope 2 Emissions report for February 2025 including renewable energy procurement details and emissions calculations.",
      metrics: {
        totalConsumption: "142.3 MWh",
        totalRenewable: "140.1 MWh",
        renewablePercentage: "98.5%",
        timeMatchingScore: "79.8%",
        marketBasedEmissions: "0.42 tCO2e"
      }
    },
    {
      id: "S2-2025-JAN",
      title: "January 2025 Renewable Energy Certificate Report",
      type: "scope2",
      period: "January 2025",
      status: "ready",
      lastUpdated: "February 2, 2025",
      fileSize: "2.5 MB",
      description: "Monthly Scope 2 Emissions report for January 2025 including renewable energy procurement details and emissions calculations.",
      metrics: {
        totalConsumption: "158.3 MWh",
        totalRenewable: "150.0 MWh",
        renewablePercentage: "94.8%",
        timeMatchingScore: "82.1%",
        marketBasedEmissions: "0.78 tCO2e"
      }
    },
    {
      id: "S2-2025-MAY",
      title: "May 2025 Renewable Energy Certificate Report",
      type: "scope2",
      period: "May 2025",
      status: "scheduled",
      lastUpdated: "Scheduled for June 1, 2025",
      description: "Monthly Scope 2 Emissions report for May 2025 including renewable energy procurement details and emissions calculations."
    }
  ];
  
  const timePeriods = [
    { label: "Current Month", value: "month" },
    { label: "Last Quarter", value: "quarter" },
    { label: "Year to Date", value: "ytd" },
    { label: "Custom Range", value: "custom" },
  ];
  
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleGenerateReport = () => {
    setGeneratingReport(true);
    
    // Mock report generation
    setTimeout(() => {
      setGeneratingReport(false);
      
      toast({
        title: "Report Generated Successfully",
        description: `Your ${reportType === "scope2" ? "Scope 2 Emissions" : "Custom"} report for the selected period is ready.`
      });
      
      // Show the most recent report
      setSelectedReport(reports[0]);
      setIsReportModalOpen(true);
    }, 2000);
  };
  
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };
  
  const handleDownloadReport = (format: "pdf" | "csv") => {
    toast({
      title: `${format.toUpperCase()} Download Started`,
      description: `Your report is being downloaded in ${format.toUpperCase()} format.`
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Ready</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Processing</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Scheduled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reporting & Export</h2>
          <p className="text-muted-foreground">
            Generate and download reports for compliance and disclosure
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generate Report
            </CardTitle>
            <CardDescription>Create new reports for compliance and disclosure</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="scope2">Renewable Energy Certificate Report (Scope 2)</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <div className="text-xs text-muted-foreground mt-1">
                <span>GHG Protocol compliant Scope 2 emissions report</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {timePeriods.map(period => (
                      <SelectItem key={period.value} value={period.value}>{period.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <div className="text-xs text-muted-foreground mt-1">
                <span>
                  {timeframe === 'month' && 'Data from the current calendar month'}
                  {timeframe === 'quarter' && 'Data from the current quarter'}
                  {timeframe === 'ytd' && 'All data from January 1st until now'}
                  {timeframe === 'custom' && 'Select a custom date range'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="csv">CSV Data Export</SelectItem>
                    <SelectItem value="both">Both Formats</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <div className="text-xs text-muted-foreground mt-1">
                <span>PDF includes visualizations, CSV contains raw data</span>
              </div>
            </div>
            
            <div className="md:col-span-3 pt-4">
              <Button 
                onClick={handleGenerateReport} 
                disabled={generatingReport}
                className="w-full"
              >
                {generatingReport ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Reports
            </CardTitle>
            <CardDescription>Quick access to your latest reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredReports.slice(0, 3).map((report) => (
              <div key={report.id} className="flex items-center justify-between gap-4 p-2 hover:bg-muted/40 rounded-md -mx-2 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileChartPie className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium truncate max-w-[150px]">{report.period}</div>
                    <div className="text-xs text-muted-foreground">
                      {report.lastUpdated}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewReport(report)} className="gap-1">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>View and download previously generated reports</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarDays size={14} className="mr-2 text-muted-foreground" />
                        {report.period}
                      </div>
                    </TableCell>
                    <TableCell>{report.lastUpdated}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {report.status === "ready" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleViewReport(report)}
                            >
                              <FileText size={14} />
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleDownloadReport("pdf")}
                            >
                              <Download size={14} />
                              PDF
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleDownloadReport("csv")}
                            >
                              <Download size={14} />
                              CSV
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Report Viewer Dialog */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedReport?.title || "Report Preview"}</DialogTitle>
            <DialogDescription>
              {selectedReport?.description || "Detailed report information"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-8 py-4">
              {/* Report Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedReport.title}</h3>
                  <p className="text-sm text-muted-foreground">Generated on {selectedReport.lastUpdated}</p>
                </div>
                {getStatusBadge(selectedReport.status)}
              </div>
              
              <Separator />
              
              {/* Key Metrics */}
              {selectedReport.metrics && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {selectedReport.metrics.totalConsumption && (
                      <Card className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground">
                            Total Consumption
                          </div>
                          <div className="text-xl font-bold mt-1">{selectedReport.metrics.totalConsumption}</div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {selectedReport.metrics.totalRenewable && (
                      <Card className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground">
                            Renewable Energy
                          </div>
                          <div className="text-xl font-bold mt-1">{selectedReport.metrics.totalRenewable}</div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {selectedReport.metrics.renewablePercentage && (
                      <Card className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground">
                            Renewable %
                          </div>
                          <div className="text-xl font-bold mt-1">{selectedReport.metrics.renewablePercentage}</div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {selectedReport.metrics.timeMatchingScore && (
                      <Card className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground">
                            Time Matching
                          </div>
                          <div className="text-xl font-bold mt-1">{selectedReport.metrics.timeMatchingScore}</div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {selectedReport.metrics.marketBasedEmissions && (
                      <Card className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground">
                            Market-Based Emissions
                          </div>
                          <div className="text-xl font-bold mt-1">{selectedReport.metrics.marketBasedEmissions}</div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}
              
              {/* Source Breakdown */}
              {selectedReport.sourceBreakdown && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Renewable Energy Sources</h4>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {selectedReport.sourceBreakdown.map((source, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{source.source}</span>
                              <span className="text-sm">{source.percentage}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className="h-2.5 rounded-full bg-primary" 
                                style={{ width: `${source.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Emissions Note */}
              <div className="bg-muted/30 rounded-md p-4 border border-muted">
                <h4 className="text-sm font-medium mb-2">Compliance Information</h4>
                <p className="text-sm text-muted-foreground">
                  This report follows the GHG Protocol Scope 2 Guidance for market-based accounting. All renewable energy certificates are sourced from verified Guarantee of Origin (GO) certificates. 
                  {selectedReport.metrics?.renewablePercentage !== "100%" && (
                    <span className="block mt-2">
                      <strong>Note:</strong> {selectedReport.metrics?.renewablePercentage !== "100%" ? `${100 - parseFloat(selectedReport.metrics?.renewablePercentage || "0")}%` : "0%"} of 
                      consumption was not matched by renewable energy and is accounted for using grid average emission factors.
                    </span>
                  )}
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="gap-2" onClick={() => handleDownloadReport("csv")}>
                  <DownloadCloud className="h-4 w-4" />
                  Download CSV Data
                </Button>
                <Button className="gap-2" onClick={() => handleDownloadReport("pdf")}>
                  <FileChartColumn className="h-4 w-4" />
                  Download PDF Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CorporateReporting;
