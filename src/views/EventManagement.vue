<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <!-- Timeline Chart Component -->
    <TimelineChart :events="events" />
    
    <!-- Main Content -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Event Manager</h1>
        <button 
          @click="showEventForm = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
                flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          <span>New Event</span>
        </button>
      </div>

      <!-- Events Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                事件类型
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                影响范围
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                股票信息
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                权重
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                生效时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                里程碑时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(event, index) in events" :key="index" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getEventTypeLabel(event.eventType) }}
                <span v-if="event.eventSubType" class="text-gray-500 text-xs ml-1">
                  ({{ getEventSubTypeLabel(event.eventSubType) }})
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getEffectSideLabel(event.effectSide) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <template v-if="event.effectSide === 'individual_stock'">
                  {{ event.stockCode }} - {{ event.stockName }}
                </template>
                <span v-else>-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="getWeightColorClass(event.weight)">
                  {{ event.weight }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDateTime(event.effectStartTime) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDateTime(event.effectMilestone) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  @click="removeEvent(index)"
                  class="text-red-600 hover:text-red-900">
                  删除
                </button>
              </td>
            </tr>
            <tr v-if="events.length === 0">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                暂无数据
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Move Dialog Outside Content Container -->
    <div v-if="showEventForm" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4 text-center">
        <!-- Overlay -->
        <transition enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
          <div class="fixed inset-0 bg-black/30 transition-opacity" @click="showEventForm = false"></div>
        </transition>
    
        <!-- Modal Content -->
        <transition enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-2xl">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <!-- Header -->
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold leading-6 text-gray-900">Create New Event</h3>
                <button 
                  @click="showEventForm = false"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none">
                  <span class="sr-only">Close</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <EventForm v-model:visible="showEventForm" @add-event="handleEventAdded" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import EventForm from '@/components/EventForm.vue'
import TimelineChart from '@/components/TimelineChart.vue'
import { eventService } from '../services/eventService'

export default {
  components: { 
    EventForm,
    TimelineChart
  },
  data() {
    return {
      showEventForm: false,
      events: []
    }
  },
  async created() {
    try {
      this.events = await eventService.getAllEvents()
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  },
  methods: {
    async handleEventAdded(newEvent) {
      try {
        const response = await eventService.createEvent(newEvent)
        this.events.push(response)
        this.showEventForm = false
      } catch (error) {
        console.error('Failed to create event:', error)
      }
    },
    async removeEvent(index) {
      if (confirm('确定要删除这个事件吗？')) {
        try {
          await eventService.deleteEvent(this.events[index].id)
          this.events.splice(index, 1)
        } catch (error) {
          console.error('Failed to delete event:', error)
        }
      }
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
    getEventSubTypeLabel(subType) {
      const subTypes = {
        fixed: '固定报告',
        non_fixed: '不固定报告'
      }
      return subTypes[subType] || subType
    },
    getEffectSideLabel(side) {
      const sides = {
        individual_stock: '个股',
        concept: '概念',
        industry: '行业',
        market: '市场所有'
      }
      return sides[side] || side
    },
    getWeightColorClass(weight) {
      if (weight > 0) return 'text-green-600'
      if (weight < 0) return 'text-red-600'
      return 'text-gray-600'
    },  // Added missing comma here
    formatDateTime(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>