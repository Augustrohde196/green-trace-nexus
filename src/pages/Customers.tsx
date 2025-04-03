
import { useState } from "react";
import { Plus, FileBarChart, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CustomersList } from "@/components/customers/customers-list";
import { CustomerForm } from "@/components/customers/customer-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMockCustomers } from "@/hooks/use-mock-customers";

export default function Customers() {
  const { customers, addCustomer } = useMockCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         customer.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "high") return matchesSearch && customer.matchingScore >= 80;
    if (selectedTab === "medium") return matchesSearch && customer.matchingScore >= 50 && customer.matchingScore < 80;
    return matchesSearch && customer.matchingScore < 50;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Corporate Customers</h2>
          <p className="text-muted-foreground">
            Manage your corporate customers, their portfolios and allocations.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button 
            onClick={() => setIsAddCustomerOpen(true)}
            className="gap-2"
          >
            <Plus size={16} />
            Add Customer
          </Button>
          <Button variant="outline" className="gap-2">
            <FileBarChart size={16} />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Consumption
            </CardTitle>
            <Activity size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.reduce((acc, customer) => acc + customer.annualConsumption, 0).toFixed(1)} GWh
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Matching Score
            </CardTitle>
            <BarChart3 size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(customers.reduce((acc, customer) => acc + customer.matchingScore, 0) / customers.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="high">
            High Match <Badge variant="outline" className="ml-2">{customers.filter(c => c.matchingScore >= 80).length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="medium">
            Medium Match <Badge variant="outline" className="ml-2">{customers.filter(c => c.matchingScore >= 50 && c.matchingScore < 80).length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="low">
            Low Match <Badge variant="outline" className="ml-2">{customers.filter(c => c.matchingScore < 50).length}</Badge>
          </TabsTrigger>
        </TabsList>
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

      <Sheet open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Corporate Customer</SheetTitle>
          </SheetHeader>
          <CustomerForm 
            onSubmit={(customer) => {
              addCustomer(customer);
              setIsAddCustomerOpen(false);
            }} 
            onCancel={() => setIsAddCustomerOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
