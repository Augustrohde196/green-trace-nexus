
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
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
import { FileText, Download, FileCheck, FileSpreadsheet, Calendar, CalendarClock, CheckCircle } from "lucide-react";
import { mockCustomers } from "@/data/mock-data";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Reporting() {
  const [reportType, setReportType] = useState<string>("allocation");
  const [timeframe, setTimeframe] = useState<string>("month");
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("allocation");
  
  const handleGenerateReport = () => {
    setGeneratingReport(true);
    
    setTimeout(() => {
      setGeneratingReport(false);
      
      // Show success toast
      toast({
        title: "Report Generated Successfully",
        description: `Your ${getReportTypeName(reportType)} report has been generated.`,
      });
      
      // Simulate download
      if (reportType && timeframe) {
        simulateDownload(reportType, "pdf");
      }
    }, 2000);
  };

  const getReportTypeName = (type: string) => {
    switch(type) {
      case "allocation": return "GO Allocation Summary";
      case "traceability": return "Asset-to-Customer Traceability";
      case "compliance": return "Regulatory Compliance Data";
      default: return "Report";
    }
  };
  
  const simulateDownload = (reportType: string, format: "pdf" | "csv") => {
    const reportName = getReportTypeName(reportType);
    const formatName = format.toUpperCase();
    
    toast({
      title: `${formatName} Downloaded`,
      description: `Your ${reportName} has been downloaded in ${formatName} format.`,
    });
  };
  
  // Mock report data
  const allocationReports = [
    {
      id: "rep001",
      name: "April 2025 GO Allocation Summary",
      date: "2025-04-30",
      type: "allocation",
      status: "complete",
      customers: 8,
    },
    {
      id: "rep002",
      name: "March 2025 GO Allocation Summary",
      date: "2025-03-31",
      type: "allocation",
      status: "complete",
      customers: 7,
    },
    {
      id: "rep003",
      name: "Q1 2025 GO Allocation Summary",
      date: "2025-03-31",
      type: "allocation",
      status: "complete",
      customers: 7,
    },
  ];
  
  const traceabilityReports = [
    {
      id: "rep004",
      name: "Wind Farm A Traceability Report",
      date: "2025-04-30",
      type: "traceability",
      status: "complete",
      assets: 1,
    },
    {
      id: "rep005",
      name: "Solar Park B Traceability Report",
      date: "2025-04-30",
      type: "traceability",
      status: "complete",
      assets: 1,
    },
    {
      id: "rep006",
      name: "Q1 2025 Asset Traceability Report",
      date: "2025-03-31",
      type: "traceability",
      status: "complete",
      assets: 5,
    },
  ];
  
  const complianceReports = [
    {
      id: "rep007",
      name: "April 2025 Regulatory Compliance Export",
      date: "2025-04-30",
      type: "compliance",
      status: "complete",
    },
    {
      id: "rep008",
      name: "Q1 2025 Regulatory Compliance Export",
      date: "2025-03-31",
      type: "compliance",
      status: "complete",
    },
  ];

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
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generate Report
            </CardTitle>
            <CardDescription>Create new reports for download</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              
              <div className="text-xs text-muted-foreground mt-1">
                {reportType === "allocation" && "Shows consumption vs. supply and time-matching score for each customer"}
                {reportType === "traceability" && "Maps which customers receive energy from each asset and how much"}
                {reportType === "compliance" && "Export GO allocation data with timestamps for regulatory audit"}
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
                    <SelectItem value="month">Current Month</SelectItem>
                    <SelectItem value="quarter">Current Quarter</SelectItem>
                    <SelectItem value="year">Current Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col sm:flex-row pt-4 gap-3">
              <Button 
                onClick={handleGenerateReport} 
                disabled={generatingReport}
                className="flex-1 gap-2"
              >
                <FileText size={16} />
                {generatingReport ? 
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"></div>
                    <span>Generating...</span>
                  </div> : 
                  "Generate Report"
                }
              </Button>
              
              <div className="flex gap-2 flex-1 sm:justify-end">
                <Button 
                  variant="outline" 
                  disabled={generatingReport} 
                  className="gap-2"
                  onClick={() => simulateDownload(reportType, "csv")}
                >
                  <FileSpreadsheet size={16} />
                  CSV
                </Button>
                <Button 
                  variant="outline" 
                  disabled={generatingReport} 
                  className="gap-2"
                  onClick={() => simulateDownload(reportType, "pdf")}
                >
                  <FileCheck size={16} />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Download Formats
            </CardTitle>
            <CardDescription>Available export options for your reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="border rounded-md p-4 hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileCheck size={24} className="text-blue-600" />
                  <div className="font-medium">PDF Export</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Formatted PDF with charts and visualizations, ideal for business presentations and regulatory submissions.
                </p>
              </motion.div>
              
              <motion.div 
                className="border rounded-md p-4 hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileSpreadsheet size={24} className="text-green-600" />
                  <div className="font-medium">CSV Export</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Raw data in CSV format for detailed analysis in spreadsheet applications.
                </p>
              </motion.div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Report Contents</h4>
              <ul className="space-y-2 text-sm">
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <CheckCircle size={16} className="text-green-500 mt-0.5" />
                  <span>Customer consumption vs. renewable supply</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <CheckCircle size={16} className="text-green-500 mt-0.5" />
                  <span>Energy mix visualization (wind/solar proportion)</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <CheckCircle size={16} className="text-green-500 mt-0.5" />
                  <span>Time-matching scores and analysis</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <CheckCircle size={16} className="text-green-500 mt-0.5" />
                  <span>Asset-to-customer flow mapping</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <CheckCircle size={16} className="text-green-500 mt-0.5" />
                  <span>GO retirement status and verification</span>
                </motion.li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="w-full md:w-auto bg-muted/50 p-1 rounded-md">
            <TabsTrigger 
              value="allocation" 
              className={`${activeTab === "allocation" ? "bg-primary text-primary-foreground" : ""} transition-all`}
            >
              Allocation Reports
            </TabsTrigger>
            <TabsTrigger 
              value="traceability" 
              className={`${activeTab === "traceability" ? "bg-primary text-primary-foreground" : ""} transition-all`}
            >
              Traceability Reports
            </TabsTrigger>
            <TabsTrigger 
              value="compliance" 
              className={`${activeTab === "compliance" ? "bg-primary text-primary-foreground" : ""} transition-all`}
            >
              Compliance Data
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="allocation" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>GO Allocation Summary Reports</CardTitle>
                <CardDescription>Monthly and quarterly summaries of GO allocations to customers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
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
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2 text-muted-foreground" />
                            {new Date(report.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>{report.customers}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 pointer-events-none">
                            <CheckCircle size={12} className="mr-1" />
                            Complete
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => simulateDownload("allocation", "pdf")}
                            >
                              <FileCheck size={14} />
                              PDF
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => simulateDownload("allocation", "csv")}
                            >
                              <FileSpreadsheet size={14} />
                              CSV
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="traceability" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset-to-Customer Traceability Reports</CardTitle>
                <CardDescription>Detailed traceability mapping between assets and customers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
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
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2 text-muted-foreground" />
                            {new Date(report.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>{report.assets}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 pointer-events-none">
                            <CheckCircle size={12} className="mr-1" />
                            Complete
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => simulateDownload("traceability", "pdf")}
                            >
                              <FileCheck size={14} />
                              PDF
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => simulateDownload("traceability", "csv")}
                            >
                              <FileSpreadsheet size={14} />
                              CSV
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance Data</CardTitle>
                <CardDescription>Exports for regulatory audit purposes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complianceReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2 text-muted-foreground" />
                            {new Date(report.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 pointer-events-none">
                            <CheckCircle size={12} className="mr-1" />
                            Complete
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => simulateDownload("compliance", "csv")}
                            >
                              <FileSpreadsheet size={14} />
                              CSV
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
