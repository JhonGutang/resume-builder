<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ResumeBuilderTabs from './ResumeBuilderTabs.vue'
import ManualResumeBuilder from './manualResumeBuilder/index.vue'
import TemplateResumeBuilder from './templateResumeBuilder/index.vue'
import AiAssistedResumeBuilder from './aiAssistedResumeBuilder/index.vue'
import type { PersonalInfo, Experience, Education } from '@/interfaces/resume'
import { trpcClient } from '@/lib/trpcClient'
import { 
  collectPageStyles, 
  createHtmlDocument, 
  downloadPdfFromBase64, 
  getResumePreviewHtml,
  pdfExportConfig 
} from '@/config/pdfExport'

const showInputs = ref(true)
const isSaving = ref(false)
const saveStatus = ref<{ type: 'success' | 'error', message: string } | null>(null)
const savedResumeId = ref<string | null>(null)
const isLoading = ref(false)
const isExporting = ref(false)

const toggleInputs = () => {
  showInputs.value = !showInputs.value
}

const resumeData = ref({
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  } as PersonalInfo,
  experience: [] as Experience[],
  education: [] as Education[],
  skills: [] as string[],
})

onMounted(async () => {
  try {
    isLoading.value = true
    const result = await trpcClient.getUserResume.query({
      userId: 'user-1764079323860'
    })
    
    if (result.success && result.resume) {
      if (result.resume.personalInfo) {
        resumeData.value.personalInfo = result.resume.personalInfo
      }
      if (result.resume.experience) {
        resumeData.value.experience = result.resume.experience
      }
      if (result.resume.education) {
        resumeData.value.education = result.resume.education
      }
      if (result.resume.skills) {
        resumeData.value.skills = result.resume.skills
      }
      
      if (result.resume._id) {
        savedResumeId.value = result.resume._id.toString()
      }
    }
  } catch (error) {
    console.error('Error loading resume:', error)
  } finally {
    isLoading.value = false
  }
})

const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
  resumeData.value.personalInfo[field] = value
}

const addExperience = () => {
  resumeData.value.experience.push({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  })
}

const updateExperience = (index: number, field: keyof Experience, value: string) => {
  if (resumeData.value.experience[index]) {
    resumeData.value.experience[index][field] = value
  }
}

const removeExperience = (index: number) => {
  resumeData.value.experience.splice(index, 1)
}

const addEducation = () => {
  resumeData.value.education.push({
    degree: '',
    school: '',
    year: '',
  })
}

const updateEducation = (index: number, field: keyof Education, value: string) => {
  if (resumeData.value.education[index]) {
    resumeData.value.education[index][field] = value
  }
}

const removeEducation = (index: number) => {
  resumeData.value.education.splice(index, 1)
}

const addSkill = () => {
  resumeData.value.skills.push('')
}

const updateSkill = (index: number, value: string) => {
  if (index >= 0 && index < resumeData.value.skills.length) {
    resumeData.value.skills[index] = value
  }
}

const removeSkill = (index: number) => {
  resumeData.value.skills.splice(index, 1)
}

const saveResume = async () => {
  try {
    isSaving.value = true
    saveStatus.value = null
    
    const userId = 'user-' + Date.now()
    
    const result = await trpcClient.createUserResume.mutate({
      userId,
      personalInfo: resumeData.value.personalInfo,
      experience: resumeData.value.experience,
      education: resumeData.value.education,
    })
    
    if (result.success) {
      savedResumeId.value = result.resumeId
      saveStatus.value = {
        type: 'success',
        message: result.message || 'Resume saved successfully!'
      }
      
      setTimeout(() => {
        saveStatus.value = null
      }, 5000)
    }
  } catch (error) {
    console.error('Error saving resume:', error)
    saveStatus.value = {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to save resume. Please try again.'
    }
    
    setTimeout(() => {
      saveStatus.value = null
    }, 5000)
  } finally {
    isSaving.value = false
  }
}

const exportResume = async () => {
  try {
    isExporting.value = true
    
    const htmlContent = getResumePreviewHtml(pdfExportConfig.previewSelector)
    
    const styles = pdfExportConfig.includePageStyles ? collectPageStyles() : ''
    
    const html = createHtmlDocument(htmlContent, styles)
    
    const result = await trpcClient.exportResumePDF.mutate({ html })
    
    if (result.success && result.pdf) {
      downloadPdfFromBase64(result.pdf, result.fileName || pdfExportConfig.defaultFileName)
      
      saveStatus.value = {
        type: 'success',
        message: 'Resume exported successfully!'
      }
      
      setTimeout(() => {
        saveStatus.value = null
      }, 5000)
    } else {
      throw new Error(result.message || 'Failed to export PDF')
    }
  } catch (error) {
    console.error('Error exporting resume:', error)
    saveStatus.value = {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to export resume. Please try again.'
    }
    
    setTimeout(() => {
      saveStatus.value = null
    }, 5000)
  } finally {
    isExporting.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-3.5rem)] bg-background">
    <div class="container mx-auto py-6 px-4">
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-muted-foreground">Loading resume...</div>
      </div>
      <ResumeBuilderTabs v-else>
        <template #manual>
          <ManualResumeBuilder
            :resume-data="resumeData"
            :show-inputs="showInputs"
            :toggle-inputs="toggleInputs"
            :update-personal-info="updatePersonalInfo"
            :add-experience="addExperience"
            :update-experience="updateExperience"
            :remove-experience="removeExperience"
            :add-education="addEducation"
            :update-education="updateEducation"
            :remove-education="removeEducation"
            :add-skill="addSkill"
            :update-skill="updateSkill"
            :remove-skill="removeSkill"
            :save-resume="saveResume"
            :is-saving="isSaving"
            :save-status="saveStatus"
            :saved-resume-id="savedResumeId"
            :export-resume="exportResume"
            :is-exporting="isExporting"
          />
        </template>
        
        <template #template>
          <TemplateResumeBuilder />
        </template>
        
        <template #ai>
          <AiAssistedResumeBuilder />
        </template>
      </ResumeBuilderTabs>
    </div>
  </div>
</template>
