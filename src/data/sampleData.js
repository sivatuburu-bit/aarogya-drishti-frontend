// Realistic sample data. Swap these exports for API calls later.
export const vitals = {
  hr: [68, 72, 70, 75, 73, 71, 72],
  bp: [[118, 78], [122, 80], [119, 79], [125, 82], [121, 80], [120, 79], [118, 77]],
  sugar: [104, 112, 99, 118, 108, 102, 106],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}

export const appointments = [
  { id: 1, doc: 'Dr. Ananya Rao', role: 'Cardiologist', when: 'Today · 5:30 PM', status: 'Confirmed' },
  { id: 2, doc: 'Dr. Sneha Reddy', role: 'Pediatrician', when: 'Fri · 11:00 AM', status: 'Pending' },
]

export const medicines = [
  { id: 1, name: 'Vitamin D3', time: '8:00 AM', done: true },
  { id: 2, name: 'Metformin 500mg', time: '2:00 PM', done: false },
  { id: 3, name: 'Omega-3', time: '9:00 PM', done: false },
]

export const reports = [
  { id: 'R-2041', title: 'Complete Blood Count', type: 'Lab', date: '2026-10-28', doctor: 'Dr. Rohit Varma', status: 'Normal', summary: 'Hemoglobin 13.8 g/dL, WBC 6,900/µL, platelets 248,000/µL. All values within reference range.' },
  { id: 'R-2038', title: 'Lipid Profile', type: 'Lab', date: '2026-10-21', doctor: 'Dr. Ananya Rao', status: 'Attention', summary: 'LDL 148 mg/dL (borderline high), HDL 46 mg/dL, triglycerides 162 mg/dL. Diet review advised.' },
  { id: 'R-2030', title: 'Chest X-Ray', type: 'Imaging', date: '2026-10-09', doctor: 'Dr. Kiran Kumar', status: 'Normal', summary: 'Lungs clear. No effusion or consolidation. Heart size normal.' },
  { id: 'R-2022', title: 'ECG – 12 lead', type: 'Cardiology', date: '2026-09-30', doctor: 'Dr. Ananya Rao', status: 'Normal', summary: 'Normal sinus rhythm at 72 bpm. No ST-T changes.' },
  { id: 'R-2011', title: 'HbA1c', type: 'Lab', date: '2026-09-14', doctor: 'Dr. Rohit Varma', status: 'Attention', summary: 'HbA1c 6.1% (pre-diabetic range). Repeat in 3 months; continue lifestyle plan.' },
  { id: 'R-1998', title: 'Thyroid Panel', type: 'Lab', date: '2026-08-22', doctor: 'Dr. Rohit Varma', status: 'Normal', summary: 'TSH 2.4 mIU/L, T3 and T4 within range.' },
]

export const aiFindings = [
  { id: 1, title: 'Cardiovascular risk', score: 34, level: 'Moderate', note: 'Driven by borderline LDL and family history. Regular exercise lowers this score.' },
  { id: 2, title: 'Diabetes risk', score: 41, level: 'Moderate', note: 'HbA1c of 6.1% places you in the pre-diabetic range.' },
  { id: 3, title: 'Anaemia risk', score: 6, level: 'Low', note: 'Hemoglobin and ferritin are healthy.' },
  { id: 4, title: 'Thyroid disorder', score: 4, level: 'Low', note: 'Thyroid panel is normal.' },
]

// Rule-based demo triage. Replace with a real model/API call.
export const symptomRules = [
  { keys: ['chest', 'breath', 'palpitation'], dept: 'Cardiology', cond: 'Possible cardiac or respiratory cause', conf: 82, urgent: true },
  { keys: ['fever', 'cough', 'cold', 'throat'], dept: 'General Medicine', cond: 'Likely viral upper-respiratory infection', conf: 88, urgent: false },
  { keys: ['headache', 'migraine', 'dizz'], dept: 'Neurology', cond: 'Tension-type headache or migraine', conf: 76, urgent: false },
  { keys: ['stomach', 'nausea', 'vomit', 'acidity'], dept: 'Gastroenterology', cond: 'Gastritis or foodborne irritation', conf: 79, urgent: false },
  { keys: ['joint', 'knee', 'back', 'pain'], dept: 'Orthopedics', cond: 'Musculoskeletal strain', conf: 74, urgent: false },
]

export const hospital = {
  kpis: [
    { label: 'Patients this month', value: 4286, delta: 8.2 },
    { label: 'Bed occupancy', value: 82, suffix: '%', delta: 3.1 },
    { label: 'Avg. wait time', value: 14, suffix: ' min', delta: -11.5 },
    { label: 'Satisfaction', value: 4.8, suffix: '/5', delta: 1.4, dec: 1 },
  ],
  months: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  admissions: [3120, 3340, 3510, 3720, 3990, 4286],
  revenue: [212, 231, 248, 262, 281, 305],
  departments: [
    { name: 'Cardiology', value: 920 }, { name: 'Orthopedics', value: 760 },
    { name: 'Pediatrics', value: 840 }, { name: 'General', value: 1210 }, { name: 'Neurology', value: 556 },
  ],
}
