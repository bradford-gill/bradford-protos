import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { contractData } from '../data/mockData';
import { DollarSign, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

export function ContractPerformance() {
  const stratumData = [
    { name: 'Stratum 1', value: 450 },
    { name: 'Stratum 2', value: 620 },
    { name: 'Stratum 3', value: 820 },
    { name: 'Stratum 4', value: 580 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Contract Performance" />

      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ACO Contract Performance</h1>
          <p className="text-gray-600 mt-1">Financial and quality metrics for value-based contracts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contract Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Category</TableHead>
                  <TableHead>Lives</TableHead>
                  <TableHead>Attribution Date</TableHead>
                  <TableHead>Benchmark PMPM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractData.summary.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.risk}</TableCell>
                    <TableCell>{row.lives}</TableCell>
                    <TableCell>{row.attribution}</TableCell>
                    <TableCell>{row.benchmark}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Expenditures PMPM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{contractData.expendituresPMPM}</div>
              <p className="text-xs text-gray-600 mt-1">Below benchmark</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Average Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{contractData.avgRiskScore}</div>
              <p className="text-xs text-gray-500 mt-1">Population average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Shared Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{contractData.sharedSavings}</div>
              <p className="text-xs text-gray-500 mt-1">Current contract period</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contract Period Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={contractData.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#4b5563" name="Shared Savings" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead>Benchmark</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contractData.metrics.map((metric, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{metric.name}</TableCell>
                      <TableCell className="text-gray-900 font-semibold">{metric.actual}</TableCell>
                      <TableCell>{metric.benchmark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stratum Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stratumData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4b5563" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
