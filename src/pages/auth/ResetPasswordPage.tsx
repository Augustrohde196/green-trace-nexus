
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/layout/auth-layout";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: t("resetLinkSent"),
        description: "If the email exists in our system, you'll receive a reset link shortly.",
      });
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="mx-auto flex w-full flex-col space-y-6 sm:w-[350px] md:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t("resetPassword")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("enterEmail")}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button disabled={loading} className="w-full mt-2">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>{t("sending")}</span>
                </>
              ) : (
                <span>{t("sendResetLink")}</span>
              )}
            </Button>
          </form>
        ) : (
          <div className="grid gap-6">
            <div className="rounded-lg border p-6 bg-muted/50">
              <h3 className="font-medium mb-2">{t("checkEmail")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("resetLinkSent")} <strong>{email}</strong>
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {t("didntReceiveEmail")}
              </p>
            </div>
          </div>
        )}
        
        <div className="text-center">
          <Link to="/auth/sign-in" className="text-sm flex items-center justify-center gap-1 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            <span>{t("backToSignIn")}</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
