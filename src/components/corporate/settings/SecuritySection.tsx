
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Key } from "lucide-react";

const SecuritySection = () => {
  const { toast } = useToast();
  
  const handleChangePassword = () => {
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully."
    });
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default SecuritySection;
