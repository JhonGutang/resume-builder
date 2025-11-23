<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui'
import { Eye, EyeOff } from 'lucide-vue-next'
import ResumeInputs from './components/ResumeInputs.vue'
import ResumePreview from './components/ResumePreview.vue'
import type { PersonalInfo, Experience, Education } from '@/interfaces/resume'

const showInputs = ref(true)

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

// Personal Info Updates
const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
  resumeData.value.personalInfo[field] = value
}

// Experience Updates
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

// Education Updates
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

// Skills Updates
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
</script>

<template>
  <div class="min-h-[calc(100vh-3.5rem)] bg-background">
    <div class="container mx-auto py-6 px-4">
      <div 
        :class="[
          'flex items-center justify-between',
          showInputs ? 'mb-6' : 'mb-12'
        ]"
      >
        <h1 class="text-3xl font-bold">Build Your Resume</h1>
        
        <Button 
          @click="toggleInputs" 
          variant="outline"
          size="sm"
          class="gap-2"
        >
          <Eye v-if="!showInputs" class="w-4 h-4" />
          <EyeOff v-else class="w-4 h-4" />
          {{ showInputs ? 'Hide Inputs' : 'Show Inputs' }}
        </Button>
      </div>
      
      <div 
        :class="[
          'grid gap-8',
          showInputs ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        ]"
      >
        <div 
          v-show="showInputs"
          class="order-2 lg:order-1"
        >
          <ResumeInputs 
            :resume-data="resumeData"
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
          />
        </div>
        
        <div 
          :class="[
            'order-1 lg:order-2',
            !showInputs ? 'mx-auto w-full' : ''
          ]"
        >
          <div class="sticky top-20">
            <ResumePreview 
              :resume-data="resumeData" 
              :is-full-screen="!showInputs"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

