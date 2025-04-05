
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CorporateAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Detailed insights into your renewable energy portfolio</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Time Matching Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-6xl font-bold">78%</div>
              <Progress value={78} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                Your renewable energy generation matches with your consumption 78% of the time
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-6xl font-bold">92%</div>
              <Progress value={92} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                Your portfolio covers 92% of your total energy consumption
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">Time Matching by Technology</div>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#735DFF] mr-2" />
                      <span>Wind</span>
                    </div>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="mt-1" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#D9F0C2] mr-2" />
                      <span>Solar</span>
                    </div>
                    <span>62%</span>
                  </div>
                  <Progress value={62} className="mt-1" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Matching Score by Time Period</div>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Working Hours</div>
                  <div className="text-lg font-semibold">76%</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Nights</div>
                  <div className="text-lg font-semibold">81%</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Weekends</div>
                  <div className="text-lg font-semibold">72%</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Holidays</div>
                  <div className="text-lg font-semibold">68%</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Allocation by Source</div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-[#735DFF]/20 text-[#735DFF] mr-2">Wind</Badge>
                      <span className="font-medium">Vestas Wind Farm</span>
                    </div>
                    <span>157.5 GWh</span>
                  </div>
                  <Progress value={70} className="mb-1" />
                  <div className="text-xs text-muted-foreground">70% of portfolio</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-[#D9F0C2]/20 text-[#D9F0C2] mr-2">Solar</Badge>
                      <span className="font-medium">SolarEdge Farm</span>
                    </div>
                    <span>67.5 GWh</span>
                  </div>
                  <Progress value={30} className="mb-1" />
                  <div className="text-xs text-muted-foreground">30% of portfolio</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorporateAnalytics;
