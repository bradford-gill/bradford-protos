import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { mockPatients } from '../data/mockData';
import { TrendingDown, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function ACODashboard() {
  const navigate = useNavigate();

  const admissionsData = [
    { name: 'COPD', value: 45, color: '#3b82f6' },
    { name: 'CHF', value: 38, color: '#10b981' },
    { name: 'Trach/Vent', value: 22, color: '#f59e0b' },
    { name: 'Other', value: 15, color: '#6b7280' },
  ];

  const readmissionTrend = [
    { month: 'Jan', copd: 18, chf: 16 },
    { month: 'Feb', copd: 17, chf: 15 },
    { month: 'Mar', copd: 16, chf: 14 },
    { month: 'Apr', copd: 15, chf: 13 },
  ];

  const notifications = [
    { type: 'New Readmission', patient: 'Maria Garcia', time: '2 hours ago', priority: 'high' },
    { type: 'High Risk Flag', patient: 'John Smith', time: '4 hours ago', priority: 'high' },
    { type: 'Missing Follow-up', patient: 'Robert Johnson', time: '1 day ago', priority: 'medium' },
    { type: 'Overdue Task', patient: 'Linda Chen', time: '1 day ago', priority: 'medium' },
    { type: 'SNF Transfer', patient: 'James Wilson', time: '2 days ago', priority: 'low' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="ACO Dashboard" />

      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ACO Performance Dashboard</h1>
          <p className="text-gray-600 mt-1">Key metrics and population health analytics</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Admissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,456</div>
              <p className="text-xs text-gray-500 mt-1">Current period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Avg Length of Stay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.3 days</div>
              <p className="text-xs text-green-600 mt-1">↓ 0.5 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                30-Day Readmission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15.2%</div>
              <p className="text-xs text-green-600 mt-1">↓ 2.1% from target</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Cost Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$230K</div>
              <p className="text-xs text-gray-500 mt-1">Program to date</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Admissions by Diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={admissionsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {admissionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>30-Day Readmission Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={readmissionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="copd" stroke="#3b82f6" name="COPD" strokeWidth={2} />
                  <Line type="monotone" dataKey="chf" stroke="#10b981" name="CHF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.map((notif, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${getPriorityColor(notif.priority)}`}>
                    <div className="font-semibold text-sm">{notif.type}</div>
                    <div className="text-sm text-gray-600">{notif.patient}</div>
                    <div className="text-xs text-gray-500 mt-1">{notif.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Patients at a Glance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockPatients.slice(0, 5).map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/patient/${patient.id}`)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold">
                        {patient.name}
                      </Button>
                      <Badge variant="outline">{patient.diagnosis[0]}</Badge>
                      <span className="text-sm text-gray-600">{patient.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                      <span className="text-sm text-gray-500 min-w-24">{patient.lastContact}</span>
                      <span className="text-sm text-gray-500 min-w-24">{patient.nextContact}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/patients')}>
                View All Patients
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button onClick={() => navigate('/contract-performance')} size="lg">
            View Contract Performance Details
          </Button>
        </div>
      </main>
    </div>
  );
}
