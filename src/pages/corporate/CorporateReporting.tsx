
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download, FileText, Calendar, Sliders, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const CorporateReporting = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReportType, setSelectedReportType] = useState("scope2");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  
  const periods = [
    { id: "month", label: "Current Month", description: "Report for May 2025" },
    { id: "quarter", label: "Current Quarter", description: "Report for Q2 2025 (Apr-Jun)" },
    { id: "ytd", label: "Year to Date", description: "Report for Jan-May 2025" },
    { id: "prev-year", label: "Previous Year", description: "Report for 2024" },
    { id: "custom", label: "Custom Period", description: "Specify a date range" }
  ];
  
  const reportTypes = [
    { id: "scope2", label: "Scope 2 Emissions", description: "Market-based GHG emissions reporting" },
    { id: "summary", label: "Portfolio Summary", description: "Overview of your renewable energy portfolio" },
    { id: "detailed", label: "Detailed Breakdown", description: "Hourly data with source attribution" },
    { id: "compliance", label: "Compliance Report", description: "Regulatory compliance documentation" }
  ];
  
  const recentReports = [
    { name: "Scope 2 Emissions - April 2025", date: "May 1, 2025", size: "2.4 MB", format: "PDF" },
    { name: "Portfolio Summary - Q1 2025", date: "April 5, 2025", size: "3.1 MB", format: "PDF" },
    { name: "Hourly Data - March 2025", date: "April 3, 2025", size: "7.8 MB", format: "CSV" },
    { name: "Annual Report - 2024", date: "January 15, 2025", size: "6.2 MB", format: "PDF" }
  ];

  const handleGenerateReport = () => {
    setGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(false);
      setReportGenerated(true);
      toast({
        title: "Report generated successfully",
        description: `Your ${getReportTypeName()} for ${getPeriodName()} is ready to download.`,
      });
    }, 2000);
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Downloading report",
      description: "Your report download has started."
    });
  };
  
  const getReportTypeName = () => {
    return reportTypes.find(type => type.id === selectedReportType)?.label || "Report";
  };
  
  const getPeriodName = () => {
    return periods.find(period => period.id === selectedPeriod)?.label || "Selected period";
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">ESG Reporting</h2>
        <p className="text-muted-foreground">
          Generate sustainability reports and download data for compliance
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Report Generation</CardTitle>
            <CardDescription>Generate standardized reports for sustainability disclosures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Report Type</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {reportTypes.map((type) => (
                  <div 
                    key={type.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedReportType === type.id ? 
                      "border-primary bg-primary/5" : 
                      "hover:border-primary/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedReportType(type.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{type.label}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                      </div>
                      {selectedReportType === type.id && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Time Period</h3>
              <div className="grid gap-3">
                {periods.map((period) => (
                  <div 
                    key={period.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPeriod === period.id ? 
                      "border-primary bg-primary/5" : 
                      "hover:border-primary/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedPeriod(period.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{period.label}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{period.description}</p>
                      </div>
                      {selectedPeriod === period.id && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedPeriod === "custom" && (
                <div className="mt-4 bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="text-sm font-medium">Start Date</label>
                      <input type="date" className="mt-1 w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">End Date</label>
                      <input type="date" className="mt-1 w-full border rounded-md px-3 py-2" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleGenerateReport} disabled={generatingReport}>
              {generatingReport ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Report Preview</CardTitle>
            <CardDescription>
              {reportGenerated ? 
                `Preview of your ${getReportTypeName()}` : 
                "Generate a report to see a preview"}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] flex flex-col items-center justify-center px-6 py-12 text-center">
            {reportGenerated ? (
              <div className="w-full">
                <div className="flex flex-col items-center mb-6">
                  <div className="mb-4 bg-green-100 text-green-700 h-12 w-12 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{getReportTypeName()}</h3>
                  <p className="text-muted-foreground">{getPeriodName()}</p>
                </div>
                
                <div className="border rounded-md p-4 mb-6 text-left">
                  <h4 className="font-medium mb-2">Report Contents:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      Total consumption: 85.6 MWh
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      Renewable coverage: 92%
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      Time-matching score: 78%
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      CO₂ emissions avoided: 36.7t
                    </li>
                  </ul>
                </div>
                
                <Button className="w-full" onClick={handleDownloadReport}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            ) : (
              <div>
                <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Report Generated</h3>
                <p className="text-sm text-muted-foreground">
                  Select a report type and time period, then click "Generate Report" to create your report.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Previously generated reports available for download</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Sliders className="h-4 w-4" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium">
              <div className="col-span-6">Report Name</div>
              <div className="col-span-2">Date Generated</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-1"></div>
            </div>
            {recentReports.map((report, index) => (
              <div key={index} className="grid grid-cols-12 p-3 items-center border-t text-sm">
                <div className="col-span-6 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {report.name}
                </div>
                <div className="col-span-2">{report.date}</div>
                <div className="col-span-2">{report.size}</div>
                <div className="col-span-1">
                  <Badge variant="outline">{report.format}</Badge>
                </div>
                <div className="col-span-1 flex justify-end gap-2">
                  <Button variant="ghost" size="icon" title="Preview Report">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Download Report">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-muted/20">
        <CardHeader>
          <CardTitle>Compliance Information</CardTitle>
          <CardDescription>
            How our reports align with standard sustainability frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col">
              <h3 className="font-semibold mb-2">GHG Protocol</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Our Scope 2 reports follow the GHG Protocol standards for market-based and location-based reporting, including all required disclosures.
              </p>
              <Button variant="link" className="justify-start p-0 h-auto text-primary">Learn more</Button>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold mb-2">CSRD Requirements</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Reports are designed to fulfill the Corporate Sustainability Reporting Directive requirements for energy consumption and emissions.
              </p>
              <Button variant="link" className="justify-start p-0 h-auto text-primary">Learn more</Button>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold mb-2">RE100 Standard</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Our reporting meets RE100 requirements for renewable energy claims, with hourly granularity for 24/7 matching disclosures.
              </p>
              <Button variant="link" className="justify-start p-0 h-auto text-primary">Learn more</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CorporateReporting;
