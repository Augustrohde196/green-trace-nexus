
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building2, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Database,
  FileText, 
  Download, 
  CheckCircle,
  AlertTriangle,
  Link,
  ExternalLink
} from "lucide-react";
import { mockCustomers } from "@/data/mock-data";
import { motion } from "framer-motion";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [contractSigned, setContractSigned] = useState(true);
  
  // Mock organization data
  const organization = {
    name: "Energi Danmark A/S",
    id: "UTIL-DK-12345",
    user: {
      name: "Anders Jensen",
      email: "anders.jensen@energidanmark.dk"
    }
  };
  
  // Mock data for Energinet integration
  const integratedClients = ["Novo Nordisk", "LEGO Group", "Maersk"];
  const nonIntegratedClients = ["Carlsberg", "Vestas"];
  const integrationRate = (integratedClients.length / (integratedClients.length + nonIntegratedClients.length)) * 100;
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Password change logic would go here
    setPasswordForm({
      current: "",
      new: "",
      confirm: "",
    });
  };
  
  const openEnerginet = () => {
    window.open("https://energinet.dk/datahub/selvbetjening", "_blank");
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account, security and integration settings
        </p>
      </motion.div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="animate-in fade-in-0 duration-300">
            <User size={16} className="mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="animate-in fade-in-25 duration-300">
            <ShieldCheck size={16} className="mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integration" className="animate-in fade-in-50 duration-300">
            <Database size={16} className="mr-2" />
            Energinet Data Integration
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Organization Details
                </CardTitle>
                <CardDescription>Your organization information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization Name</label>
                  <Input value={organization.name} readOnly />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Utility ID</label>
                  <Input value={organization.id} readOnly />
                  <div className="text-xs text-muted-foreground">
                    Used for tracking contracts and data integration
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  User Information
                </CardTitle>
                <CardDescription>Your personal account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input value={organization.user.name} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex gap-2">
                    <Input value={organization.user.email} />
                    <Button variant="outline">Verify</Button>
                  </div>
                </div>
                
                <Button className="mt-2">Update Profile</Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Your Service Agreement
                </CardTitle>
                <CardDescription>
                  Renuw Platform Utility Agreement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-medium">Platform Service Contract</div>
                    <div className="text-sm text-muted-foreground">
                      Subscription tier: Enterprise
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Pricing: 20 DKK per MWh of GOs transacted
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {contractSigned ? (
                      <>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle size={12} className="mr-1" />
                          Signed
                        </Badge>
                        <Button className="gap-2">
                          <Download size={16} />
                          Download Agreement
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          <AlertTriangle size={12} className="mr-1" />
                          Pending
                        </Badge>
                        <Button>Sign Agreement</Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <Input 
                      type="password" 
                      value={passwordForm.current}
                      onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <Input 
                      type="password"
                      value={passwordForm.new}
                      onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <Input 
                      type="password"
                      value={passwordForm.confirm}
                      onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">2FA via Authenticator App</div>
                    <div className="text-sm text-muted-foreground">
                      Use an authenticator app to generate verification codes
                    </div>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled} 
                    onCheckedChange={setTwoFactorEnabled} 
                  />
                </div>
                
                {twoFactorEnabled ? (
                  <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                      <span className="text-green-700 dark:text-green-400 font-medium">Two-factor authentication is enabled</span>
                    </div>
                    <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-1">
                      Your account is protected with an additional layer of security
                    </p>
                  </div>
                ) : (
                  <Button>Set Up Two-Factor Authentication</Button>
                )}
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Security Tips</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground pl-4 list-disc">
                    <li>Use a strong, unique password</li>
                    <li>Enable two-factor authentication</li>
                    <li>Never share your login credentials</li>
                    <li>Log out when using shared computers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Energinet Data Integration Tab */}
        <TabsContent value="integration">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Energinet Data Integration
                </CardTitle>
                <CardDescription>
                  Manage access to customer consumption data via Energinet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card className="bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Link className="h-10 w-10 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-blue-800 dark:text-blue-300">Your account is not yet linked to Energinet</h3>
                          <p className="text-sm text-blue-700/90 dark:text-blue-400/90 mt-1">
                            Connect now for automated data updates and certificate handling
                          </p>
                        </div>
                      </div>
                      <Button 
                        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={openEnerginet}
                      >
                        Connect Now
                        <ExternalLink size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <h4 className="text-base font-medium mb-2">What you'll get with Energinet connection:</h4>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">Official meter readings</h5>
                        <p className="text-sm text-muted-foreground">
                          Access to official consumption data for all your connected meters
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">Certificate handling</h5>
                        <p className="text-sm text-muted-foreground">
                          Automated management of your renewable energy certificates
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">MitID authentication</h5>
                        <p className="text-sm text-muted-foreground">
                          Secure access via Denmark's national digital ID system
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-400">Authorization required</h4>
                      <p className="text-sm text-amber-700/80 dark:text-amber-400/80 mt-1">
                        You'll be redirected to Energinet's secure portal where you'll need to use your MitID 
                        to authorize Renuw to access your energy data.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
