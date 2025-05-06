
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Receipt, Calendar, CreditCard, ClipboardList } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const CorporateBilling = () => {
  const { toast } = useToast();
  const [activePeriod, setActivePeriod] = useState("current");
  
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
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Your billing history</CardDescription>
          </div>
          <Tabs 
            value={activePeriod} 
            onValueChange={setActivePeriod}
            className="w-[400px]"
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="current">Current Year</TabsTrigger>
              <TabsTrigger value="previous">Previous Years</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="current" className="mt-0">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 text-sm font-medium flex items-center">
                <div className="w-1/5">Invoice #</div>
                <div className="w-1/5">Date</div>
                <div className="w-1/5">Period</div>
                <div className="w-1/5">Amount</div>
                <div className="w-1/5">Status</div>
                <div className="w-[90px] text-right">Actions</div>
              </div>
              
              {["05", "04", "03", "02", "01"].map((month) => (
                <div 
                  key={month} 
                  className="px-6 py-4 border-t flex items-center hover:bg-muted/20 transition-colors"
                >
                  <div className="w-1/5 font-medium">#INV-2025-{month}</div>
                  <div className="w-1/5 flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>May {Number(month)}, 2025</span>
                  </div>
                  <div className="w-1/5">May 2025</div>
                  <div className="w-1/5 font-medium">20,00 DKK</div>
                  <div className="w-1/5">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="w-[90px] flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDownloadInvoice(`2025-${month}`)}
                    >
                      <Receipt className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDownloadInvoice(`2025-${month}`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="previous" className="mt-0">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 text-sm font-medium flex items-center">
                <div className="w-1/5">Invoice #</div>
                <div className="w-1/5">Date</div>
                <div className="w-1/5">Period</div>
                <div className="w-1/5">Amount</div>
                <div className="w-1/5">Status</div>
                <div className="w-[90px] text-right">Actions</div>
              </div>
              
              {["12", "11", "10"].map((month) => (
                <div 
                  key={month} 
                  className="px-6 py-4 border-t flex items-center hover:bg-muted/20 transition-colors"
                >
                  <div className="w-1/5 font-medium">#INV-2024-{month}</div>
                  <div className="w-1/5 flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{
                      month === "12" ? "December" :
                      month === "11" ? "November" : 
                      "October"
                    } {Number(month)}, 2024</span>
                  </div>
                  <div className="w-1/5">{
                    month === "12" ? "December" :
                    month === "11" ? "November" : 
                    "October"
                  } 2024</div>
                  <div className="w-1/5 font-medium">20,00 DKK</div>
                  <div className="w-1/5">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="w-[90px] flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDownloadInvoice(`2024-${month}`)}
                    >
                      <Receipt className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDownloadInvoice(`2024-${month}`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CorporateBilling;
