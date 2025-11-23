<script setup lang="ts">
import type { ResumeData } from '@/interfaces/resume'
import { format } from 'date-fns'

interface Props {
  resumeData: ResumeData
  isFullScreen?: boolean
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    return format(new Date(dateString), 'MMM d, yyyy')
  } catch {
    return dateString
  }
}
</script>

<template>
  <div 
    :class="[
      'bg-white rounded-lg shadow-lg border p-8 md:p-12 w-full mx-auto overflow-hidden transition-all duration-300',
      isFullScreen ? 'max-w-[1200px] scale-110' : 'max-w-[816px]'
    ]"
  >
    <div class="space-y-4 md:space-y-6 text-black">
      <!-- Header Section -->
      <div class="border-b-2 border-gray-800 pb-4">
        <h1 class="text-4xl font-bold text-gray-900 tracking-tight">
          {{ resumeData.personalInfo.fullName || 'Your Name' }}
        </h1>
        
        <div class="mt-3 flex flex-wrap gap-3 text-sm text-gray-700">
          <span v-if="resumeData.personalInfo.email" class="flex items-center">
            {{ resumeData.personalInfo.email }}
          </span>
          <span v-if="resumeData.personalInfo.phone" class="flex items-center">
            {{ resumeData.personalInfo.phone }}
          </span>
          <span v-if="resumeData.personalInfo.location" class="flex items-center">
            {{ resumeData.personalInfo.location }}
          </span>
        </div>
      </div>

      <!-- Professional Summary -->
      <div v-if="resumeData.personalInfo.summary">
        <h2 class="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">Professional Summary</h2>
        <p class="text-gray-800 text-sm leading-relaxed">
          {{ resumeData.personalInfo.summary }}
        </p>
      </div>

      <!-- Experience Section -->
      <div v-if="resumeData.experience.length > 0">
        <h2 class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">Experience</h2>
        <div class="space-y-4">
          <div
            v-for="(exp, index) in resumeData.experience"
            :key="index"
            class="space-y-1"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-gray-900 text-base">
                  {{ exp.title || 'Job Title' }}
                </h3>
                <p class="text-gray-800 italic">
                  {{ exp.company || 'Company Name' }}
                </p>
              </div>
              <span class="text-sm text-gray-700 whitespace-nowrap font-medium">
                {{ formatDate(exp.startDate) || 'Start' }} - {{ formatDate(exp.endDate) || 'End' }}
              </span>
            </div>
            <p v-if="exp.description" class="text-sm text-gray-800 leading-relaxed mt-1">
              {{ exp.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Education Section -->
      <div v-if="resumeData.education.length > 0">
        <h2 class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">Education</h2>
        <div class="space-y-3">
          <div
            v-for="(edu, index) in resumeData.education"
            :key="index"
            class="flex justify-between items-start"
          >
            <div>
              <h3 class="font-bold text-gray-900 text-base">
                {{ edu.degree || 'Degree' }}
              </h3>
              <p class="text-gray-800 italic">
                {{ edu.school || 'School Name' }}
              </p>
            </div>
            <span class="text-sm text-gray-700 whitespace-nowrap font-medium">
              {{ edu.year || 'Year' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div v-if="resumeData.skills.length > 0 && resumeData.skills.some(s => s)">
        <h2 class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">Skills</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(skill, index) in resumeData.skills.filter(s => s)"
            :key="index"
            class="px-3 py-1 bg-gray-200 text-gray-900 rounded text-sm font-medium"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!resumeData.personalInfo.fullName && 
              resumeData.experience.length === 0 && 
              resumeData.education.length === 0 && 
              resumeData.skills.length === 0"
        class="flex items-center justify-center h-64 text-gray-400"
      >
        <p class="text-center">
          Start filling out your information<br />
          to see your resume preview here
        </p>
      </div>
    </div>
  </div>
</template>
