import { useState } from "react";
import { Plus, Search, Users, Activity, BarChart3, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { CustomerForm, CustomerFormData } from "@/components/customers/customer-form";
import { useMockCustomers, NewCustomer } from "@/hooks/use-mock-customers";
import { Customer } from "@/data/models";

export default function Customers() {
  const { customers, addCustomer } = useMockCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         customer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "high") return matchesSearch && customer.matchingScore >= 80;
    if (selectedTab === "medium") return matchesSearch && customer.matchingScore >= 50 && customer.matchingScore < 80;
    return matchesSearch && customer.matchingScore < 50;
  });

  // Function to count customers by status
  const countCustomersByStatus = (status: string) => {
    return customers.filter(c => c.status === status).length || 0;
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your corporate customers, their portfolios and allocations.
          </p>
        </div>
        <Button 
          onClick={() => setIsAddCustomerOpen(true)}
          className="gap-2"
        >
          <Plus size={16} />
          Add Customer
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/5 opacity-70 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {countCustomersByStatus('active')} active, {countCustomersByStatus('pending')} pending
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-500/5 opacity-70 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">
                Total Consumption
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Activity size={18} className="text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold">
                {customers.reduce((acc, customer) => acc + customer.annualConsumption, 0).toFixed(1)} GWh
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Annual energy allocation
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-500/5 opacity-70 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">
                Average Matching Score
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BarChart3 size={18} className="text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold">
                {Math.round(customers.reduce((acc, customer) => acc + customer.matchingScore, 0) / customers.length)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Temporal matching between production and consumption
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all" className="animate-in fade-in-0 duration-300">
                All Customers
              </TabsTrigger>
              <TabsTrigger value="high" className="animate-in fade-in-25 duration-300">
                High Match <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">{customers.filter(c => c.matchingScore >= 80).length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="medium" className="animate-in fade-in-50 duration-300">
                Medium Match <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">{customers.filter(c => c.matchingScore >= 50 && c.matchingScore < 80).length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="low" className="animate-in fade-in-75 duration-300">
                Low Match <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">{customers.filter(c => c.matchingScore < 50).length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <CustomersList customers={filteredCustomers} />
          </TabsContent>
          <TabsContent value="high" className="mt-6">
            <CustomersList customers={filteredCustomers} />
          </TabsContent>
          <TabsContent value="medium" className="mt-6">
            <CustomersList customers={filteredCustomers} />
          </TabsContent>
          <TabsContent value="low" className="mt-6">
            <CustomersList customers={filteredCustomers} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Customer Sheet */}
      <Sheet open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Corporate Customer</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <CustomerForm 
              onSubmit={(formData: CustomerFormData) => {
                const newCustomer: NewCustomer = {
                  name: formData.name,
                  location: formData.location,
                  industry: formData.industry,
                  annualConsumption: formData.annualConsumption,
                  portfolioMix: {
                    solar: formData.solarPercentage,
                    wind: 100 - formData.solarPercentage
                  },
                  preferredMix: { 
                    wind: 100 - formData.solarPercentage,
                    solar: formData.solarPercentage 
                  },
                  portfolioStatus: "Not Allocated",
                  matchingScore: Math.floor(Math.random() * (85 - 60) + 60), // Random score between 60-85
                  localOnly: true,
                  status: "pending"
                };
                
                addCustomer(newCustomer);
                setIsAddCustomerOpen(false);
              }} 
              onCancel={() => setIsAddCustomerOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// CustomersList component
function CustomersList({ customers }: { customers: Customer[] }) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {customers.map((customer) => (
        <motion.div
          key={customer.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="cursor-pointer"
        >
          <Card className="overflow-hidden hover:border-primary/30 hover:bg-muted/20 transition-all">
            <CardContent className="p-0">
              <div className="grid grid-cols-12 items-center p-4">
                <div className="col-span-3">
                  <div className="font-semibold">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.location}</div>
                </div>
                <div className="col-span-3">
                  <div className="text-sm flex items-center space-x-2">
                    <span>Portfolio Status:</span>
                    <span className="font-medium">{customer.portfolioStatus}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {customer.annualConsumption.toFixed(1)} GWh/year
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="text-sm mb-1">Portfolio Mix</div>
                  <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div 
                      className="bg-blue-500 h-full" 
                      style={{ width: `${customer.preferredMix?.wind || customer.portfolioMix.wind}%` }}
                    />
                    <div 
                      className="bg-green-500 h-full" 
                      style={{ width: `${customer.preferredMix?.solar || customer.portfolioMix.solar}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Wind: {customer.preferredMix?.wind || customer.portfolioMix.wind}%</span>
                    <span>Solar: {customer.preferredMix?.solar || customer.portfolioMix.solar}%</span>
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <Badge 
                    variant={customer.status === 'active' ? 'success' : 'outline'} 
                    className={`${customer.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}
                  >
                    {customer.status === 'active' ? (
                      <><Check size={12} className="mr-1" /> Active</>
                    ) : (
                      <><Clock size={12} className="mr-1" /> Pending</>
                    )}
                  </Badge>
                </div>
                <div className="col-span-2 px-4">
                  <div className="text-sm mb-1">Time Matching</div>
                  <div className="flex items-center gap-2">
                    <Progress value={customer.matchingScore} className="h-2" />
                    <span className="text-sm font-medium">{customer.matchingScore}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
