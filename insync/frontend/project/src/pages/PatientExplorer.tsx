import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockPatients } from '../data/mockData';
import { Filter, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

export function PatientExplorer() {
  const navigate = useNavigate();
  const [programFilter, setProgramFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredPatients = mockPatients.filter(patient => {
    if (programFilter !== 'all' && patient.program !== programFilter) return false;
    if (locationFilter !== 'all' && patient.location !== locationFilter) return false;
    if (riskFilter !== 'all' && patient.riskLevel !== riskFilter) return false;
    return true;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-gray-900 text-white';
      case 'Medium': return 'bg-gray-600 text-white';
      case 'Low': return 'bg-gray-300 text-gray-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Cohort Explorer</h1>
          <p className="text-gray-600 mt-1">Filter and analyze patient populations</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Program</label>
                <Select value={programFilter} onValueChange={setProgramFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="COPD/CHF">COPD/CHF</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                    <SelectItem value="TRACH/VENT">TRACH/VENT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="HOME">Home</SelectItem>
                    <SelectItem value="SNF">SNF</SelectItem>
                    <SelectItem value="LTAC">LTAC</SelectItem>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Level</label>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full" onClick={() => {
                  setProgramFilter('all');
                  setLocationFilter('all');
                  setRiskFilter('all');
                }}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Patient List ({filteredPatients.length} patients)</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Days Since Discharge</TableHead>
                  <TableHead>Readmission</TableHead>
                  <TableHead>Last Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/patient/${patient.id}`)}
                  >
                    <TableCell className="font-medium text-blue-600">{patient.name}</TableCell>
                    <TableCell>{patient.program}</TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                    </TableCell>
                    <TableCell>{patient.location}</TableCell>
                    <TableCell>{patient.daysSinceDischarge}</TableCell>
                    <TableCell>
                      {patient.readmission ? (
                        <Badge variant="destructive">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>{patient.lastContact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
