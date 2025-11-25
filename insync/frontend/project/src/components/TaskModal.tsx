import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { mockTasks, mockPatients } from '../data/mockData';
import { Calendar, User, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  taskType: string | null;
}

export function TaskModal({ open, onClose, taskType }: TaskModalProps) {
  const [note, setNote] = useState('');

  const relevantTasks = taskType === 'respiratory'
    ? mockTasks.filter(t => t.priority === 'High').slice(0, 2)
    : mockTasks.filter(t => t.priority === 'High').slice(0, 1);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Priority Tasks
          </DialogTitle>
          <DialogDescription>
            {taskType === 'respiratory'
              ? 'Patients requiring immediate attention due to worsening respiratory symptoms'
              : 'Patients readmitted within 30 days requiring follow-up'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {relevantTasks.map((task) => {
            const patient = mockPatients.find(p => p.name === task.patient);

            return (
              <div key={task.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>

                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <User className="h-4 w-4" />
                        <span className="font-medium">Patient:</span>
                        <span>{task.patient}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Due:</span>
                        <span>{task.dueDate}</span>
                      </div>
                    </div>

                    {patient && (
                      <div className="flex gap-2 text-sm">
                        <Badge variant="outline">{patient.diagnosis[0]}</Badge>
                        <Badge variant="outline">{patient.location}</Badge>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority} Priority</Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Add Note:</label>
                  <Textarea
                    placeholder="Document your assessment and action plan..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Complete Task
                  </Button>
                  <Button size="sm" variant="outline">
                    Reassign
                  </Button>
                  <Button size="sm" variant="outline">
                    Defer
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
