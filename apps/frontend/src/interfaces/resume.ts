export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
}

export interface Experience {
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  degree: string
  school: string
  year: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: string[]
}

