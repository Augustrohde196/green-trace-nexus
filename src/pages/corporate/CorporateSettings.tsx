
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { User, Key, Plug, Shield, ExternalLink } from "lucide-react";

const CorporateSettings = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully."
    });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnerginetConnect = () => {
    // Open a new window to the Energinet authorization URL
    window.open('https://energinet.dk/authorize', '_blank');
    
    toast({
      title: "Redirecting to Energinet",
      description: "Please complete the authorization process with your MitID."
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
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
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
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <CardDescription>Manage your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <Avatar className="w-32 h-32 border-4 border-muted">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  
                  <div className="mt-4 text-center">
                    <Label htmlFor="profile-image" className="block cursor-pointer text-sm rounded-md border border-primary px-3 py-2 hover:bg-accent">
                      Change Photo
                    </Label>
                    <Input 
                      id="profile-image" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Nielsen" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex.nielsen@company.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="EcoTech Solutions" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job title</Label>
                    <Input id="job-title" defaultValue="Sustainability Manager" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveProfile}>Save Profile</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Account Preferences Card removed */}
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleChangePassword}>Change Password</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Two-Factor Authentication</CardTitle>
              <CardDescription>Enhance the security of your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable two-factor authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Two-factor authentication is currently disabled</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 ml-6">
                  We strongly recommend enabling two-factor authentication to secure your account.
                </p>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button variant="outline" onClick={() => toast({ title: "Coming soon", description: "This feature will be available soon." })}>
                  Setup Two-Factor
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Energinet Integration</CardTitle>
              <CardDescription>Connect your account with Energinet for meter data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* New Energinet banner for non-connected state */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-blue-800 dark:text-blue-400">Your account is not yet linked to Energinet</h3>
                    <p className="text-sm text-blue-700/80 dark:text-blue-500/80">
                      Connect to Energinet to enable automated data updates for official meter readings and certificate handling.
                    </p>
                    <p className="text-xs text-blue-700/80 dark:text-blue-500/80">
                      You will need to use your MitID (national digital ID) to authorize this connection.
                    </p>
                  </div>
                  <Button 
                    onClick={handleEnerginetConnect} 
                    className="gap-2 whitespace-nowrap"
                  >
                    Connect Now
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Connected Systems section removed */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CorporateSettings;
