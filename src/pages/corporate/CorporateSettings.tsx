
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { User, Shield, Plug } from "lucide-react";
import ProfileSection from "@/components/corporate/settings/ProfileSection";
import SecuritySection from "@/components/corporate/settings/SecuritySection";
import IntegrationsSection from "@/components/corporate/settings/IntegrationsSection";

const CorporateSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex gap-2 items-center">
            <Plug className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ProfileSection />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySection />
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationsSection />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CorporateSettings;
