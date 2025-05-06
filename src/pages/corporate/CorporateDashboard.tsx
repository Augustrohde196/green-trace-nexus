
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Download, FileText, MapPin, Leaf, BatteryIcon, SunMedium,
  Wind, Activity, Calendar, Filter, Award, Zap
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
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

// Sample data for time-matching scores by month
const timeMatchingData = [
  { month: "Jan", score: 72, consumption: 18, production: 15 },
  { month: "Feb", score: 68, consumption: 20, production: 18 },
  { month: "Mar", score: 85, consumption: 22, production: 25 },
  { month: "Apr", score: 76, consumption: 24, production: 22 },
  { month: "May", score: 82, consumption: 25, production: 28 },
  { month: "Jun", score: 89, consumption: 28, production: 30 },
];

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
    name: "Nordsee Wind Farm", 
    location: "Germany",
    type: "Wind", 
    volume: 50,
    capacity: "120 MW",
    matchScore: "85%"
  },
  { 
    name: "Hvide Sande Wind", 
    location: "Denmark",
    type: "Wind", 
    volume: 10,
    capacity: "40 MW",
    matchScore: "78%"
  },
  { 
    name: "Nykøbing Solar", 
    location: "Denmark",
    type: "Solar", 
    volume: 40,
    capacity: "85 MW",
    matchScore: "72%"
  },
  { 
    name: "Andalucía Solar", 
    location: "Spain",
    type: "Solar", 
    volume: 25,
    capacity: "60 MW",
    matchScore: "81%"
  }
];

const CorporateDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [timeMatchingPeriod, setTimeMatchingPeriod] = useState("6m");
  const { toast } = useToast();

  // Total consumption and production values (derived from the data)
  const totalConsumption = timeMatchingData.reduce((sum, item) => sum + item.consumption, 0);
  const totalProduction = timeMatchingData.reduce((sum, item) => sum + item.production, 0);
  
  // Calculate average time-matching score
  const averageScore = Math.round(
    timeMatchingData.reduce((sum, item) => sum + item.score, 0) / timeMatchingData.length
  );

  const generateReport = () => {
    toast({
      title: "Generating ESG report",
      description: "Your ESG report is being prepared and will be ready for download shortly.",
      duration: 3000,
    });
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

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-background/80 backdrop-blur border-muted-foreground/20 shadow-sm"
              onClick={() => toast({ title: "Filters", description: "Filter options would appear here." })}
            >
              <Filter size={16} className="text-muted-foreground" />
              Filter
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} whileHover="hover">
          <DashboardCard
            title="Annual Consumption"
            value="245 GWh"
            description="+2.5% from last year"
            icon={Activity}
            iconColor="text-blue-500"
          />
        </motion.div>
        <motion.div variants={itemVariants} whileHover="hover">
          <DashboardCard
            title="Certificates Coverage"
            value="92%"
            description="225 GWh covered with GOs"
            icon={FileText}
            iconColor="text-purple-500"
          />
        </motion.div>
        <motion.div variants={itemVariants} whileHover="hover">
          <DashboardCard
            title="CO₂ Avoided"
            value="112 tons"
            description="Equivalent to 5,100 trees"
            icon={Leaf}
            iconColor="text-green-500"
          />
        </motion.div>
        <motion.div variants={itemVariants} whileHover="hover">
          <DashboardCard
            title="Portfolio Mix"
            value="60% / 40%"
            description="Wind / Solar split"
            icon={BatteryIcon}
            iconColor="text-amber-500"
          />
        </motion.div>
      </motion.div>

      {/* Energy Usage vs Green Supply Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Time-Matching Scores</CardTitle>
              <CardDescription>Energy consumption vs. renewable allocation over time</CardDescription>
            </div>
            <select 
              className="border rounded-md px-3 py-1.5 bg-background text-sm"
              value={timeMatchingPeriod}
              onChange={(e) => setTimeMatchingPeriod(e.target.value)}
            >
              {dateFilters.map((period) => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
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
      </motion.div>

      {/* Added back: Average Matching Score and Best Month */}
      <motion.div 
        className="grid gap-4 grid-cols-1 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div whileHover={cardHoverVariants.hover}>
          <Card className="overflow-hidden border hover:border-primary/50 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Average Matching Score
              </CardTitle>
              <CardDescription>Last 6 months performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{averageScore}%</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    +4% from previous period
                  </div>
                </div>
                <div className="h-16 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeMatchingData}>
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
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div whileHover={cardHoverVariants.hover}>
          <Card className="overflow-hidden border hover:border-primary/50 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                Best Performing Month
              </CardTitle>
              <CardDescription>Highest time-matching achievement</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Traceability Highlights - Redesigned as Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Traceability Highlights</CardTitle>
              <CardDescription>Key assets powering your energy this period</CardDescription>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/corporate/tracing">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-primary/5 border-primary/20 hover:bg-primary/10"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View Full Map
                </Button>
              </Link>
            </motion.div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sourceAssetsData.map((asset, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative overflow-hidden rounded-lg border p-4 hover:shadow-md"
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
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Environmental Impact - New Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-8"
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
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Leaf size={32} className="text-green-600" />
                </div>
                <div className="text-3xl font-bold">540 tons</div>
                <div className="text-sm text-muted-foreground">CO2 emissions avoided</div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Award size={32} className="text-blue-600" />
                </div>
                <div className="text-3xl font-bold">25,000</div>
                <div className="text-sm text-muted-foreground">Trees equivalent</div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Zap size={32} className="text-amber-600" />
                </div>
                <div className="text-3xl font-bold">92%</div>
                <div className="text-sm text-muted-foreground">Renewable energy coverage</div>
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
    </motion.div>
  );
};

export default CorporateDashboard;
