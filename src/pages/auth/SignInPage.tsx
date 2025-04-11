
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building2, Factory, ArrowRight, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthLayout } from "@/components/layout/auth-layout";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (userType: "corporate" | "utility") => (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Sign in successful",
        description: `Welcome back to the ${userType === "corporate" ? "Corporate" : "Utility/Trader"} Portal`,
      });
      navigate(userType === "corporate" ? "/corporate" : "/");
    }, 1000);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <AuthLayout>
      <div className="mx-auto flex w-full flex-col space-y-6 sm:w-[350px] md:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Renuw</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to access your portal
          </p>
        </div>

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
              <form onSubmit={handleSignIn("corporate")}>
                <div className="grid gap-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password-corporate">Password</Label>
                      <Link to="/auth/reset-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
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
                  </div>
                  <Button disabled={loading} className="w-full mt-2 group">
                    <span>Sign In</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/auth/sign-up" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="utility">
            <div className="grid gap-4">
              <form onSubmit={handleSignIn("utility")}>
                <div className="grid gap-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password-utility">Password</Label>
                      <Link to="/auth/reset-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
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
                  </div>
                  <Button disabled={loading} className="w-full mt-2 group">
                    <span>Sign In</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/auth/sign-up" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
