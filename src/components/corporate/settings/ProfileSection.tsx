
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FileText, Download, CheckCircle, AlertTriangle } from "lucide-react";

const ProfileSection = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [contractSigned, setContractSigned] = useState(true);
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
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

  const handleDownloadAgreement = () => {
    toast({
      title: "Agreement download initiated",
      description: "Your agreement document will download shortly."
    });
  };

  return (
    <div className="space-y-6">
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
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-primary" />
            Your Service Agreement
          </CardTitle>
          <CardDescription>
            Renuw Corporate Platform Agreement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-medium">Corporate Service Contract</div>
            </div>
            
            <div className="flex items-center gap-3">
              {contractSigned ? (
                <>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle size={12} className="mr-1" />
                    Signed
                  </Badge>
                  <Button className="gap-2" onClick={handleDownloadAgreement}>
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
    </div>
  );
};

export default ProfileSection;
