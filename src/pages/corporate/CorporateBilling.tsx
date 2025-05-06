import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Receipt, Calendar, CreditCard, ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Fixed import path
import { motion } from "framer-motion";
import { UpcomingInvoices } from "@/components/billing/upcoming-invoices";

const CorporateBilling = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("current");
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Downloading invoice",
      description: `Invoice #${invoiceId} is being downloaded.`,
    });
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">
          Manage your subscription and payment details
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Subscription
            </CardTitle>
            <CardDescription>Your renewable energy service subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/5 rounded-lg border border-primary/20 p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 mb-2">Active</Badge>
                  <h3 className="text-xl font-semibold">Corporate Renewable Plan</h3>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-2xl font-bold">20 DKK <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                  <p className="text-sm text-muted-foreground mt-1">Next billing date: June 1, 2025</p>
                </div>
              </div>
              
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Portal Access</div>
                  <div className="font-medium">Full Access</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Reports & Analytics</div>
                  <div className="font-medium">Unlimited</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Data Storage</div>
                  <div className="font-medium">5 Years</div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 0 0 0-4h-2a2 2 0 0 0 0 4h2zM6 15a2 2 0 0 0 0 4h2a2 2 0 0 0 0-4H6zM16 15a2 2 0 0 1 0 4h-2a2 2 0 0 1 0-4h2zM8 8a2 2 0 0 1 0-4h2a2 2 0 0 1 0 4H8zM12 9v6"/></svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Renuw Platform Fee</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This fee covers your access to the Renuw platform and its features.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                View Contract Details
              </Button>
              <Button variant="outline" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                Contact Billing Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <UpcomingInvoices />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Your billing history</CardDescription>
            </div>
            <Tabs 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-[220px]"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="current">Current Year</TabsTrigger>
                <TabsTrigger value="previous">Previous Years</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab}>
              <TabsContent value="current">
                <div className="space-y-4">
                  {["05", "04", "03", "02", "01"].map((month) => (
                    <div 
                      key={month} 
                      className="bg-card border rounded-lg p-4 hover:bg-accent/50 transition-colors group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                      <div className="flex items-center justify-between">
                        <div className="pl-2">
                          <div className="flex items-center gap-2">
                            <Receipt className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">#INV-2025-{month}</h3>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                            <span>May {Number(month)}, 2025</span>
                            <span className="mx-2">•</span>
                            <span>Monthly Subscription</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="text-base font-semibold">20.00 DKK</div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">Paid</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8"
                          onClick={() => handleDownloadInvoice(`2025-${month}`)}
                        >
                          <Receipt className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8"
                          onClick={() => handleDownloadInvoice(`2025-${month}`)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="previous">
                <div className="space-y-4">
                  {["12", "11", "10"].map((month) => (
                    <div 
                      key={month} 
                      className="bg-card border rounded-lg p-4 hover:bg-accent/50 transition-colors group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                      <div className="flex items-center justify-between">
                        <div className="pl-2">
                          <div className="flex items-center gap-2">
                            <Receipt className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">#INV-2024-{month}</h3>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                            <span>{
                              month === "12" ? "December" :
                              month === "11" ? "November" : 
                              "October"
                            } {Number(month)}, 2024</span>
                            <span className="mx-2">•</span>
                            <span>Monthly Subscription</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="text-base font-semibold">20.00 DKK</div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">Paid</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8"
                          onClick={() => handleDownloadInvoice(`2024-${month}`)}
                        >
                          <Receipt className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8"
                          onClick={() => handleDownloadInvoice(`2024-${month}`)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default CorporateBilling;
