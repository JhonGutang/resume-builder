<script setup lang="ts">
import { Button } from '@/components/ui'
import { Eye, EyeOff, Save, CheckCircle2, XCircle, Download } from 'lucide-vue-next'
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
  saveResume: () => Promise<void>
  isSaving: boolean
  saveStatus: { type: 'success' | 'error', message: string } | null
  savedResumeId: string | null
  exportResume: () => Promise<void>
  isExporting: boolean
}

defineProps<Props>()
</script>

<template>
  <div>
    <div 
      :class="[
        'flex flex-col gap-4',
        showInputs ? 'mb-6' : 'mb-12'
      ]"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Build Your Resume</h1>
        
        <div class="flex items-center gap-2">
          <Button 
            @click="saveResume" 
            :disabled="isSaving"
            size="sm"
            class="gap-2"
          >
            <Save class="w-4 h-4" />
            {{ isSaving ? 'Saving...' : 'Save Resume' }}
          </Button>

          <Button 
            @click="exportResume" 
            :disabled="isExporting"
            variant="secondary"
            size="sm"
            class="gap-2"
          >
            <Download class="w-4 h-4" />
            {{ isExporting ? 'Exporting...' : 'Export PDF' }}
          </Button>
          
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
      </div>
      
      <!-- Status Messages -->
      <div 
        v-if="saveStatus"
        :class="[
          'flex items-center gap-2 p-3 rounded-md text-sm font-medium',
          saveStatus.type === 'success' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        ]"
      >
        <CheckCircle2 v-if="saveStatus.type === 'success'" class="w-4 h-4" />
        <XCircle v-else class="w-4 h-4" />
        <span>{{ saveStatus.message }}</span>
        <span v-if="saveStatus.type === 'success' && savedResumeId" class="text-xs opacity-75">
          (ID: {{ savedResumeId }})
        </span>
      </div>
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

