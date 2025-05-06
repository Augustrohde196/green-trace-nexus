
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { User, Key, Plug, Shield } from "lucide-react";

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
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Preferences</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Email notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Report sharing</h3>
                    <p className="text-sm text-muted-foreground">Allow report sharing with team members</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">API access</h3>
                    <p className="text-sm text-muted-foreground">Enable access to your data via API</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={() => toast({ title: "Settings saved", description: "Your preferences have been updated." })}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Connection Status</h3>
                  <p className="text-sm text-muted-foreground">Your Energinet data connection</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">Connected</Badge>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Plug className="h-5 w-5 text-green-700 dark:text-green-400" />
                  <span className="font-medium text-green-800 dark:text-green-400">Your account is successfully connected to Energinet</span>
                </div>
                <p className="text-sm text-green-700/80 dark:text-green-500/80 mt-1 ml-7">
                  Last sync: May 5, 2025 at 09:45
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
                <Button onClick={() => toast({ title: "Sync initiated", description: "Syncing data with Energinet..." })}
                  className="sm:order-2"
                >
                  Sync Now
                </Button>
                <Button variant="outline" onClick={() => toast({ title: "Connection refreshed", description: "Your Energinet connection has been refreshed." })}
                  className="sm:order-1"
                >
                  Refresh Connection
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Connected Systems</CardTitle>
              <CardDescription>Manage connections to external systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Building Management System</h3>
                      <p className="text-sm text-muted-foreground">Connected since Jan 15, 2025</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm"
                      onClick={() => toast({ title: "Disconnected", description: "Building Management System has been disconnected." })}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    </div>
                    <div>
                      <h3 className="font-medium">GitHub</h3>
                      <p className="text-sm text-muted-foreground">Connected since Mar 20, 2025</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm"
                      onClick={() => toast({ title: "Disconnected", description: "GitHub has been disconnected." })}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => toast({ title: "Connect new system", description: "Coming soon" })}>
                    Connect New System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CorporateSettings;
