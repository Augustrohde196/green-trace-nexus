import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, MapPin, Leaf, BatteryIcon, SunMedium, Wind, Activity, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Legend
} from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

// Sample data for time-matching scores by month
const timeMatchingData = [
  { month: "Jan", score: 72, consumption: 18, production: 15 },
  { month: "Feb", score: 68, consumption: 20, production: 18 },
  { month: "Mar", score: 85, consumption: 22, production: 25 },
  { month: "Apr", score: 76, consumption: 24, production: 22 },
  { month: "May", score: 82, consumption: 25, production: 28 },
  { month: "Jun", score: 89, consumption: 28, production: 30 },
];

// Sample data for consumption profile
const consumptionData = [
  { hour: "00:00", weekday: 18, weekend: 22 },
  { hour: "04:00", weekday: 15, weekend: 17 },
  { hour: "08:00", weekday: 28, weekend: 19 },
  { hour: "12:00", weekday: 32, weekend: 24 },
  { hour: "16:00", weekday: 35, weekend: 27 },
  { hour: "20:00", weekday: 25, weekend: 30 },
];

// Energy source data
const energySourceData = [
  { name: "Wind", value: 60, color: "#8884d8" },
  { name: "Solar", value: 40, color: "#82ca9d" },
];

// Source assets data
const sourceAssetsData = [
  { name: "Nordsee Wind Farm (DE)", type: "Wind", volume: 50 },
  { name: "Hvide Sande Wind (DK)", type: "Wind", volume: 10 },
  { name: "Nykøbing Solar (DK)", type: "Solar", volume: 40 }
];

// Time periods for filtering
const timePeriods = [
  { label: "This Month", value: "current" },
  { label: "Last Month", value: "last" },
  { label: "Last 3 Months", value: "3m" },
  { label: "Year to Date", value: "ytd" },
];

const CorporateDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const { toast } = useToast();

  // Total consumption and production values (derived from the data)
  const totalConsumption = timeMatchingData.reduce((sum, item) => sum + item.consumption, 0);
  const totalProduction = timeMatchingData.reduce((sum, item) => sum + item.production, 0);
  
  // Calculate average time-matching score
  const averageScore = Math.round(
    timeMatchingData.reduce((sum, item) => sum + item.score, 0) / timeMatchingData.length
  );

  const downloadReport = () => {
    toast({
      title: "Downloading report",
      description: `Full ESG report for ${selectedPeriod === "current" ? "current month" : selectedPeriod} is being prepared.`,
      duration: 3000,
    });
  };

  const navigateToAssetDetails = (asset: any) => {
    toast({
      title: "Asset details",
      description: `Navigating to details for ${asset.name}`,
      duration: 2000,
    });
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Your renewable energy portfolio overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="border rounded-md px-3 py-1.5 bg-background text-sm"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {timePeriods.map((period) => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={downloadReport} className="gap-2">
            <Download size={16} />
            Download ESG Report
          </Button>
        </div>
      </div>
      
      {/* Time-Matching Score Highlight */}
      <motion.div 
        className="bg-primary/10 rounded-lg p-6 border border-primary/20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-lg font-medium mb-2">Time-Matching Score</h3>
            <div className="text-5xl font-bold text-primary mb-4">{averageScore}%</div>
            <p className="text-sm text-muted-foreground">
              {averageScore}% of your electricity consumption was matched with renewable energy produced at the same time.
              This represents your progress towards 24/7 clean energy.
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>Low</span>
                <span>Excellent</span>
              </div>
              <Progress value={averageScore} className="h-2" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm">For this period</span>
              </div>
              <div className="text-sm font-medium">{averageScore}% matched</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
                <span className="text-sm">Target</span>
              </div>
              <div className="text-sm font-medium">80% matched</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="text-sm">Industry average</span>
              </div>
              <div className="text-sm font-medium">65% matched</div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-medium">+4% from last month</span>
                <Link to="/corporate/reporting" className="text-primary hover:underline">View detailed report</Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Consumption</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245 GWh</div>
            <p className="text-xs text-muted-foreground">+2.5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Coverage</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">225 GWh covered with GOs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Avoided</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112 tons</div>
            <p className="text-xs text-muted-foreground">Equivalent to 5,100 trees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Mix</CardTitle>
            <div className="flex items-center space-x-1">
              <Wind className="h-4 w-4 text-blue-500" />
              <SunMedium className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60% / 40%</div>
            <p className="text-xs text-muted-foreground">Wind / Solar split</p>
          </CardContent>
        </Card>
      </div>

      {/* Energy Usage vs Green Supply Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Time-Matching Scores</CardTitle>
          <CardDescription>Energy consumption vs. renewable allocation over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timeMatchingData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'GWh', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Score %', angle: 90, position: 'insideRight' }} domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="consumption" fill="#8884d8" name="Consumption (GWh)" />
                <Bar yAxisId="left" dataKey="production" fill="#4DA167" name="Production (GWh)" />
                <Line yAxisId="right" type="monotone" dataKey="score" stroke="#ff7300" name="Matching Score (%)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Energy Certificates Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Certificates</CardTitle>
            <CardDescription>Breakdown of renewable energy by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6" id="certificates-chart">
              <div className="w-full md:w-1/2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energySourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {energySourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} MWh (${(Number(value)/totalConsumption * 100).toFixed(0)}%)`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#8884d8]"></span>
                        <span>Wind</span>
                      </div>
                      <span className="text-sm font-medium">60 MWh</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#82ca9d]"></span>
                        <span>Solar</span>
                      </div>
                      <span className="text-sm font-medium">40 MWh</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span>Total Coverage</span>
                      <span className="text-sm font-medium">100 MWh / 108 MWh</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Consumption Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Consumption Profile</CardTitle>
            <CardDescription>Hourly energy usage patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={consumptionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" />
                  <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value: number) => [`${value} MWh`, '']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="weekday" 
                    name="Weekday" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.3}
                    activeDot={{ r: 6 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="weekend" 
                    name="Weekend" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.3}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Hover over the chart to see detailed consumption values for specific hours.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traceability Highlights */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Traceability Highlights</CardTitle>
            <CardDescription>Key assets powering your energy this period</CardDescription>
          </div>
          <Link to="/corporate/tracing">
            <Button variant="outline" size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              View Full Map
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sourceAssetsData.map((asset, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${asset.type === 'Wind' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                    {asset.type === 'Wind' ? <Wind size={16} /> : <SunMedium size={16} />}
                  </div>
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-xs text-muted-foreground">{asset.type} Energy</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div>{asset.volume} MWh</div>
                    <div className="text-xs text-muted-foreground">{asset.volume}% of total</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary"
                    onClick={() => navigateToAssetDetails(asset)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 p-2 rounded-full mt-0.5">
                <Leaf size={16} />
              </div>
              <div>
                <div className="font-medium">Environmental Impact</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Your renewable energy procurement this period has avoided 112 tons of CO₂ emissions,
                  equivalent to planting 5,100 trees or removing 24 cars from the road for a year.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CorporateDashboard;
