<template>
  <div class="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
    <h2 class="text-lg font-semibold mb-4 text-gray-800">New Event</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">


      <!-- 事件类型 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">事件类型</label>
          <select
            v-model="newEvent.eventType"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
            :class="{ 'border-red-500': errors.eventType }"
          >
            <option value="corporate_report">公司报告</option>
            <option value="holiday">节假日</option>
            <option value="policy">行政政策</option>
            <option value="announcement">公司公告</option>
          </select>
          <p v-if="errors.eventType" class="text-red-500 text-sm mt-1">{{ errors.eventType }}</p>
        </div>

        <div v-if="newEvent.eventType === 'corporate_report'">
          <label class="block text-sm font-medium mb-1 text-gray-700">报告类型</label>
          <select v-model="newEvent.eventSubType" class="w-full px-4 py-2 rounded-lg border border-gray-300">
            <option value="fixed">固定报告</option>
            <option value="non_fixed">不固定报告</option>
          </select>
        </div>
      </div>

      <!-- 影响面 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">影响范围</label>
          <select 
            v-model="newEvent.effectSide" 
            class="w-full px-4 py-2 rounded-lg border border-gray-300"
            :class="{ 'border-red-500': errors.effectSide }"
          >
            <option value="individual_stock">个股</option>
            <option value="concept">概念</option>
            <option value="industry">行业</option>
            <option value="market">市场所有</option>
          </select>
          <p v-if="errors.effectSide" class="text-red-500 text-sm mt-1">{{ errors.effectSide }}</p>
        </div>

        <div v-if="newEvent.effectSide === 'individual_stock'">
          <label class="block text-sm font-medium mb-1 text-gray-700">股票代码</label>
          <input 
            v-model="newEvent.stockCode" 
            class="w-full px-4 py-2 rounded-lg border border-gray-300"
            :class="{ 'border-red-500': errors.stockCode }"
          >
          <p v-if="errors.stockCode" class="text-red-500 text-sm mt-1">{{ errors.stockCode }}</p>

          <label class="block text-sm font-medium mb-1 text-gray-700 mt-2">公司名称</label>
          <input 
            v-model="newEvent.stockName" 
            class="w-full px-4 py-2 rounded-lg border border-gray-300"
            :class="{ 'border-red-500': errors.stockName }"
          >
          <p v-if="errors.stockName" class="text-red-500 text-sm mt-1">{{ errors.stockName }}</p>
        </div>
      </div>

      <!-- 权重设置 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">权重 (-100 ~ 100)</label>
          <input v-model="newEvent.weight" type="number" min="-100" max="100"
            class="w-full px-4 py-2 rounded-lg border border-gray-300">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">算法选择</label>
          <select v-model="newEvent.weightAlgo" class="w-full px-4 py-2 rounded-lg border border-gray-300">
            <option value="all_the_same">统一计算</option>
          </select>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          @click="handleCancel"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          提交
        </button>
      </div>
    </form>

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 class="text-lg font-semibold mb-4">确认关闭</h3>
        <p class="text-gray-600 mb-6">确定要关闭表单吗？未保存的数据将会丢失。</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="showConfirmDialog = false"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            取消
          </button>
          <button
            @click="confirmClose"
            class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

import { eventService } from '../services/eventService';
<script>
export default {
  data() {
    return {
      newEvent: {
        eventType: 'corporate_report',
        eventSubType: 'fixed',
        effectSide: 'individual_stock',
        stockCode: '',
        stockName: '',
        weight: 0,
        weightAlgo: 'all_the_same',
        effectStartTime: '',
        effectMilestone: ''
      }
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      let isValid = true;

      if (!this.newEvent.eventType) {
        this.errors.eventType = '请选择事件类型';
        isValid = false;
      }

      if (!this.newEvent.effectSide) {
        this.errors.effectSide = '请选择影响范围';
        isValid = false;
      }

      if (this.newEvent.effectSide === 'individual_stock') {
        if (!this.newEvent.stockCode) {
          this.errors.stockCode = '请输入股票代码';
          isValid = false;
        }
        if (!this.newEvent.stockName) {
          this.errors.stockName = '请输入公司名称';
          isValid = false;
        }
      }

      if (!this.newEvent.effectStartTime) {
        this.errors.effectStartTime = '请选择生效时间';
        isValid = false;
      }

      if (!this.newEvent.effectMilestone) {
        this.errors.effectMilestone = '请选择里程碑时间';
        isValid = false;
      }

      if (this.newEvent.effectStartTime && this.newEvent.effectMilestone) {
        if (new Date(this.newEvent.effectStartTime) > new Date(this.newEvent.effectMilestone)) {
          this.errors.effectMilestone = '里程碑时间不能早于生效时间';
          isValid = false;
        }
      }

      return isValid;
    }
  }
}
</script>