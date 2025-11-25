export const mockPatients = [
  {
    id: '1',
    name: 'John Smith',
    dob: '05/1958',
    language: 'English',
    riskScore: 'COPD',
    location: 'HOME',
    nextContact: '2025-11-26',
    diagnosis: ['COPD', 'Type 2 Diabetes'],
    program: 'COPD/CHF',
    riskLevel: 'High',
    daysSinceDischarge: 3,
    readmission: false,
    lastContact: '2025-11-23',
    dischargeFacility: 'Memorial Hospital',
    fev1: '45%',
    goldStage: 'III',
    exacerbations: 2,
    medications: ['Albuterol', 'Advair', 'Prednisone'],
  },
  {
    id: '2',
    name: 'Maria Garcia',
    dob: '03/1962',
    language: 'Spanish',
    riskScore: 'CHF',
    location: 'SNF',
    nextContact: '2025-11-27',
    diagnosis: ['CHF', 'Hypertension'],
    program: 'CHF',
    riskLevel: 'High',
    daysSinceDischarge: 5,
    readmission: true,
    lastContact: '2025-11-22',
    dischargeFacility: 'St. Mary\'s Hospital',
    ef: '35%',
    nyha: 'Class III',
    weight: '165 lbs',
    medications: ['Lasix', 'Lisinopril', 'Metoprolol'],
  },
  {
    id: '3',
    name: 'Robert Johnson',
    dob: '08/1955',
    language: 'English',
    riskScore: 'TRACH',
    location: 'LTAC',
    nextContact: '2025-11-28',
    diagnosis: ['Tracheostomy', 'Respiratory Failure'],
    program: 'TRACH/VENT',
    riskLevel: 'High',
    daysSinceDischarge: 12,
    readmission: false,
    lastContact: '2025-11-20',
    dischargeFacility: 'City Medical Center',
    equipment: ['Trach', 'Ventilator'],
    medications: ['Ativan', 'Fentanyl'],
  },
  {
    id: '4',
    name: 'Linda Chen',
    dob: '11/1970',
    language: 'English',
    riskScore: 'COPD',
    location: 'HOME',
    nextContact: '2025-11-26',
    diagnosis: ['COPD'],
    program: 'COPD/CHF',
    riskLevel: 'Medium',
    daysSinceDischarge: 8,
    readmission: false,
    lastContact: '2025-11-24',
    dischargeFacility: 'Regional Hospital',
    fev1: '58%',
    goldStage: 'II',
    exacerbations: 1,
    medications: ['Spiriva', 'Symbicort'],
  },
  {
    id: '5',
    name: 'James Wilson',
    dob: '06/1965',
    language: 'English',
    riskScore: 'CHF',
    location: 'HOME',
    nextContact: '2025-11-29',
    diagnosis: ['CHF'],
    program: 'CHF',
    riskLevel: 'Low',
    daysSinceDischarge: 15,
    readmission: false,
    lastContact: '2025-11-21',
    dischargeFacility: 'General Hospital',
    ef: '50%',
    nyha: 'Class II',
    weight: '180 lbs',
    medications: ['Lasix', 'Carvedilol'],
  }
];

export const mockSchedule = [
  { time: '8:00 AM', type: 'Home Visit', patient: 'John Smith', status: 'Complete', facility: 'Home' },
  { time: '10:00 AM', type: 'Telehealth', patient: 'Maria Garcia', status: 'In Progress', facility: 'SNF' },
  { time: '1:00 PM', type: 'SNF Visit', patient: 'Robert Johnson', status: 'Open', facility: 'Sunny Acres SNF' },
  { time: '3:00 PM', type: 'Home Visit', patient: 'Linda Chen', status: 'Open', facility: 'Home' },
];

export const mockTasks = [
  {
    id: '1',
    title: 'Follow-up call required',
    description: 'Patient reporting increased shortness of breath',
    patient: 'John Smith',
    priority: 'High',
    dueDate: '2025-11-25',
    assignedTo: 'Essam',
    status: 'Open',
  },
  {
    id: '2',
    title: 'Medication reconciliation',
    description: 'Review medications after recent hospitalization',
    patient: 'Maria Garcia',
    priority: 'High',
    dueDate: '2025-11-25',
    assignedTo: 'Care Team',
    status: 'Open',
  },
  {
    id: '3',
    title: 'Equipment check',
    description: 'Verify ventilator settings and supplies',
    patient: 'Robert Johnson',
    priority: 'Medium',
    dueDate: '2025-11-26',
    assignedTo: 'RT Team',
    status: 'Open',
  }
];

export const mockNotes = [
  {
    date: '2025-11-23',
    time: '10:30 AM',
    author: 'Essam',
    note: 'Patient doing well at home. No complaints of SOB. Vital signs stable. Continue current medications.',
  },
  {
    date: '2025-11-20',
    time: '2:15 PM',
    author: 'Dr. Smith',
    note: 'Patient discharged from hospital. Diagnosis: COPD exacerbation. Follow up in 3 days.',
  }
];

export const mockInterventions = [
  { date: '2025-11-23', intervention: 'Patient education on inhaler technique', status: 'Completed' },
  { date: '2025-11-22', intervention: 'Medication review and reconciliation', status: 'Completed' },
  { date: '2025-11-25', intervention: 'Follow-up assessment', status: 'Scheduled' },
];

export const mockMessages = [
  { date: '2025-11-24', from: 'Dr. Johnson', message: 'Please schedule follow-up visit within 3 days' },
  { date: '2025-11-23', from: 'Pharmacy', message: 'Prescription ready for pickup' },
];

export const contractData = {
  summary: [
    { risk: 'High', lives: 450, attribution: '01/2025', benchmark: '$2,450.00' },
    { risk: 'Medium', lives: 820, attribution: '01/2025', benchmark: '$1,850.00' },
    { risk: 'Low', lives: 1200, attribution: '01/2025', benchmark: '$980.00' },
  ],
  expendituresPMPM: '$1,842.35',
  avgRiskScore: '1.24',
  sharedSavings: '$1,456,000',
  performanceData: [
    { quarter: 'Q1', amount: 1200000 },
    { quarter: 'Q2', amount: 1350000 },
    { quarter: 'Q3', amount: 1456000 },
  ],
  metrics: [
    { name: 'Readmission Rate', actual: '14.2%', benchmark: '18.5%' },
    { name: 'ED Visits per 1000', actual: '245', benchmark: '320' },
    { name: 'Primary Care Visits', actual: '92%', benchmark: '85%' },
  ]
};

export const workforceData = {
  totalVisits: 33,
  avgDailyVisits: 18,
  tasksCompleted: 50,
  tasksCompletedChange: 10,
  visitsByLocation: [
    { location: 'Home', visits: 15 },
    { location: 'SNF', visits: 10 },
    { location: 'LTAC', visits: 5 },
    { location: 'Hospital', visits: 3 },
  ],
  tasksAssigned: 200,
  completionRate: 25,
  caseload: [
    { risk: 'High', count: 12 },
    { risk: 'Medium', count: 27 },
    { risk: 'Low', count: 34 },
  ]
};

export const executiveSummary = {
  readmissionRate: 15.2,
  avgLOS: 4.8,
  currentAdmissions: 24,
  costSavings: 185000,
  readmissionTrend: [
    { month: 'Jan', rate: 18.5 },
    { month: 'Feb', rate: 17.2 },
    { month: 'Mar', rate: 16.8 },
    { month: 'Apr', rate: 15.9 },
    { month: 'May', rate: 16.5 },
    { month: 'Jun', rate: 15.8 },
    { month: 'Jul', rate: 14.9 },
    { month: 'Aug', rate: 15.5 },
    { month: 'Sep', rate: 15.2 },
  ],
  topDiagnoses: [
    { diagnosis: 'COPD', count: 45 },
    { diagnosis: 'CHF', count: 38 },
    { diagnosis: 'Pneumonia', count: 22 },
    { diagnosis: 'Stroke', count: 15 },
  ]
};

export const qualityMetrics = {
  avgLOS: 4.0,
  readmissionRate: 14,
  mortalityRate: 4,
  copdCompliance: [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 68 },
    { month: 'Mar', rate: 72 },
    { month: 'Apr', rate: 75 },
  ],
  chfCompliance: [
    { month: 'Jan', rate: 70 },
    { month: 'Feb', rate: 73 },
    { month: 'Mar', rate: 76 },
    { month: 'Apr', rate: 78 },
  ],
  measures: [
    { measure: 'Medication Reconciliation', rate: '92%', trend: 'up', goal: '95%' },
    { measure: 'Follow-up within 7 days', rate: '85%', trend: 'stable', goal: '90%' },
    { measure: 'Patient Education Completed', rate: '88%', trend: 'up', goal: '85%' },
  ]
};
