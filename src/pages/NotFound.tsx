
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-renuwGreen">404</h1>
          <p className="text-xl text-muted-foreground">{t("pageNotFound")}</p>
        </div>
        <p className="max-w-md text-muted-foreground">
          {t("couldNotFindPage")}
        </p>
        <Button asChild>
          <Link to="/">{t("returnToDashboard")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
