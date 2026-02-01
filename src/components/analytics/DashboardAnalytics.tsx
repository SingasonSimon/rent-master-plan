import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Building2, CreditCard, Users, Home } from 'lucide-react';

// Mock data for occupancy trends (last 12 months)
const occupancyData = [
  { month: 'Jan', occupancy: 85, available: 15 },
  { month: 'Feb', occupancy: 87, available: 13 },
  { month: 'Mar', occupancy: 89, available: 11 },
  { month: 'Apr', occupancy: 88, available: 12 },
  { month: 'May', occupancy: 91, available: 9 },
  { month: 'Jun', occupancy: 93, available: 7 },
  { month: 'Jul', occupancy: 92, available: 8 },
  { month: 'Aug', occupancy: 94, available: 6 },
  { month: 'Sep', occupancy: 95, available: 5 },
  { month: 'Oct', occupancy: 93, available: 7 },
  { month: 'Nov', occupancy: 91, available: 9 },
  { month: 'Dec', occupancy: 89, available: 11 },
];

// Mock data for payment history (last 12 months)
const paymentData = [
  { month: 'Jan', collected: 2450000, pending: 350000, overdue: 120000 },
  { month: 'Feb', collected: 2520000, pending: 280000, overdue: 100000 },
  { month: 'Mar', collected: 2680000, pending: 320000, overdue: 80000 },
  { month: 'Apr', collected: 2590000, pending: 410000, overdue: 150000 },
  { month: 'May', collected: 2750000, pending: 250000, overdue: 90000 },
  { month: 'Jun', collected: 2880000, pending: 220000, overdue: 70000 },
  { month: 'Jul', collected: 2820000, pending: 280000, overdue: 100000 },
  { month: 'Aug', collected: 2950000, pending: 200000, overdue: 50000 },
  { month: 'Sep', collected: 3020000, pending: 180000, overdue: 40000 },
  { month: 'Oct', collected: 2890000, pending: 310000, overdue: 110000 },
  { month: 'Nov', collected: 2780000, pending: 350000, overdue: 130000 },
  { month: 'Dec', collected: 2650000, pending: 400000, overdue: 160000 },
];

// Mock data for unit type distribution
const unitTypeData = [
  { name: 'Studio', value: 15, color: 'hsl(var(--chart-1))' },
  { name: 'Bedsitter', value: 25, color: 'hsl(var(--chart-2))' },
  { name: '1 BR', value: 35, color: 'hsl(var(--chart-3))' },
  { name: '2 BR', value: 18, color: 'hsl(var(--chart-4))' },
  { name: '3+ BR', value: 7, color: 'hsl(var(--chart-5))' },
];

// Mock data for property performance
const propertyPerformanceData = [
  { name: 'Sunrise Apartments', occupancy: 95, revenue: 1250000 },
  { name: 'Garden Estate', occupancy: 88, revenue: 980000 },
  { name: 'City View Complex', occupancy: 92, revenue: 1450000 },
  { name: 'Green Meadows', occupancy: 78, revenue: 650000 },
  { name: 'Lake View Residences', occupancy: 96, revenue: 1680000 },
];

const formatCurrency = (value: number) => {
  return `KES ${(value / 1000).toFixed(0)}K`;
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  trend: 'up' | 'down';
}

function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
            <div className={`mt-1 flex items-center gap-1 text-sm ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
              {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{Math.abs(change)}% vs last month</span>
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardAnalytics() {
  const [timeRange, setTimeRange] = useState('12m');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track occupancy trends and payment performance</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Avg. Occupancy Rate"
          value="90.6%"
          change={2.3}
          icon={Building2}
          trend="up"
        />
        <StatCard
          title="Total Revenue"
          value="KES 32.9M"
          change={5.8}
          icon={CreditCard}
          trend="up"
        />
        <StatCard
          title="Collection Rate"
          value="94.2%"
          change={1.2}
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Active Tenants"
          value="247"
          change={-0.8}
          icon={Users}
          trend="down"
        />
      </div>

      {/* Main Charts */}
      <Tabs defaultValue="occupancy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="occupancy">Occupancy Trends</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="properties">Property Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="occupancy" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Occupancy Trend Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Occupancy Rate Over Time</CardTitle>
                <CardDescription>Monthly occupancy percentage across all properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={occupancyData}>
                      <defs>
                        <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis domain={[70, 100]} tickFormatter={(v) => `${v}%`} className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [`${value}%`, 'Occupancy']}
                      />
                      <Area
                        type="monotone"
                        dataKey="occupancy"
                        stroke="hsl(var(--primary))"
                        fill="url(#occupancyGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Unit Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Unit Type Distribution</CardTitle>
                <CardDescription>Breakdown by bedroom count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={unitTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {unitTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [`${value} units`, 'Count']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Payment History Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Payment Collection History</CardTitle>
                <CardDescription>Monthly breakdown of collected, pending, and overdue payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paymentData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis tickFormatter={formatCurrency} className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [formatCurrency(value), '']}
                      />
                      <Legend />
                      <Bar dataKey="collected" name="Collected" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" name="Pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="overdue" name="Overdue" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Payment Status Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Month's Status</CardTitle>
                <CardDescription>Current payment breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success" />
                      <span className="text-sm">Collected</span>
                    </div>
                    <span className="font-semibold">KES 2.65M</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-success" style={{ width: '82%' }} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-warning" />
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="font-semibold">KES 400K</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-warning" style={{ width: '12%' }} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                      <span className="text-sm">Overdue</span>
                    </div>
                    <span className="font-semibold">KES 160K</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-destructive" style={{ width: '6%' }} />
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Collection Rate</p>
                    <p className="text-3xl font-bold text-success">82.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          {/* Property Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Property Performance Comparison</CardTitle>
              <CardDescription>Occupancy rate and revenue by property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={propertyPerformanceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} className="text-xs" />
                    <YAxis type="category" dataKey="name" width={150} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'occupancy' ? `${value}%` : formatCurrency(value),
                        name === 'occupancy' ? 'Occupancy' : 'Revenue',
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="occupancy" name="Occupancy %" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Property Revenue Table */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Property</CardTitle>
              <CardDescription>Monthly revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyPerformanceData
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((property, index) => (
                    <div key={property.name} className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{property.name}</span>
                          <span className="font-semibold">{formatCurrency(property.revenue)}</span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(property.revenue / 1680000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
