export const personalInfoFields = [
  { key: 'fullName' as const, label: 'Full Name', type: 'text', placeholder: 'John Doe' },
  { key: 'email' as const, label: 'Email', type: 'email', placeholder: 'john@example.com' },
  { key: 'phone' as const, label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-4567' },
  { key: 'location' as const, label: 'Location', type: 'text', placeholder: 'New York, NY' },
  { 
    key: 'summary' as const, 
    label: 'Professional Summary', 
    type: 'textarea', 
    placeholder: 'A brief summary about yourself...', 
    rows: 4 
  },
]

export const experienceFields = [
  { key: 'title' as const, label: 'Job Title', type: 'text', placeholder: 'Software Engineer', colSpan: 1 },
  { key: 'company' as const, label: 'Company', type: 'text', placeholder: 'Tech Corp', colSpan: 1 },
  { key: 'startDate' as const, label: 'Start Date', type: 'text', placeholder: 'Jan 2020', colSpan: 1 },
  { key: 'endDate' as const, label: 'End Date', type: 'text', placeholder: 'Present', colSpan: 1 },
  { 
    key: 'description' as const, 
    label: 'Description', 
    type: 'textarea', 
    placeholder: 'Describe your responsibilities and achievements...', 
    rows: 3, 
    colSpan: 2 
  },
]

export const educationFields = [
  { key: 'degree' as const, label: 'Degree', type: 'text', placeholder: 'Bachelor of Science', colSpan: 1 },
  { key: 'school' as const, label: 'School', type: 'text', placeholder: 'University Name', colSpan: 1 },
  { key: 'year' as const, label: 'Year', type: 'text', placeholder: '2020', colSpan: 2 },
]

