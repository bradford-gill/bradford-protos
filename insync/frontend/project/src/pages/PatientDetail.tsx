import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockPatients, mockNotes, mockInterventions, mockMessages } from '../data/mockData';
import { ArrowLeft, MapPin, Calendar, Languages, Activity, Pill, Stethoscope } from 'lucide-react';

export function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = mockPatients.find(p => p.id === id);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const journeyEvents = [
    { event: 'Admission', date: '2025-11-15' },
    { event: 'Discharge', date: '2025-11-18' },
    ...(patient.location === 'SNF' ? [{ event: 'SNF Stay', date: '2025-11-19' }] : []),
    ...(patient.location === 'LTAC' ? [{ event: 'LTAC Stay', date: '2025-11-20' }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-600">Patient Record</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Demographics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500">Date of Birth</div>
                <div className="font-semibold">ROB: {patient.dob}</div>
              </div>
              <div>
                <div className="text-gray-500 flex items-center gap-1">
                  <Languages className="h-4 w-4" />
                  Language
                </div>
                <div className="font-semibold">{patient.language}</div>
              </div>
              <div>
                <div className="text-gray-500 flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  Risk Score
                </div>
                <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskScore}</Badge>
              </div>
              <div>
                <div className="text-gray-500 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
                <div className="font-semibold">{patient.location}</div>
              </div>
              <div>
                <div className="text-gray-500 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Next Contact
                </div>
                <div className="font-semibold">{patient.nextContact}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Patient Journey Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
                <div className="flex justify-between relative">
                  {journeyEvents.map((event, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm z-10">
                        {index + 1}
                      </div>
                      <div className="mt-2 text-center">
                        <div className="font-semibold text-sm">{event.event}</div>
                        <div className="text-xs text-gray-500">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="snapshot" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="snapshot">Snapshot</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="clinical">Clinical</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
          </TabsList>

          <TabsContent value="snapshot" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Clinical Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Diagnoses</div>
                    <div className="flex flex-wrap gap-2">
                      {patient.diagnosis.map((dx, i) => (
                        <Badge key={i} variant="outline">{dx}</Badge>
                      ))}
                    </div>
                  </div>

                  {patient.fev1 && (
                    <div>
                      <div className="text-sm text-gray-500">FEV1</div>
                      <div className="font-semibold">{patient.fev1}</div>
                    </div>
                  )}

                  {patient.goldStage && (
                    <div>
                      <div className="text-sm text-gray-500">GOLD Stage</div>
                      <div className="font-semibold">{patient.goldStage}</div>
                    </div>
                  )}

                  {patient.exacerbations !== undefined && (
                    <div>
                      <div className="text-sm text-gray-500">Exacerbations (Last Year)</div>
                      <div className="font-semibold">{patient.exacerbations}</div>
                    </div>
                  )}

                  {patient.ef && (
                    <div>
                      <div className="text-sm text-gray-500">Ejection Fraction</div>
                      <div className="font-semibold">{patient.ef}</div>
                    </div>
                  )}

                  {patient.nyha && (
                    <div>
                      <div className="text-sm text-gray-500">NYHA Classification</div>
                      <div className="font-semibold">{patient.nyha}</div>
                    </div>
                  )}

                  {patient.weight && (
                    <div>
                      <div className="text-sm text-gray-500">Weight</div>
                      <div className="font-semibold">{patient.weight}</div>
                    </div>
                  )}

                  {patient.equipment && (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Equipment</div>
                      <div className="flex flex-wrap gap-2">
                        {patient.equipment.map((eq, i) => (
                          <Badge key={i} variant="secondary">{eq}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5" />
                    Current Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {patient.medications?.map((med, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        {med}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotes.map((note, i) => (
                    <div key={i} className="border-l-4 border-blue-600 pl-4 py-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <span className="font-semibold">{note.author}</span>
                        <span>•</span>
                        <span>{note.date} at {note.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{note.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[...mockNotes, ...mockInterventions.map(i => ({
                    date: i.date,
                    time: '12:00 PM',
                    author: 'Care Team',
                    note: i.intervention
                  }))].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        {i < mockNotes.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-sm text-gray-500">{item.date}</div>
                        <div className="font-semibold">{item.author}</div>
                        <p className="text-sm text-gray-700 mt-1">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clinical">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vital Signs History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Vital signs tracking coming soon...</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lab Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Lab results coming soon...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Tasks & Interventions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInterventions.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.intervention}</div>
                        <div className="text-sm text-gray-500">{item.date}</div>
                      </div>
                      <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messaging">
            <Card>
              <CardHeader>
                <CardTitle>Team Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMessages.map((msg, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm">{msg.from}</span>
                        <span className="text-xs text-gray-500">{msg.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
