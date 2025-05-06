import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { 
  FileText, Download, Calendar, 
  Search, Eye, ChevronDown, 
} from "lucide-react";
import { mockCustomers } from "@/data/mock-data";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Define types for our reports
interface Report {
  id: string;
  name: string;
  date: string;
  type: 'allocation' | 'traceability' | 'compliance';
  status: string;
  description: string;
  charts?: Array<{
    type: string;
    title: string;
  }>;
  metrics?: {
    [key: string]: string | number;
  };
  customers?: number;
  assets?: number;
  data?: {
    customers?: string[];
    allocations?: number[];
    [key: string]: unknown;
  };
}

export default function Reporting() {
  const [reportType, setReportType] = useState<string>("allocation");
  const [timeframe, setTimeframe] = useState<string>("month");
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("allocation");
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setTimeout(() => {
      setGeneratingReport(false);
    }, 2000);
  };
  
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setReportDialogOpen(true);
  };
  
  // Mock report data
  const allocationReports: Report[] = [
    {
      id: "rep001",
      name: "April 2025 GO Allocation Summary",
      date: "2025-04-30",
      type: "allocation",
      status: "complete",
      customers: 8,
      description: "Monthly summary of GO allocations across all customers for April 2025",
      charts: [
        { type: "bar", title: "Customer Allocation Breakdown" },
        { type: "pie", title: "Energy Source Distribution" }
      ],
      metrics: {
        totalVolume: "324.5 MWh",
        timeMatchingScore: "83%",
        customerCount: 8,
        averageAllocation: "40.6 MWh"
      },
      data: {
        customers: ["Customer A", "Customer B", "Customer C", "Customer D", "Customer E", "Customer F", "Customer G", "Customer H"],
        allocations: [45, 42, 38, 35, 29, 22, 18, 11]
      }
    },
    {
      id: "rep002",
      name: "March 2025 GO Allocation Summary",
      date: "2025-03-31",
      type: "allocation",
      status: "complete",
      customers: 7,
      description: "Monthly summary of GO allocations across all customers for March 2025",
      charts: [
        { type: "bar", title: "Customer Allocation Breakdown" },
        { type: "pie", title: "Energy Source Distribution" }
      ],
      metrics: {
        totalVolume: "298.2 MWh",
        timeMatchingScore: "79%",
        customerCount: 7,
        averageAllocation: "42.6 MWh"
      }
    },
    {
      id: "rep003",
      name: "Q1 2025 GO Allocation Summary",
      date: "2025-03-31",
      type: "allocation",
      status: "complete",
      customers: 7,
      description: "Quarterly summary of GO allocations across all customers for Q1 2025",
      charts: [
        { type: "bar", title: "Customer Allocation Breakdown" },
        { type: "line", title: "Monthly Allocation Trend" }
      ],
      metrics: {
        totalVolume: "876.4 MWh",
        timeMatchingScore: "81%",
        customerCount: 7,
        averageAllocation: "125.2 MWh"
      }
    },
  ];
  
  const traceabilityReports: Report[] = [
    {
      id: "rep004",
      name: "Wind Farm A Traceability Report",
      date: "2025-04-30",
      type: "traceability",
      status: "complete",
      assets: 1,
      description: "Detailed traceability report for Wind Farm A showing all customer allocations",
      charts: [
        { type: "pie", title: "Customer Distribution" },
        { type: "bar", title: "Hourly Production" }
      ],
      metrics: {
        totalProduction: "186.2 MWh",
        customerCount: 5,
        averageAllocationScore: "88%",
        peakProduction: "12.4 MWh/h"
      }
    },
    {
      id: "rep005",
      name: "Solar Park B Traceability Report",
      date: "2025-04-30",
      type: "traceability",
      status: "complete",
      assets: 1,
      description: "Detailed traceability report for Solar Park B showing all customer allocations",
      charts: [
        { type: "pie", title: "Customer Distribution" },
        { type: "bar", title: "Daily Production" }
      ],
      metrics: {
        totalProduction: "138.3 MWh",
        customerCount: 6,
        averageAllocationScore: "79%",
        peakProduction: "9.2 MWh/h"
      }
    },
    {
      id: "rep006",
      name: "Q1 2025 Asset Traceability Report",
      date: "2025-03-31",
      type: "traceability",
      status: "complete",
      assets: 5,
      description: "Quarterly summary of all renewable assets and their customer allocations for Q1 2025",
      charts: [
        { type: "pie", title: "Asset Type Distribution" },
        { type: "line", title: "Monthly Production Trend" }
      ],
      metrics: {
        totalProduction: "742.8 MWh",
        assetCount: 5,
        averageAllocationScore: "82%",
        customerCount: 9
      }
    },
  ];
  
  const complianceReports: Report[] = [
    {
      id: "rep007",
      name: "April 2025 Regulatory Compliance Export",
      date: "2025-04-30",
      type: "compliance",
      status: "complete",
      description: "Monthly regulatory compliance report for April 2025 with all GO certificates",
      metrics: {
        totalCertificates: 32,
        totalVolume: "324.5 MWh",
        complianceScore: "100%"
      }
    },
    {
      id: "rep008",
      name: "Q1 2025 Regulatory Compliance Export",
      date: "2025-03-31",
      type: "compliance",
      status: "complete",
      description: "Quarterly regulatory compliance report for Q1 2025 with all GO certificates",
      metrics: {
        totalCertificates: 87,
        totalVolume: "876.4 MWh",
        complianceScore: "100%"
      }
    },
  ];

  const timePeriods = [
    { label: "Current Month", value: "month" },
    { label: "Last Quarter", value: "quarter" },
    { label: "Year to Date", value: "ytd" },
    { label: "Custom Range", value: "custom" },
  ];
  
  const reportsByType: Record<string, Report[]> = {
    allocation: allocationReports,
    traceability: traceabilityReports,
    compliance: complianceReports,
  };
  
  const getReportsByTab = (tabValue: string): Report[] => {
    return reportsByType[tabValue] || [];
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Reporting & Export</h2>
        <p className="text-muted-foreground">
          Generate and download reports for analysis and compliance
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generate Report
            </CardTitle>
            <CardDescription>Create new reports for download</CardDescription>
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
                    <SelectItem value="allocation">GO Allocation Summary</SelectItem>
                    <SelectItem value="traceability">Asset-to-Customer Traceability</SelectItem>
                    <SelectItem value="compliance">Regulatory Compliance Data</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              {reportType === "allocation" && (
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  {/*<BarChart3 className="h-3.5 w-3.5 text-primary" />*/}
                  <span>Shows consumption vs. supply and time-matching score for each customer</span>
                </div>
              )}
              
              {reportType === "traceability" && (
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  {/*<LineChart className="h-3.5 w-3.5 text-primary" />*/}
                  <span>Maps which customers receive energy from each asset and how much</span>
                </div>
              )}
              
              {reportType === "compliance" && (
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  {/*<CheckCircle className="h-3.5 w-3.5 text-primary" />*/}
                  <span>Export GO allocation data with timestamps for regulatory audit</span>
                </div>
              )}
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
              
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {/*<CalendarClock className="h-3.5 w-3.5 text-primary" />*/}
                <span>
                  {timeframe === 'month' && 'Data from the current calendar month'}
                  {timeframe === 'quarter' && 'Data from the current quarter'}
                  {timeframe === 'ytd' && 'All data from January 1st until now'}
                  {timeframe === 'custom' && 'Select a custom date range'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Format & Delivery</label>
              <Select defaultValue="pdf">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="csv">CSV Export</SelectItem>
                    <SelectItem value="excel">Excel Workbook</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {/*<FileCheck className="h-3.5 w-3.5 text-primary" />*/}
                <span>Reports are also saved to your account</span>
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
              <ChevronDown className="h-5 w-5 text-primary" />
              Recent Reports
            </CardTitle>
            <CardDescription>Quick access to your latest reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {allocationReports.slice(0, 3).map((report) => (
              <div key={report.id} className="flex items-center justify-between gap-4 p-2 hover:bg-muted/40 rounded-md -mx-2 transition-colors">
                <div className="flex items-center gap-3">
                  {/*{report.type === 'allocation' && <BarChart3 className="h-8 w-8 text-blue-500 bg-blue-100/60 p-1.5 rounded" />}
                  {report.type === 'traceability' && <LineChart className="h-8 w-8 text-green-500 bg-green-100/60 p-1.5 rounded" />}
                  {report.type === 'compliance' && <CheckCircle className="h-8 w-8 text-purple-500 bg-purple-100/60 p-1.5 rounded" />}*/}
                  <div>
                    <div className="font-medium truncate max-w-[150px]">{report.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(report.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewReport(report)} className="gap-1">
                  <Eye size={14} />
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs 
          defaultValue="allocation" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="allocation" className="flex items-center gap-1">
                {/*<BarChart3 className="h-4 w-4" />*/}
                Allocation Reports
              </TabsTrigger>
              <TabsTrigger value="traceability" className="flex items-center gap-1">
                {/*<LineChart className="h-4 w-4" />*/}
                Traceability Reports
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-1">
                {/*<CheckCircle className="h-4 w-4" />*/}
                Compliance Data
              </TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex items-center gap-2">
              <Input 
                placeholder="Search reports..." 
                className="w-[200px]" 
              />
              <Button variant="outline" size="sm">
                Search
              </Button>
            </div>
          </div>
          
          <TabsContent value="allocation" className="mt-0">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>GO Allocation Summary Reports</CardTitle>
                <CardDescription>Monthly and quarterly summaries of GO allocations to customers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customers</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allocationReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-muted/20">
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-2 text-muted-foreground" />
                              {new Date(report.date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>{report.customers}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              {/*<CheckCircle size={12} className="mr-1" />*/}
                              Complete
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => handleViewReport(report)}
                              >
                                <FileText size={14} />
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <FileText size={14} />
                                PDF
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <Download size={14} />
                                CSV
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="traceability" className="mt-0">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Asset-to-Customer Traceability Reports</CardTitle>
                <CardDescription>Detailed traceability mapping between assets and customers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Assets</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {traceabilityReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-muted/20">
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-2 text-muted-foreground" />
                              {new Date(report.date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>{report.assets}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              {/*<CheckCircle size={12} className="mr-1" />*/}
                              Complete
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => handleViewReport(report)}
                              >
                                <FileText size={14} />
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <FileText size={14} />
                                PDF
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <Download size={14} />
                                CSV
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-0">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Regulatory Compliance Data</CardTitle>
                <CardDescription>Exports for regulatory audit purposes</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complianceReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-muted/20">
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-2 text-muted-foreground" />
                              {new Date(report.date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              {/*<CheckCircle size={12} className="mr-1" />*/}
                              Complete
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => handleViewReport(report)}
                              >
                                <FileText size={14} />
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <Download size={14} />
                                CSV
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Report Viewer Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedReport?.name || "Report Preview"}</DialogTitle>
            <DialogDescription>
              {selectedReport?.description || "Detailed report information"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-8 py-4">
              {/* Report Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedReport.name}</h3>
                  <p className="text-sm text-muted-foreground">Generated on {new Date(selectedReport.date).toLocaleDateString()}</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <span className="mr-1">✓</span>
                  Complete
                </Badge>
              </div>
              
              <Separator />
              
              {/* Key Metrics */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedReport.metrics && Object.entries(selectedReport.metrics).map(([key, value]) => (
                    <Card key={key} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-xl font-bold mt-1">{String(value)}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Chart Placeholders */}
              {selectedReport.charts && selectedReport.charts.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Charts & Visualizations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedReport.charts.map((chart, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="font-medium mb-2">{chart.title}</div>
                          <div className="h-[200px] bg-muted/40 rounded-md flex items-center justify-center">
                            {chart.type === 'bar' && <ChevronDown className="h-12 w-12 text-muted-foreground/50" />}
                            {chart.type === 'pie' && <ChevronDown className="h-12 w-12 text-muted-foreground/50" />}
                            {chart.type === 'line' && <ChevronDown className="h-12 w-12 text-muted-foreground/50" />}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Example Data Table */}
              {selectedReport.data && selectedReport.data.customers && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Data Summary</h4>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="text-right">Allocation (MWh)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedReport.data.customers.map((customer, index) => (
                          <TableRow key={index}>
                            <TableCell>{customer}</TableCell>
                            <TableCell className="text-right">
                              {selectedReport.data?.allocations?.[index]}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
