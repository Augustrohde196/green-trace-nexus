
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { User, Lock, Database, Save, ExternalLink, AlertTriangle, Check } from "lucide-react";
import { motion } from "framer-motion";

const CorporateSettings = () => {
  const { toast } = useToast();
  const [isConnectedToEnergiNet, setIsConnectedToEnergiNet] = useState(false);
  const [connecting, setConnecting] = useState(false);
  
  const handleConnectToEnergiNet = () => {
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      setIsConnectedToEnergiNet(true);
      toast({
        title: "Connected to Energinet",
        description: "You have successfully authorized Renuw to access your Energinet data.",
      });
    }, 2000);
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleSavePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };
  
  const handleDisconnect = () => {
    setIsConnectedToEnergiNet(false);
    toast({
      title: "Disconnected from Energinet",
      description: "Your connection to Energinet has been revoked.",
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
        <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and connections
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Energinet Integration</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Nielsen" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="alex.nielsen@ecotech.dk" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="EcoTech Solutions" disabled />
                <p className="text-xs text-muted-foreground mt-1">
                  Company name cannot be changed. Contact support for assistance.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" defaultValue="Sustainability Manager" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+45 12 34 56 78" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how we communicate with you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">Receive newsletters and promotional content</p>
                </div>
                <Switch id="marketing-emails" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="report-notifications">Report Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new reports are available</p>
                </div>
                <Switch id="report-notifications" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast({ title: "Preferences saved", description: "Your notification preferences have been updated." })}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePassword}>Update Password</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <p className="text-sm text-muted-foreground">
                    Enhance your account security by enabling 2FA
                  </p>
                </div>
                <Switch id="2fa" />
              </div>
              <div className="rounded-md bg-muted/50 p-4 text-sm">
                <p>
                  When enabled, you will be required to provide a code from your authenticator app 
                  in addition to your password when logging in.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Configure Two-Factor Authentication</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Recent account access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <div className="font-medium">Today at 10:45 AM</div>
                    <div className="text-sm text-muted-foreground">Copenhagen, Denmark</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Current Session</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <div className="font-medium">Yesterday at 2:30 PM</div>
                    <div className="text-sm text-muted-foreground">Copenhagen, Denmark</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <div className="font-medium">May 3, 2025 at 9:15 AM</div>
                    <div className="text-sm text-muted-foreground">Copenhagen, Denmark</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Full Login History</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-800 p-1.5 rounded-md">
                  <img 
                    src="https://energinet.dk/-/media/ADFDE60B8424451F83D4E04D37A54811.png" 
                    alt="Energinet Logo" 
                    className="h-6 w-auto"
                  />
                </div>
                Energinet Data Access (Power of Attorney)
              </CardTitle>
              <CardDescription>
                Authorize Renuw to fetch your energy data from Energinet's systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      By connecting to Energinet, you authorize Renuw to retrieve your official meter 
                      readings and handle certificate actions on your behalf. This integration uses 
                      Denmark's official Power of Attorney process through Energinet's Eloverblik platform.
                    </p>
                    <a href="https://energinet.dk/media/yalfiowx/tredjeparters-anmodning-om-fuldmagt.pdf" 
                       className="text-sm text-primary flex items-center gap-1 mt-2" 
                       target="_blank" 
                       rel="noopener noreferrer"
                    >
                      <span>What is Power of Attorney?</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Connection Status</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {isConnectedToEnergiNet ? (
                        <>
                          <Badge className="bg-green-100 text-green-800">Connected</Badge>
                          <span className="text-sm text-muted-foreground">
                            MitID granted on May 6, 2025
                          </span>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                            Not Connected
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            No active authorization
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {isConnectedToEnergiNet ? (
                    <Button variant="outline" onClick={handleDisconnect}>
                      Revoke Access
                    </Button>
                  ) : (
                    <Button onClick={handleConnectToEnergiNet} disabled={connecting}>
                      {connecting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                          Connecting...
                        </>
                      ) : (
                        <>Connect to Energinet</>
                      )}
                    </Button>
                  )}
                </div>
                
                {isConnectedToEnergiNet && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="text-sm font-medium">Authorized Scope</div>
                      <div className="text-sm">Consumption data, meter readings</div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="text-sm font-medium">Last Data Refresh</div>
                      <div className="text-sm">Today at 08:30 AM</div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="text-sm font-medium">Refresh Frequency</div>
                      <div className="text-sm">Every 24 hours</div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="text-sm font-medium">Authorization Expires</div>
                      <div className="text-sm">May 6, 2027 (2 years)</div>
                    </div>
                  </div>
                )}
                
                {!isConnectedToEnergiNet && (
                  <div className="mt-6 rounded-md bg-amber-50 border border-amber-200 p-4 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-amber-800">
                          Your account is not yet connected to Energinet. Connecting will enable:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-amber-800">
                          <li>Automatic import of your consumption data</li>
                          <li>More accurate matching of generation to your usage</li>
                          <li>Simplified certificate management and verification</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {isConnectedToEnergiNet && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-800 p-1 rounded-full">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Integration Active</h3>
                      <p className="text-sm text-green-800 mt-1">
                        Your Energinet integration is working correctly. Renuw is authorized to access your 
                        energy data and will automatically update your dashboard with the latest information.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-4">
                Note: Authorization requires MitID authentication through Energinet's official website. 
                When you click "Connect to Energinet", you will be redirected to complete the authentication process.
              </p>
              {isConnectedToEnergiNet && (
                <Button variant="outline" onClick={() => toast({ title: "Data refreshed", description: "Your Energinet data has been manually refreshed." })}>
                  Refresh Data Now
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Data Permissions</CardTitle>
              <CardDescription>Manage how your data is processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics-permission">Analytics Processing</Label>
                  <p className="text-sm text-muted-foreground">Allow processing of your data for analytics and insights</p>
                </div>
                <Switch id="analytics-permission" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="third-party-sharing">Third-Party Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Allow sharing data with third-party services when necessary</p>
                </div>
                <Switch id="third-party-sharing" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-export">Data Export</Label>
                  <p className="text-sm text-muted-foreground">Allow exporting your data for your own use</p>
                </div>
                <Switch id="data-export" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast({ title: "Data permissions updated", description: "Your data handling preferences have been updated." })}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

// Helper Icon component
const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default CorporateSettings;
