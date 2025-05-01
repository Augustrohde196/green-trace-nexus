
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CustomersList } from "./customers-list";
import { Customer } from "@/data/models";

interface CustomerFiltersProps {
  customers: Customer[];
  filteredCustomers: Customer[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCustomerClick: (customer: Customer) => void;
}

export function CustomerFilters({
  customers,
  filteredCustomers,
  selectedTab,
  setSelectedTab,
  searchQuery,
  setSearchQuery,
  onCustomerClick
}: CustomerFiltersProps) {
  return (
    <div className="w-full">
      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4 relative">
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
          <CustomersList 
            customers={filteredCustomers} 
            onCustomerClick={onCustomerClick} 
          />
        </TabsContent>
        <TabsContent value="high" className="mt-6">
          <CustomersList 
            customers={filteredCustomers} 
            onCustomerClick={onCustomerClick} 
          />
        </TabsContent>
        <TabsContent value="medium" className="mt-6">
          <CustomersList 
            customers={filteredCustomers} 
            onCustomerClick={onCustomerClick} 
          />
        </TabsContent>
        <TabsContent value="low" className="mt-6">
          <CustomersList 
            customers={filteredCustomers} 
            onCustomerClick={onCustomerClick} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
