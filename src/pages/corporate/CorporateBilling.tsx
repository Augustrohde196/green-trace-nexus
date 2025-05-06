
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Receipt, Calendar, CreditCard, PlusCircle, ClipboardList } from "lucide-react";
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
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Subscription
            </CardTitle>
            <CardDescription>Your renewable energy service subscription managed by Energi Danmark</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/5 rounded-lg border border-primary/20 p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 mb-2">Active</Badge>
                  <h3 className="text-xl font-semibold">Corporate Renewable Plan</h3>
                  <p className="text-sm text-muted-foreground mt-1">Through Energi Danmark A/S</p>
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
                    This fee covers your access to the Renuw platform and its features. Your energy 
                    consumption and certificates are billed separately through your utility provider, 
                    Energi Danmark A/S.
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
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium">Primary Method</div>
                <Badge variant="outline">Default</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
                    alt="Invoice" 
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <div className="font-medium">Invoice</div>
                  <div className="text-sm text-muted-foreground">Monthly billing</div>
                </div>
              </div>
              <Button variant="link" className="p-0 h-auto mt-2 text-sm">Change payment method</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="font-medium mb-2">Billing Address</div>
              <div className="text-sm">
                <div>EcoTech Solutions ApS</div>
                <div>Nytorv 17</div>
                <div>1450 Copenhagen K</div>
                <div>Denmark</div>
                <div>CVR: 12345678</div>
              </div>
              <Button variant="link" className="p-0 h-auto mt-2 text-sm">Update address</Button>
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
            <TabsContent value="current" className="m-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium">
                  <div className="col-span-2">Invoice #</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-3">Period</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1"></div>
                </div>
                <div className="grid grid-cols-12 p-3 items-center border-t">
                  <div className="col-span-2 font-medium">#INV-2025-05</div>
                  <div className="col-span-3">May 1, 2025</div>
                  <div className="col-span-3">May 2025</div>
                  <div className="col-span-2">20,00 DKK</div>
                  <div className="col-span-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice("2025-05")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-12 p-3 items-center border-t">
                  <div className="col-span-2 font-medium">#INV-2025-04</div>
                  <div className="col-span-3">April 1, 2025</div>
                  <div className="col-span-3">April 2025</div>
                  <div className="col-span-2">20,00 DKK</div>
                  <div className="col-span-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice("2025-04")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-12 p-3 items-center border-t">
                  <div className="col-span-2 font-medium">#INV-2025-03</div>
                  <div className="col-span-3">March 1, 2025</div>
                  <div className="col-span-3">March 2025</div>
                  <div className="col-span-2">20,00 DKK</div>
                  <div className="col-span-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice("2025-03")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-12 p-3 items-center border-t">
                  <div className="col-span-2 font-medium">#INV-2025-02</div>
                  <div className="col-span-3">February 1, 2025</div>
                  <div className="col-span-3">February 2025</div>
                  <div className="col-span-2">20,00 DKK</div>
                  <div className="col-span-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice("2025-02")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-12 p-3 items-center border-t">
                  <div className="col-span-2 font-medium">#INV-2025-01</div>
                  <div className="col-span-3">January 1, 2025</div>
                  <div className="col-span-3">January 2025</div>
                  <div className="col-span-2">20,00 DKK</div>
                  <div className="col-span-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice("2025-01")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="previous" className="m-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium">
                  <div className="col-span-2">Invoice #</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-3">Period</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1"></div>
                </div>
                <div className="grid grid-cols-12 p-3 items-center border-t">
                  <div className="col-span-2 font-medium">#INV-2024-12</div>
                  <div className="col-span-3">December 1, 2024</div>
                  <div className="col-span-3">December 2024</div>
                  <div className="col-span-2">20,00 DKK</div>
                  <div className="col-span-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice("2024-12")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-12 p-3 items-center border-t">
                  <div className="col-span-2 font-medium">#INV-2024-11</div>
                  <div className="col-span-3">November 1, 2024</div>
                  <div className="col-span-3">November 2024</div>
                  <div className="col-span-2">20,00 DKK</div>
                  <div className="col-span-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice("2024-11")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-12 p-3 items-center border-t">
                  <div className="col-span-2 font-medium">#INV-2024-10</div>
                  <div className="col-span-3">October 1, 2024</div>
                  <div className="col-span-3">October 2024</div>
                  <div className="col-span-2">20,00 DKK</div>
                  <div className="col-span-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice("2024-10")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent>
          {/* The TabsContent moved inside the Tabs component above */}
        </CardContent>
      </Card>
      
      <Card className="bg-muted/20">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <div className="py-4">
            <h3 className="font-medium mb-2">How is my subscription fee calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Your subscription fee is based on your selected plan level and is charged on a monthly basis. 
              The fee covers access to the Renuw platform and its features.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-medium mb-2">When am I billed for my energy consumption?</h3>
            <p className="text-sm text-muted-foreground">
              Your energy consumption and certificates are billed separately through your utility provider, 
              Energi Danmark A/S, according to their billing cycle.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-medium mb-2">How do I update my payment method?</h3>
            <p className="text-sm text-muted-foreground">
              You can update your payment method by clicking the "Change payment method" link in the Payment 
              Method section. For further assistance, please contact our billing support.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CorporateBilling;
