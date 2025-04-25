<template>
  <div class="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
    <h2 class="text-lg font-semibold mb-4 text-gray-800">Event Timeline</h2>
    
    <div class="relative">
      <!-- Timeline Header -->
      <div class="flex justify-between mb-4 text-sm text-gray-600">
        <div v-for="month in months" :key="month" class="flex-1 text-center">
          {{ month }}
        </div>
      </div>

      <!-- Main Timeline -->
      <div class="relative">
        <!-- Timeline Base Line -->
        <div class="absolute w-full h-0.5 bg-gray-200 top-4"></div>

        <!-- Events -->
        <div class="relative pt-2">
          <div v-for="event in events" :key="event.id" 
               :style="getEventStyle(event)"
               class="absolute h-8 rounded-lg flex items-center px-2 text-sm text-white cursor-pointer"
               :class="getEventColorClass(event)">
            {{ getEventLabel(event) }}
          </div>
        </div>

        <!-- Time Markers -->
        <div class="flex justify-between relative">
          <div v-for="(marker, index) in timeMarkers" :key="index" 
               class="w-px h-3 bg-gray-300"
               :style="{ left: `${(index / (timeMarkers.length - 1)) * 100}%` }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      months: ['2024-01', '2024-02', '2024-03'],
      timeMarkers: new Array(13).fill(0) // For day markers
    }
  },
  methods: {
    getEventStyle(event) {
      const startDate = new Date(event.effectStartTime)
      const endDate = new Date(event.effectMilestone)
      
      // Calculate position and width
      const timelineStart = new Date('2024-01-01')
      const timelineEnd = new Date('2024-03-31')
      const totalDays = (timelineEnd - timelineStart) / (1000 * 60 * 60 * 24)
      
      const startOffset = (startDate - timelineStart) / (1000 * 60 * 60 * 24)
      const duration = (endDate - startDate) / (1000 * 60 * 60 * 24)
      
      const left = (startOffset / totalDays) * 100
      const width = (duration / totalDays) * 100
      
      return {
        left: `${left}%`,
        width: `${width}%`,
        top: `${this.getEventRow(event) * 40}px`
      }
    },
    getEventColorClass(event) {
      const types = {
        corporate_report: 'bg-blue-600',
        holiday: 'bg-red-600',
        policy: 'bg-green-600',
        announcement: 'bg-purple-600'
      }
      return types[event.eventType] || 'bg-gray-600'
    },
    getEventLabel(event) {
      if (event.effectSide === 'individual_stock') {
        return `${event.stockCode} (${event.weight})`
      }
      return `${this.getEventTypeLabel(event.eventType)} (${event.weight})`
    },
    getEventTypeLabel(type) {
      const types = {
        corporate_report: '公司报告',
        holiday: '节假日',
        policy: '行政政策',
        announcement: '公司公告'
      }
      return types[type] || type
    },
    getEventRow(event) {
      // Simple row assignment to prevent overlapping
      return this.events.findIndex(e => e.id === event.id) % 3
    }
  }
}
</script>

<style scoped>
.timeline-event {
  transition: all 0.3s ease;
}
.timeline-event:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>