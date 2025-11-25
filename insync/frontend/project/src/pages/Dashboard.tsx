import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { mockPatients, mockSchedule } from '../data/mockData';
import { AlertCircle, Calendar, Clock, Home, Building2, Users, ChevronRight } from 'lucide-react';
import { TaskModal } from '../components/TaskModal';

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const highRiskPatients = mockPatients.filter(p => p.riskLevel === 'High').length;
  const mediumRiskPatients = mockPatients.filter(p => p.riskLevel === 'Medium').length;
  const lowRiskPatients = mockPatients.filter(p => p.riskLevel === 'Low').length;
  const recentDischarges = mockPatients.slice(0, 3);
  const scheduledQueue = mockPatients.slice(3, 5);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-green-50 text-green-700 border-green-200';
      case 'In Progress': return 'bg-gray-900 text-white border-gray-900';
      case 'Open': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-gray-900 text-white';
      case 'Medium': return 'bg-gray-600 text-white';
      case 'Low': return 'bg-gray-300 text-gray-900';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-[1800px] mx-auto p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Care Team Dashboard</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {today}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="h-5 w-5 text-gray-900" />
                Today's Priorities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all text-left group"
                onClick={() => setSelectedTask('respiratory')}
              >
                <span className="text-gray-700 font-medium">Patients with worsening respiratory symptoms</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gray-900 text-white">3</Badge>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
              <button
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all text-left group"
                onClick={() => setSelectedTask('readmission')}
              >
                <span className="text-gray-700 font-medium">Patients readmitted within 30 days</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gray-900 text-white">2</Badge>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-gray-900" />
                Patient Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">High Risk Patients</span>
                <Badge className="bg-gray-900 text-white px-3 py-1">{highRiskPatients}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">Medium Risk Patients</span>
                <Badge className="bg-gray-600 text-white px-3 py-1">{mediumRiskPatients}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">Low Risk Patients</span>
                <Badge className="bg-gray-300 text-gray-900 px-3 py-1">{lowRiskPatients}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="h-5 w-5 text-gray-900" />
              My Schedule Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockSchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all group">
                  <div className="min-w-24 font-semibold text-gray-900">{item.time}</div>
                  <div className="flex items-center gap-2">
                    {item.facility === 'Home' ? (
                      <Home className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Building2 className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-gray-600">{item.type}</span>
                  </div>
                  <Button
                    variant="link"
                    className="text-gray-900 p-0 font-medium hover:underline"
                    onClick={() => navigate(`/patient/${mockPatients.find(p => p.name === item.patient)?.id}`)}
                  >
                    {item.patient}
                  </Button>
                  <Badge className={`${getStatusColor(item.status)} border ml-auto`}>{item.status}</Badge>
                  <span className="text-gray-500 text-sm">{item.facility}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Recent Discharges (New to Program)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDischarges.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all group">
                    <div className="space-y-2">
                      <Button
                        variant="link"
                        className="text-gray-900 p-0 h-auto font-semibold text-base hover:underline"
                        onClick={() => navigate(`/patient/${patient.id}`)}
                      >
                        {patient.name}
                      </Button>
                      <div className="text-sm text-gray-600">{patient.diagnosis[0]}</div>
                      <div className="text-xs text-gray-500">Last contact: {patient.lastContact}</div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                      <div className="text-xs text-gray-500">{patient.dischargeFacility}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">My Schedule Queue (Scheduled)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledQueue.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all group">
                    <Button
                      variant="link"
                      className="text-gray-900 p-0 h-auto font-semibold text-base hover:underline"
                      onClick={() => navigate(`/patient/${patient.id}`)}
                    >
                      {patient.name}
                    </Button>
                    <div className="text-right space-y-1">
                      <div className="text-sm text-gray-600">{patient.dischargeFacility}</div>
                      <div className="text-xs text-gray-500">{patient.daysSinceDischarge} days since discharge</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 bg-white border-t border-gray-200 mt-12">
        <div className="flex items-center justify-center gap-6">
          <span className="font-medium">v2.1.0</span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-medium">HIPAA Compliant</span>
          </span>
        </div>
      </footer>

      <TaskModal
        open={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        taskType={selectedTask}
      />
    </div>
  );
}
