
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Download, FileText, MapPin, Leaf, BatteryIcon, SunMedium,
  Wind, Activity, Calendar, Filter, Award, Zap, Calendar as CalendarIcon,
  X, ExternalLink, Info, LayoutGrid, Timer
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

// Sample data for time-matching scores by month
const timeMatchingData = [
  { month: "Jan", score: 72, hourlyAlignment: 65, peakMatch: 58, offPeakMatch: 82 },
  { month: "Feb", score: 68, hourlyAlignment: 62, peakMatch: 54, offPeakMatch: 78 },
  { month: "Mar", score: 85, hourlyAlignment: 80, peakMatch: 75, offPeakMatch: 90 },
  { month: "Apr", score: 76, hourlyAlignment: 70, peakMatch: 65, offPeakMatch: 85 },
  { month: "May", score: 82, hourlyAlignment: 75, peakMatch: 72, offPeakMatch: 88 },
  { month: "Jun", score: 89, hourlyAlignment: 84, peakMatch: 80, offPeakMatch: 94 },
];

// Generate time-matching data based on filter
const generateTimeMatchingData = (filter) => {
  switch(filter) {
    case "7d":
      return [
        { month: "Mon", score: 75, hourlyAlignment: 68, peakMatch: 62, offPeakMatch: 82 },
        { month: "Tue", score: 80, hourlyAlignment: 75, peakMatch: 70, offPeakMatch: 85 },
        { month: "Wed", score: 78, hourlyAlignment: 72, peakMatch: 68, offPeakMatch: 84 },
        { month: "Thu", score: 82, hourlyAlignment: 76, peakMatch: 72, offPeakMatch: 88 },
        { month: "Fri", score: 85, hourlyAlignment: 80, peakMatch: 75, offPeakMatch: 90 },
        { month: "Sat", score: 80, hourlyAlignment: 75, peakMatch: 68, offPeakMatch: 86 },
        { month: "Sun", score: 75, hourlyAlignment: 70, peakMatch: 64, offPeakMatch: 82 },
      ];
    case "30d":
      return [
        { month: "W1", score: 72, hourlyAlignment: 65, peakMatch: 60, offPeakMatch: 80 },
        { month: "W2", score: 75, hourlyAlignment: 70, peakMatch: 65, offPeakMatch: 82 },
        { month: "W3", score: 79, hourlyAlignment: 74, peakMatch: 70, offPeakMatch: 85 },
        { month: "W4", score: 82, hourlyAlignment: 78, peakMatch: 72, offPeakMatch: 88 },
      ];
    case "3m":
      return [
        { month: "Apr", score: 76, hourlyAlignment: 70, peakMatch: 65, offPeakMatch: 85 },
        { month: "May", score: 82, hourlyAlignment: 75, peakMatch: 72, offPeakMatch: 88 },
        { month: "Jun", score: 89, hourlyAlignment: 84, peakMatch: 80, offPeakMatch: 94 },
      ];
    case "6m":
      return timeMatchingData;
    case "ytd":
      return [
        { month: "Jan", score: 72, hourlyAlignment: 65, peakMatch: 58, offPeakMatch: 82 },
        { month: "Feb", score: 68, hourlyAlignment: 62, peakMatch: 54, offPeakMatch: 78 },
        { month: "Mar", score: 85, hourlyAlignment: 80, peakMatch: 75, offPeakMatch: 90 },
        { month: "Apr", score: 76, hourlyAlignment: 70, peakMatch: 65, offPeakMatch: 85 },
        { month: "May", score: 82, hourlyAlignment: 75, peakMatch: 72, offPeakMatch: 88 },
        { month: "Jun", score: 89, hourlyAlignment: 84, peakMatch: 80, offPeakMatch: 94 },
      ];
    case "1y":
      return [
        { month: "Jan", score: 72, hourlyAlignment: 65, peakMatch: 58, offPeakMatch: 82 },
        { month: "Feb", score: 68, hourlyAlignment: 62, peakMatch: 54, offPeakMatch: 78 },
        { month: "Mar", score: 85, hourlyAlignment: 80, peakMatch: 75, offPeakMatch: 90 },
        { month: "Apr", score: 76, hourlyAlignment: 70, peakMatch: 65, offPeakMatch: 85 },
        { month: "May", score: 82, hourlyAlignment: 75, peakMatch: 72, offPeakMatch: 88 },
        { month: "Jun", score: 89, hourlyAlignment: 84, peakMatch: 80, offPeakMatch: 94 },
        { month: "Jul", score: 92, hourlyAlignment: 88, peakMatch: 85, offPeakMatch: 95 },
        { month: "Aug", score: 87, hourlyAlignment: 82, peakMatch: 78, offPeakMatch: 90 },
        { month: "Sep", score: 79, hourlyAlignment: 74, peakMatch: 70, offPeakMatch: 85 },
        { month: "Oct", score: 73, hourlyAlignment: 68, peakMatch: 64, offPeakMatch: 80 },
        { month: "Nov", score: 70, hourlyAlignment: 65, peakMatch: 60, offPeakMatch: 78 },
        { month: "Dec", score: 75, hourlyAlignment: 70, peakMatch: 65, offPeakMatch: 82 },
      ];
    default:
      return timeMatchingData;
  }
};

// Time periods for filtering
const timePeriods = [
  { label: "This Month", value: "current" },
  { label: "Last Month", value: "last" },
  { label: "Last 3 Months", value: "3m" },
  { label: "Year to Date", value: "ytd" },
];

// Date filters for charts
const dateFilters = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "YTD", value: "ytd" },
  { label: "1Y", value: "1y" },
];

// Source assets data
const sourceAssetsData = [
  { 
    id: 1,
    name: "Nordsee Wind Farm", 
    location: "Germany",
    type: "Wind", 
    volume: 50,
    capacity: "120 MW",
    matchScore: "85%",
    coordinates: "54.0° N, 8.0° E",
    yearBuilt: 2019,
    assetOwner: "GreenWind GmbH",
    carbonOffset: "89,000 tons/year",
    energyProduction: "350 GWh/year",
    performance: "97% uptime"
  },
  { 
    id: 2,
    name: "Hvide Sande Wind", 
    location: "Denmark",
    type: "Wind", 
    volume: 10,
    capacity: "40 MW",
    matchScore: "78%",
    coordinates: "56.0° N, 8.1° E",
    yearBuilt: 2020,
    assetOwner: "Nordic Renewables A/S",
    carbonOffset: "32,000 tons/year",
    energyProduction: "120 GWh/year",
    performance: "95% uptime"
  },
  { 
    id: 3,
    name: "Nykøbing Solar", 
    location: "Denmark",
    type: "Solar", 
    volume: 40,
    capacity: "85 MW",
    matchScore: "72%",
    coordinates: "54.8° N, 11.9° E",
    yearBuilt: 2021,
    assetOwner: "SolarPower Denmark",
    carbonOffset: "45,000 tons/year",
    energyProduction: "160 GWh/year",
    performance: "99% uptime"
  },
  { 
    id: 4,
    name: "Andalucía Solar", 
    location: "Spain",
    type: "Solar", 
    volume: 25,
    capacity: "60 MW",
    matchScore: "81%",
    coordinates: "37.5° N, 5.0° W",
    yearBuilt: 2022,
    assetOwner: "Energía Solar Ibérica",
    carbonOffset: "38,000 tons/year",
    energyProduction: "200 GWh/year",
    performance: "98% uptime"
  }
];

const CorporateDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [timeMatchingPeriod, setTimeMatchingPeriod] = useState("6m");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isAssetDialogOpen, setIsAssetDialogOpen] = useState(false);
  const { toast } = useToast();

  // Get data based on selected filter
  const filteredData = generateTimeMatchingData(timeMatchingPeriod);

  // Calculate average time-matching score
  const averageScore = Math.round(
    filteredData.reduce((sum, item) => sum + item.score, 0) / filteredData.length
  );

  const generateReport = () => {
    toast({
      title: "Generating ESG report",
      description: "Your ESG report is being prepared and will be ready for download shortly.",
      duration: 3000,
    });
  };

  // Show asset details
  const showAssetDetails = (asset) => {
    setSelectedAsset(asset);
    setIsAssetDialogOpen(true);
  };

  // Card animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Subtle hover animation for cards
  const subtleHoverVariants = {
    hover: {
      y: -3,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
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
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-background/80 backdrop-blur border-muted-foreground/20 shadow-sm"
              onClick={() => toast({ title: "Date Selection", description: "Date filtering options would appear here." })}
            >
              <CalendarIcon size={16} className="text-muted-foreground" />
              Date
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={generateReport} 
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white shadow-md"
            >
              <Download size={16} />
              Generate Report
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Time-Matching Score Highlight */}
      <motion.div 
        className="bg-primary/10 rounded-lg p-6 border border-primary/20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        whileHover={{ 
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", 
          transition: { duration: 0.2 }
        }}
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
      
      {/* Metrics Cards - Fixed styling to match utility portal cards */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border border-border/40 hover:border-primary/30 h-[140px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Annual Consumption</CardTitle>
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-blue-500">
                <Activity className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245 GWh</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                +2.5% from last year
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border border-border/40 hover:border-primary/30 h-[140px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Asset Sources</CardTitle>
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-purple-500">
                <MapPin className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                From 3 Locations
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border border-border/40 hover:border-primary/30 h-[140px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">CO₂ Avoided</CardTitle>
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-green-500">
                <Leaf className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">112 tons</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                Equivalent to 5,100 trees
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border border-border/40 hover:border-primary/30 h-[140px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Mix</CardTitle>
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-amber-500">
                <BatteryIcon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60% / 40%</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                Wind / Solar split
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Energy Usage vs Green Supply Graph - Updated as requested */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={subtleHoverVariants.hover}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Time Matching Scores</CardTitle>
            </div>
            <div className="flex items-center bg-muted/40 p-1 rounded-md border">
              {dateFilters.map((period) => (
                <Button
                  key={period.value}
                  variant={timeMatchingPeriod === period.value ? "default" : "ghost"}
                  size="sm"
                  className={`text-xs px-3 rounded-sm ${
                    timeMatchingPeriod === period.value 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-background/60"
                  }`}
                  onClick={() => setTimeMatchingPeriod(period.value)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Score %', angle: 90, position: 'insideRight' }} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#ff7300" 
                    name="Matching Score (%)" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Merge Average Matching Score and Best Month into Time Matching chart card */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6 border-t pt-6">
              <div className="overflow-hidden border hover:border-primary/50 rounded-lg p-4 transition-all">
                <div className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Average Matching Score
                </div>
                <div className="text-sm text-muted-foreground mb-2">Last 6 months performance</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{averageScore}%</div>
                    <div className="text-sm text-green-600 flex items-center mt-1">
                      +4% from previous period
                    </div>
                  </div>
                  <div className="h-16 w-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredData}>
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="overflow-hidden border hover:border-primary/50 rounded-lg p-4 transition-all">
                <div className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Best Performing Month
                </div>
                <div className="text-sm text-muted-foreground mb-2">Highest time-matching achievement</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">June</div>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                      89% time-matching score
                    </div>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="text-xl font-bold text-green-600">89%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Traceability Highlights - Redesigned as Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={subtleHoverVariants.hover}
      >
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Traceability Highlights</CardTitle>
              <CardDescription>Key assets powering your energy this period</CardDescription>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/corporate/tracing">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-primary/5 border-primary/20 hover:bg-primary/10 flex items-center gap-1.5"
                >
                  <MapPin className="h-4 w-4" />
                  View Full Map
                </Button>
              </Link>
            </motion.div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sourceAssetsData.map((asset) => (
                <motion.div 
                  key={asset.id}
                  whileHover={subtleHoverVariants.hover}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => showAssetDetails(asset)}
                  className="relative overflow-hidden rounded-lg border p-4 cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div 
                      className={`flex items-center justify-center rounded-full h-8 w-8 ${
                        asset.type === 'Wind' ? 'bg-blue-100' : 'bg-amber-100'
                      }`}
                    >
                      {asset.type === 'Wind' ? 
                        <Wind size={16} className="text-blue-600" /> : 
                        <SunMedium size={16} className="text-amber-600" />
                      }
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        asset.type === 'Wind' 
                          ? 'bg-blue-100 text-blue-600 border-blue-200' 
                          : 'bg-amber-100 text-amber-600 border-amber-200'
                      }`}
                    >
                      {asset.type}
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="font-semibold text-base">{asset.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{asset.location}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="font-medium">{asset.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                      <p className="font-medium">{asset.matchScore}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 p-2 text-muted-foreground/50">
                    <Info size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Environmental Impact - Updated Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-8"
        whileHover={subtleHoverVariants.hover}
      >
        <Card className="border-t-4 border-t-green-500 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <motion.div 
                className="flex flex-col items-center text-center"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Leaf size={32} className="text-green-600" />
                </div>
                <div className="text-3xl font-bold">540 tons</div>
                <div className="text-sm text-muted-foreground">CO2 emissions avoided</div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Award size={32} className="text-blue-600" />
                </div>
                <div className="text-3xl font-bold">25,000</div>
                <div className="text-sm text-muted-foreground">Trees equivalent</div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Timer size={32} className="text-amber-600" />
                </div>
                <div className="text-3xl font-bold">{averageScore}%</div>
                <div className="text-sm text-muted-foreground">Time-Matching Score</div>
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  onClick={generateReport} 
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate ESG Report
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Asset Details Dialog */}
      <Dialog open={isAssetDialogOpen} onOpenChange={setIsAssetDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAsset?.type === 'Wind' ? (
                <Wind size={18} className="text-blue-600" />
              ) : (
                <SunMedium size={18} className="text-amber-600" />
              )}
              {selectedAsset?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed information about this renewable energy asset
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedAsset && (
              <>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <Badge 
                      variant="outline" 
                      className={`${
                        selectedAsset.type === 'Wind' 
                          ? 'bg-blue-100 text-blue-600 border-blue-200' 
                          : 'bg-amber-100 text-amber-600 border-amber-200'
                      }`}
                    >
                      {selectedAsset.type}
                    </Badge>
                    <div className="text-lg font-semibold">{selectedAsset.capacity}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedAsset.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedAsset.coordinates}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Year Built</p>
                      <p className="font-medium">{selectedAsset.yearBuilt}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Asset Owner</p>
                    <p className="font-medium">{selectedAsset.assetOwner}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Energy Production</p>
                    <p className="font-medium">{selectedAsset.energyProduction}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Carbon Offset</p>
                    <p className="font-medium">{selectedAsset.carbonOffset}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Performance</p>
                    <p className="font-medium">{selectedAsset.performance}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={() => setIsAssetDialogOpen(false)}>
              Close
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-1.5"
              onClick={() => {
                setIsAssetDialogOpen(false);
                toast({
                  title: "Asset Details",
                  description: "Full asset details page would open here.",
                });
              }}
            >
              View Full Details <ExternalLink size={14} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CorporateDashboard;
