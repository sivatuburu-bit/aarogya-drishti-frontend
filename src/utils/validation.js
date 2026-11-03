const EMAIL = /^\S+@\S+\.\S+$/, PHONE = /^[6-9]\d{9}$/

export function validateAccount(f) {
  const e = {}
  if ((f.name || '').trim().length < 2) e.name = 'Enter your full name.'
  if (!EMAIL.test(f.email || '')) e.email = 'Enter a valid email address.'
  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(f.password || '')) e.password = 'Use 8+ characters with letters and a number.'
  if (f.password !== f.confirm) e.confirm = 'Passwords do not match.'
  return e
}

export function validatePatient(f, { account = false } = {}) {
  const e = account ? validateAccount(f) : ((f.name || '').trim().length < 2 ? { name: 'Enter the patient name.' } : {})
  const age = Number(f.age)
  if (!Number.isInteger(age) || age < 0 || age > 120) e.age = 'Enter an age between 0 and 120.'
  if (!f.gender) e.gender = 'Select a gender.'
  if (!PHONE.test(f.phone || '')) e.phone = 'Enter a 10-digit mobile number.'
  if ((f.address || '').trim().length < 5) e.address = 'Enter the full address.'
  if (!f.district) e.district = 'Select a district.'
  if ((f.emergencyName || '').trim().length < 2) e.emergencyName = 'Enter a contact name.'
  if (!PHONE.test(f.emergencyPhone || '')) e.emergencyPhone = 'Enter a 10-digit mobile number.'
  else if (f.emergencyPhone === f.phone) e.emergencyPhone = 'Use a different number from the patient.'
  return e
}

export function validateStaff(f) {
  const e = validateAccount(f)
  if (!PHONE.test(f.phone || '')) e.phone = 'Enter a 10-digit mobile number.'
  if (!f.district) e.district = 'Select a district.'
  if ((f.regNo || '').trim().length < 4) e.regNo = 'Enter your registration or staff ID.'
  return e
}
