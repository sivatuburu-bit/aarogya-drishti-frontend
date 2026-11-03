const P = (id, name, age, gender, district, phone, condition, status) => ({ id, name, age, gender, district, phone, condition, status })
export const seed = {
  patients: [
    P('P-1001', 'Priya Sharma', 34, 'Female', 'Hyderabad', '9876501234', 'Hypertension', 'Active'),
    P('P-1002', 'Mohan Rao', 61, 'Male', 'Warangal', '9876505678', 'Diabetes', 'Follow-up'),
    P('P-1003', 'Lakshmi Devi', 72, 'Female', 'Karimnagar', '9845012345', 'Heart disease', 'Critical'),
    P('P-1004', 'Arjun Reddy', 9, 'Male', 'Hyderabad', '9812345670', 'Asthma', 'Active'),
    P('P-1005', 'Fatima Begum', 45, 'Female', 'Rangareddy', '9701234567', 'Thyroid', 'Active'),
    P('P-1006', 'Venkat Naidu', 58, 'Male', 'Khammam', '9640123456', 'Diabetes', 'Follow-up'),
    P('P-1007', 'Sunita Patel', 29, 'Female', 'Hyderabad', '9533123456', 'None', 'Active'),
    P('P-1008', 'Ramesh Goud', 67, 'Male', 'Nizamabad', '9494123456', 'Hypertension', 'Critical'),
  ],
  appointments: [
    { id: 'A-301', patient: 'Priya Sharma', doctor: 'Dr. Ananya Rao', when: 'Today · 5:30 PM', district: 'Hyderabad', status: 'Scheduled' },
    { id: 'A-302', patient: 'Mohan Rao', doctor: 'Dr. Rohit Varma', when: 'Tomorrow · 10:00 AM', district: 'Warangal', status: 'Scheduled' },
    { id: 'A-303', patient: 'Arjun Reddy', doctor: 'Dr. Sneha Reddy', when: 'Fri · 11:00 AM', district: 'Hyderabad', status: 'Scheduled' },
    { id: 'A-304', patient: 'Fatima Begum', doctor: 'Dr. Meera Nair', when: 'Mon · 3:15 PM', district: 'Rangareddy', status: 'Completed' },
    { id: 'A-305', patient: 'Priya Sharma', doctor: 'Dr. Rohit Varma', when: 'Last Tue · 9:00 AM', district: 'Hyderabad', status: 'Completed' },
  ],
  referrals: [
    { id: 'RF-71', patient: 'Lakshmi Devi', from: 'Ravi Kumar', to: 'Cardiology', priority: 'Urgent', district: 'Karimnagar', status: 'Pending' },
    { id: 'RF-72', patient: 'Ramesh Goud', from: 'Dr. Meera Nair', to: 'Cardiology', priority: 'Urgent', district: 'Nizamabad', status: 'Accepted' },
    { id: 'RF-73', patient: 'Mohan Rao', from: 'Ravi Kumar', to: 'Endocrinology', priority: 'Routine', district: 'Warangal', status: 'Pending' },
    { id: 'RF-74', patient: 'Arjun Reddy', from: 'Dr. Meera Nair', to: 'Pulmonology', priority: 'Routine', district: 'Hyderabad', status: 'Completed' },
  ],
  management: [
    { id: 'U-01', name: 'Ravi Kumar', role: 'Health Worker', district: 'Warangal', status: 'Active' },
    { id: 'U-02', name: 'Dr. Meera Nair', role: 'Medical Officer', district: 'Hyderabad', status: 'Active' },
    { id: 'U-03', name: 'Dr. Ananya Rao', role: 'Specialist', district: 'Hyderabad', status: 'Active' },
    { id: 'U-04', name: 'Kavya Singh', role: 'Health Worker', district: 'Hyderabad', status: 'Suspended' },
    { id: 'U-05', name: 'Suresh Reddy', role: 'District Admin', district: 'Hyderabad', status: 'Active' },
    { id: 'U-06', name: 'Imran Ali', role: 'Health Worker', district: 'Karimnagar', status: 'Active' },
  ],
}
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
export const overview = {
  health_worker: { title: 'Field work', kpis: [['Registered today', 18], ['Home visits', 9], ['Open referrals', 4], ['Follow-ups due', 12]], chart: { kind: 'bar', title: 'Registrations this week', labels: days, data: [12, 15, 9, 18, 14, 6, 18] }, alerts: [['Lakshmi Devi needs an urgent cardiology referral', 'wait'], ['12 follow-up visits due this week', 'wait'], ['Weekly target reached', 'ok']] },
  medical_officer: { title: 'Clinical overview', kpis: [['Patients today', 46], ['Appointments', 22], ['Pending referrals', 5], ['Critical cases', 3]], chart: { kind: 'line', title: 'Consultations (7 days)', labels: days, series: [{ name: 'Consultations', data: [38, 42, 40, 51, 47, 33, 46] }] }, donut: [{ name: 'Chronic', value: 48 }, { name: 'Acute', value: 31 }, { name: 'Maternal', value: 14 }, { name: 'Child', value: 22 }], alerts: [['3 critical cases awaiting review', 'wait'], ['Lab results ready for 7 patients', 'ok']] },
  specialist: { title: 'Specialist desk', kpis: [['Referrals received', 14], ['Accepted', 9], ['Consults today', 8], ['Avg. response (h)', 3.2]], chart: { kind: 'bar', title: 'Referrals by week', labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], data: [9, 12, 10, 15, 13, 14] }, alerts: [['2 urgent referrals waiting for acceptance', 'wait'], ['Response time improved 18% this month', 'ok']] },
  district_admin: { title: 'District Hyderabad', kpis: [['Patients served', 1840], ['Active staff', 86], ['Bed occupancy %', 79], ['Open referrals', 21]], chart: { kind: 'line', title: 'Admissions', labels: months, series: [{ name: 'Admissions', data: [1320, 1410, 1480, 1550, 1690, 1840] }] }, donut: [{ name: 'Primary care', value: 920 }, { name: 'Maternal', value: 310 }, { name: 'Paediatrics', value: 380 }, { name: 'Emergency', value: 230 }], alerts: [['1 staff account suspended', 'wait'], ['Vaccination drive 92% complete', 'ok']] },
  super_admin: { title: 'State overview', kpis: [['Total patients', 18420], ['Districts live', 8], ['Staff accounts', 612], ['Referral success %', 94]], chart: { kind: 'bar', title: 'Patients by district', labels: ['HYD', 'RR', 'WGL', 'KNR', 'NZB', 'KMM', 'NLG', 'MDK'], data: [4800, 3100, 2100, 1900, 1700, 1600, 1700, 1520] }, donut: [{ name: 'Hyderabad', value: 4800 }, { name: 'Rangareddy', value: 3100 }, { name: 'Warangal', value: 2100 }, { name: 'Others', value: 8420 }], alerts: [['Karimnagar wait time up 12%', 'wait'], ['All districts reporting on time', 'ok']] },
}
