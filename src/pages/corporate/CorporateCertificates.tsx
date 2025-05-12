
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const certificates = [
  { 
    id: "GH-23985-A", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Denmark", 
    period: "Q1 2024", 
    volume: "45.2 GWh",
    status: "active"
  },
  { 
    id: "GH-23765-B", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Sweden", 
    period: "Q1 2024", 
    volume: "32.8 GWh",
    status: "active"
  },
  { 
    id: "GH-24001-C", 
    type: "Solar", 
    asset: "SolarEdge Farm, Spain", 
    period: "Q1 2024", 
    volume: "18.5 GWh",
    status: "active"
  },
  { 
    id: "GH-22456-D", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Denmark", 
    period: "Q4 2023", 
    volume: "41.7 GWh",
    status: "active"
  },
  { 
    id: "GH-22127-E", 
    type: "Solar", 
    asset: "SolarEdge Farm, Spain", 
    period: "Q4 2023", 
    volume: "15.2 GWh",
    status: "active"
  },
  { 
    id: "GH-21875-F", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Sweden", 
    period: "Q4 2023", 
    volume: "37.8 GWh",
    status: "active"
  },
  { 
    id: "GH-21003-G", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Denmark", 
    period: "Q3 2023", 
    volume: "38.9 GWh",
    status: "expired"
  },
  { 
    id: "GH-20876-H", 
    type: "Solar", 
    asset: "SolarEdge Farm, Spain", 
    period: "Q3 2023", 
    volume: "21.4 GWh",
    status: "expired"
  },
];

const CorporateCertificates = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t("myCertificates")}</h2>
        <p className="text-muted-foreground">{t("viewAndManage")}</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>{t("energyCertificates")}</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("searchCertificates")}
                  className="w-full sm:w-[250px] pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {t("filter")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("certificateID")}</TableHead>
                <TableHead>{t("type")}</TableHead>
                <TableHead>{t("asset")}</TableHead>
                <TableHead>{t("period")}</TableHead>
                <TableHead>{t("volume")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cert.type === "Wind" 
                      ? "bg-[#735DFF]/20 text-[#735DFF] hover:bg-[#735DFF]/30"
                      : "bg-[#D9F0C2]/20 text-[#D9F0C2] hover:bg-[#D9F0C2]/30"
                    }>
                      {cert.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{cert.asset}</TableCell>
                  <TableCell>{cert.period}</TableCell>
                  <TableCell>{cert.volume}</TableCell>
                  <TableCell>
                    <Badge variant={cert.status === "active" ? "default" : "secondary"}>
                      {cert.status === "active" ? t("active") : t("expired")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      {t("export")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorporateCertificates;
