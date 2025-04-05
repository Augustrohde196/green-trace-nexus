
import { useState } from "react";
import { FileText, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PoaUploadStepProps {
  data: {
    poaUploaded: boolean;
    poaFile: File | null;
  };
  updateData: (data: {
    poaUploaded: boolean;
    poaFile: File | null;
  }) => void;
}

export function PoaUploadStep({ data, updateData }: PoaUploadStepProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      // Simulate file upload
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          updateData({
            poaUploaded: true,
            poaFile: e.target.files![0]
          });
        }
      }, 100);
    }
  };

  const handleConsentChange = (checked: boolean) => {
    setIsAuthorized(checked);
    if (!checked) {
      updateData({
        poaUploaded: false,
        poaFile: null
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Power of Attorney</h3>
          <p className="text-sm text-muted-foreground">
            Provide authorization for us to access your electricity consumption data.
          </p>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-6">
        <div className="space-y-4">
          <h4 className="font-medium">Why we need this</h4>
          <p className="text-sm text-muted-foreground">
            To optimize your renewable energy portfolio and ensure accurate matching with your consumption,
            we need access to your electricity consumption data from your utility provider.
          </p>
          <p className="text-sm text-muted-foreground">
            This Power of Attorney document gives us permission to retrieve this data on your behalf,
            which will enable:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
            <li>Accurate hourly matching of production and consumption</li>
            <li>Better forecasting and portfolio optimization</li>
            <li>Detailed consumption analytics and reporting</li>
            <li>Streamlined onboarding process</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="consent" 
            checked={isAuthorized}
            onCheckedChange={(checked) => handleConsentChange(checked as boolean)} 
          />
          <Label 
            htmlFor="consent" 
            className="text-sm leading-tight"
          >
            I authorize Renuw to retrieve my electricity consumption data from my utility provider
          </Label>
        </div>

        {isAuthorized && (
          <div className="space-y-4">
            <div className="bg-primary/5 p-6 border-2 border-dashed border-primary/20 rounded-lg text-center">
              {data.poaUploaded ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <div className="bg-green-100 text-green-600 rounded-full p-2">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="font-medium text-green-600">Upload Complete</p>
                  <p className="text-sm text-muted-foreground">
                    {data.poaFile?.name} ({(data.poaFile?.size ? (data.poaFile.size / 1024 / 1024).toFixed(2) : 0)} MB)
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateData({ poaUploaded: false, poaFile: null })}
                  >
                    Replace File
                  </Button>
                </div>
              ) : isUploading ? (
                <div className="space-y-4">
                  <p className="font-medium">Uploading document...</p>
                  <Progress value={uploadProgress} />
                  <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  </div>
                  <h4 className="font-medium">Upload Power of Attorney</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your signed PoA document or click to browse
                  </p>
                  <Button asChild>
                    <label>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      Select File
                    </label>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Don't have a PoA document yet? <a href="#" className="text-primary underline">Download our template</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
