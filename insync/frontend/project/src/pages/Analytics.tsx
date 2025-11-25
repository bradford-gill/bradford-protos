import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { executiveSummary, qualityMetrics, workforceData } from '../data/mockData';
import { TrendingDown, DollarSign, Clock, Activity, CheckCircle, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

export function Analytics() {
  const COLORS = ['#111827', '#4b5563', '#9ca3af'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="InSync Health" />

      <main className="max-w-[1800px] mx-auto p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600 mt-2 text-lg">Comprehensive performance metrics and insights</p>
        </div>

        <Tabs defaultValue="executive" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="executive">Executive Summary</TabsTrigger>
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
            <TabsTrigger value="workforce">Workforce Analytics</TabsTrigger>
            <TabsTrigger value="los">LOS Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="space-y-8">
            <Card className="border-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-start justify-between">
                  <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur">
                        <DollarSign className="h-8 w-8 text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h2 className="text-white/80 text-lg font-medium">Total Cost Savings</h2>
                        <p className="text-white/60 text-sm">Program to date</p>
                      </div>
                    </div>

                    <div className="text-7xl font-bold text-white tracking-tight">
                      ${executiveSummary.costSavings.toLocaleString()}
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                      <div className="space-y-2">
                        <div className="text-white/60 text-sm">Reduced Readmissions</div>
                        <div className="text-3xl font-bold text-white">$95K</div>
                        <div className="text-white/40 text-xs">51% of total</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-white/60 text-sm">Reduced Length of Stay</div>
                        <div className="text-3xl font-bold text-white">$58K</div>
                        <div className="text-white/40 text-xs">31% of total</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-white/60 text-sm">Avoided ED Visits</div>
                        <div className="text-3xl font-bold text-white">$32K</div>
                        <div className="text-white/40 text-xs">18% of total</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                      <TrendingDown className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-semibold text-sm">↑ 23% vs last quarter</span>
                    </div>
                    <div className="text-white/60 text-sm">Performance trending upward</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                      <TrendingDown className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-white/80 text-sm font-medium">30-Day Readmission Rate</div>
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">{executiveSummary.readmissionRate}%</div>
                  <p className="text-green-400 text-sm font-medium">↓ 1.3% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                      <Clock className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-white/80 text-sm font-medium">Average Length of Stay</div>
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">{executiveSummary.avgLOS} days</div>
                  <p className="text-white/60 text-sm">Current period</p>
                </CardContent>
              </Card>

              <Card className="border-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                      <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-white/80 text-sm font-medium">Current Admissions</div>
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">{executiveSummary.currentAdmissions}</div>
                  <p className="text-white/60 text-sm">Active patients</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                      <TrendingDown className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-white text-xl font-semibold">Readmission Rate Trend</div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={executiveSummary.readmissionTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis domain={[14, 20]} stroke="#9ca3af" />
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                      <Line type="monotone" dataKey="rate" stroke="#ffffff" strokeWidth={2.5} name="Readmission Rate %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                      <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-white text-xl font-semibold">Top Diagnoses</div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={executiveSummary.topDiagnoses} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9ca3af" />
                      <YAxis dataKey="diagnosis" type="category" width={80} stroke="#9ca3af" />
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="count" fill="#ffffff" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Average LOS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{qualityMetrics.avgLOS} days</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">30-Day Readmission</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{qualityMetrics.readmissionRate}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Mortality Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{qualityMetrics.mortalityRate}%</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>COPD Bundle Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={qualityMetrics.copdCompliance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} name="Compliance %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CHF Bundle Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={qualityMetrics.chfCompliance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} name="Compliance %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quality Measures</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Measure</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Goal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qualityMetrics.measures.map((measure, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{measure.measure}</TableCell>
                        <TableCell className="font-semibold">{measure.rate}</TableCell>
                        <TableCell>
                          {measure.trend === 'up' ? '↑' : '→'}
                        </TableCell>
                        <TableCell>{measure.goal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workforce" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Visits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{workforceData.totalVisits}</div>
                  <p className="text-xs text-gray-500 mt-1">Current period</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Avg Daily Visits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{workforceData.avgDailyVisits}</div>
                  <p className="text-xs text-green-600 mt-1">↑ 2 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Tasks Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{workforceData.tasksCompleted}</div>
                  <p className="text-xs text-green-600 mt-1">↑ {workforceData.tasksCompletedChange}% vs last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visits by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={workforceData.visitsByLocation}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="location" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visits" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Caseload</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={workforceData.caseload}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ risk, count }) => `${risk}: ${count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {workforceData.caseload.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Task Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold">{workforceData.tasksAssigned}</div>
                    <div className="text-sm text-gray-600 mt-1">Tasks Assigned</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold">{workforceData.tasksCompleted}</div>
                    <div className="text-sm text-gray-600 mt-1">Tasks Completed</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold">{workforceData.completionRate}%</div>
                    <div className="text-sm text-gray-600 mt-1">Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="los" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Length of Stay Variance Analyzer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-6 border rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Observed LOS</div>
                    <div className="text-3xl font-bold">4.3 days</div>
                  </div>
                  <div className="p-6 border rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Expected LOS</div>
                    <div className="text-3xl font-bold">5.1 days</div>
                  </div>
                </div>

                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Variance</div>
                  <div className="text-3xl font-bold text-green-600">-0.8 days</div>
                  <p className="text-sm text-gray-600 mt-2">Below expected, indicating improved efficiency</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>LOS Distribution by Days</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { days: '<3', count: 45 },
                    { days: '3-4', count: 58 },
                    { days: '5-6', count: 42 },
                    { days: '7+', count: 25 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="days" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
