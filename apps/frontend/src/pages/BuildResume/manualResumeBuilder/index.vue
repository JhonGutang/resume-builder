<script setup lang="ts">
import { Button } from '@/components/ui'
import { Eye, EyeOff } from 'lucide-vue-next'
import ResumeInputs from './ResumeInputs.vue'
import ResumePreview from './ResumePreview.vue'
import type { ResumeData } from '@/interfaces/resume'

interface Props {
  resumeData: ResumeData
  showInputs: boolean
  toggleInputs: () => void
  updatePersonalInfo: (field: any, value: string) => void
  addExperience: () => void
  updateExperience: (index: number, field: any, value: string) => void
  removeExperience: (index: number) => void
  addEducation: () => void
  updateEducation: (index: number, field: any, value: string) => void
  removeEducation: (index: number) => void
  addSkill: () => void
  updateSkill: (index: number, value: string) => void
  removeSkill: (index: number) => void
}

defineProps<Props>()
</script>

<template>
  <div>
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
</template>

