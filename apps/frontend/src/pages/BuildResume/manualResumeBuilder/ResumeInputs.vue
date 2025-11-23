<script setup lang="ts">
import { Button, Input, Label, Textarea } from '@/components/ui'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Plus, Trash2, CalendarIcon } from 'lucide-vue-next'
import type { PersonalInfo, Experience, Education, ResumeData } from '@/interfaces/resume'
import { personalInfoFields, experienceFields, educationFields } from '@/config/resume'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { parseDate, type DateValue } from '@internationalized/date'

interface Props {
  resumeData: ResumeData
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void
  addExperience: () => void
  updateExperience: (index: number, field: keyof Experience, value: string) => void
  removeExperience: (index: number) => void
  addEducation: () => void
  updateEducation: (index: number, field: keyof Education, value: string) => void
  removeEducation: (index: number) => void
  addSkill: () => void
  updateSkill: (index: number, value: string) => void
  removeSkill: (index: number) => void
}

defineProps<Props>()
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    return format(new Date(dateString), 'MMM yyyy')
  } catch {
    return dateString
  }
}

const stringToDateValue = (dateString: string): DateValue | undefined => {
  if (!dateString) return undefined
  try {
    return parseDate(dateString)
  } catch {
    return undefined
  }
}

const dateValueToString = (date: DateValue | null | undefined): string => {
  if (!date) return ''
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
}
</script>

<template>
  <div class="space-y-8">
    <div class="bg-card rounded-lg p-6 shadow-sm border">
      <h2 class="text-2xl font-semibold mb-4">Personal Information</h2>
      
      <div class="space-y-4">
        <div v-for="field in personalInfoFields" :key="field.key">
          <Label :for="field.key" class="mb-2">{{ field.label }}</Label>
          
          <Textarea
            v-if="field.type === 'textarea'"
            :id="field.key"
            :model-value="resumeData.personalInfo[field.key]"
            @update:model-value="updatePersonalInfo(field.key, $event as string)"
            :placeholder="field.placeholder"
            :rows="field.rows"
          />
          
          <Input
            v-else
            :id="field.key"
            :type="field.type"
            :model-value="resumeData.personalInfo[field.key]"
            @update:model-value="updatePersonalInfo(field.key, $event as string)"
            :placeholder="field.placeholder"
          />
        </div>
      </div>
    </div>

    <div class="bg-card rounded-lg p-6 shadow-sm border">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold">Experience</h2>
        <Button @click="addExperience" size="sm">
          <Plus class="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
      
      <div v-if="resumeData.experience.length === 0" class="text-muted-foreground text-center py-8">
        No experience added yet. Click "Add Experience" to get started.
      </div>
      
      <div v-else class="space-y-6">
        <div
          v-for="(exp, expIndex) in resumeData.experience"
          :key="expIndex"
          class="border rounded-md p-4 space-y-4"
        >
          <div class="flex justify-between items-start">
            <h3 class="font-medium">Experience {{ expIndex + 1 }}</h3>
            <Button
              @click="removeExperience(expIndex)"
              variant="destructive"
              size="sm"
              class="text-white"
            >
              <Trash2 class="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="field in experienceFields"
              :key="field.key"
              :class="field.colSpan === 2 ? 'col-span-2' : ''"
            >
              <Label :for="`exp-${expIndex}-${field.key}`" class="mb-2">{{ field.label }}</Label>
              
              <Textarea
                v-if="field.type === 'textarea'"
                :id="`exp-${expIndex}-${field.key}`"
                :model-value="exp[field.key]"
                @update:model-value="updateExperience(expIndex, field.key, $event as string)"
                :placeholder="field.placeholder"
                :rows="field.rows"
              />
              
              <Popover v-else-if="field.key === 'startDate' || field.key === 'endDate'">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    :class="cn(
                      'w-full justify-start text-left font-normal',
                      !exp[field.key] && 'text-muted-foreground'
                    )"
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{ exp[field.key] ? formatDate(exp[field.key]) : field.placeholder }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar
                    :model-value="stringToDateValue(exp[field.key])"
                    @update:model-value="updateExperience(expIndex, field.key, dateValueToString($event))"
                    initial-focus
                  />
                </PopoverContent>
              </Popover>
              
              <Input
                v-else
                :id="`exp-${expIndex}-${field.key}`"
                :type="field.type"
                :model-value="exp[field.key]"
                @update:model-value="updateExperience(expIndex, field.key, $event as string)"
                :placeholder="field.placeholder"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-card rounded-lg p-6 shadow-sm border">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold">Education</h2>
        <Button @click="addEducation" size="sm">
          <Plus class="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
      
      <div v-if="resumeData.education.length === 0" class="text-muted-foreground text-center py-8">
        No education added yet. Click "Add Education" to get started.
      </div>
      
      <div v-else class="space-y-6">
        <div
          v-for="(edu, eduIndex) in resumeData.education"
          :key="eduIndex"
          class="border rounded-md p-4 space-y-4"
        >
          <div class="flex justify-between items-start">
            <h3 class="font-medium">Education {{ eduIndex + 1 }}</h3>
            <Button
              @click="removeEducation(eduIndex)"
              variant="destructive"
              size="sm"
              class="text-white"
            >
              <Trash2 class="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="field in educationFields"
              :key="field.key"
              :class="field.colSpan === 2 ? 'col-span-2' : ''"
            >
              <Label :for="`edu-${eduIndex}-${field.key}`" class="mb-2">{{ field.label }}</Label>
              
              <Input
                :id="`edu-${eduIndex}-${field.key}`"
                :type="field.type"
                :model-value="edu[field.key]"
                @update:model-value="updateEducation(eduIndex, field.key, $event as string)"
                :placeholder="field.placeholder"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-card rounded-lg p-6 shadow-sm border">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold">Skills</h2>
        <Button @click="addSkill" size="sm">
          <Plus class="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>
      
      <div v-if="resumeData.skills.length === 0" class="text-muted-foreground text-center py-8">
        No skills added yet. Click "Add Skill" to get started.
      </div>
      
      <div v-else class="space-y-3">
        <div
          v-for="(skill, skillIndex) in resumeData.skills"
          :key="skillIndex"
          class="flex gap-2"
        >
          <Input
            :id="`skill-${skillIndex}`"
            type="text"
            :model-value="skill"
            @update:model-value="updateSkill(skillIndex, $event as string)"
            placeholder="e.g., JavaScript, Python, etc."
            class="flex-1"
          />
          <Button
            @click="removeSkill(skillIndex)"
            variant="destructive"
            size="sm"
            class="text-white"
          >
            <Trash2 class="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

