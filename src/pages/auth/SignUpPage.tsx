
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Building2, 
  Factory, 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  Check, 
  Shield,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthLayout } from "@/components/layout/auth-layout";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignUp = (userType: "corporate" | "utility") => (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Account created",
        description: userType === "corporate" 
          ? "You've successfully signed up for a corporate account. Please complete the onboarding process."
          : "You've successfully signed up for a utility/trader account. We'll contact you to complete the setup process."
      });
      
      // For corporate users, redirect to onboarding
      if (userType === "corporate") {
        navigate("/corporate/onboarding");
      } else {
        navigate("/");
      }
    }, 1500);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <AuthLayout>
      <Card className="border shadow-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-primary mr-2" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
          <CardDescription className="text-center">
            Start your clean energy journey with granular guarantees
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="corporate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="corporate" className="flex items-center gap-2">
                <Building2 size={16} />
                <span>Corporate</span>
              </TabsTrigger>
              <TabsTrigger value="utility" className="flex items-center gap-2">
                <Factory size={16} />
                <span>Utility/Trader</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="corporate">
              <div className="grid gap-4">
                <form onSubmit={handleSignUp("corporate")}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name-corporate">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name-corporate"
                          placeholder="John Doe"
                          type="text"
                          autoCapitalize="words"
                          autoCorrect="off"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company-name"
                          placeholder="Your Company"
                          type="text"
                          autoCapitalize="words"
                          autoCorrect="off"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email-corporate">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-corporate"
                          placeholder="name@company.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password-corporate">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-corporate"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1.5 h-7 w-7"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-start">
                        <Check size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>24/7 clean energy matching</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Hourly energy consumption tracking</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>ESG reporting and sustainability metrics</span>
                      </li>
                    </ul>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox id="terms-corporate" required />
                      <Label htmlFor="terms-corporate" className="text-sm">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <Button disabled={loading} className="w-full mt-2 group">
                      {loading ? (
                        "Creating Account..."
                      ) : (
                        <>
                          <span>Create Corporate Account</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/auth/sign-in" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="utility">
              <div className="grid gap-4">
                <form onSubmit={handleSignUp("utility")}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name-utility">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name-utility"
                          placeholder="John Doe"
                          type="text"
                          autoCapitalize="words"
                          autoCorrect="off"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company-utility">Company Name</Label>
                      <div className="relative">
                        <Factory className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company-utility"
                          placeholder="Your Utility Company"
                          type="text"
                          autoCapitalize="words"
                          autoCorrect="off"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email-utility">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-utility"
                          placeholder="name@utility.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password-utility">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-utility"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1.5 h-7 w-7"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-start">
                        <Check size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Simplified certificate management</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Broader market reach for your certificates</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Enhanced revenue from granular certificates</span>
                      </li>
                    </ul>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox id="terms-utility" required />
                      <Label htmlFor="terms-utility" className="text-sm">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <Button disabled={loading} className="w-full mt-2 group">
                      {loading ? (
                        "Creating Account..."
                      ) : (
                        <>
                          <span>Create Utility Account</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/auth/sign-in" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default SignUpPage;
