<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 主容器 -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-8">
        <!-- 标题 -->
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">事件管理系统</h1>
          <p class="text-gray-600">专业金融事件管理平台</p>
        </div>

        <!-- 表单容器 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">新建事件</h2>
          <form @submit.prevent="addEvent" class="space-y-4">
            <!-- Event Name -->
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Event Name</label>
              <input v-model="newEvent.name" type="text" 
                     class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
            </div>

            <!-- Date Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Start Date</label>
                <input v-model="newEvent.startDate" type="date" 
                       class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Milestone Date</label>
                <input v-model="newEvent.milestoneDate" type="date" 
                       class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>

            <!-- 事件类型 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">事件类型</label>
                <select v-model="newEvent.eventType" class="w-full px-4 py-2 rounded-lg border border-gray-300">
                  <option value="corporate_report">公司报告</option>
                  <option value="holiday">节假日</option>
                  <option value="policy">行政政策</option>
                  <option value="announcement">公司公告</option>
                </select>
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
                <select v-model="newEvent.effectSide" class="w-full px-4 py-2 rounded-lg border border-gray-300">
                  <option value="individual_stock">个股</option>
                  <option value="concept">概念</option>
                  <option value="industry">行业</option>
                  <option value="market">市场所有</option>
                </select>
              </div>
              
              <div v-if="newEvent.effectSide === 'individual_stock'">
                <label class="block text-sm font-medium mb-1 text-gray-700">股票代码</label>
                <input v-model="newEvent.stockCode" class="w-full px-4 py-2 rounded-lg border border-gray-300">
                
                <label class="block text-sm font-medium mb-1 text-gray-700 mt-2">公司名称</label>
                <input v-model="newEvent.stockName" class="w-full px-4 py-2 rounded-lg border border-gray-300">
              </div>
            </div>

            <!-- 权重设置 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">权重 (-100 ~ 100)</label>
                <input 
                  v-model="newEvent.weight" 
                  type="number" 
                  min="-100" 
                  max="100" 
                  class="w-full px-4 py-2 rounded-lg border border-gray-300">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">算法选择</label>
                <select v-model="newEvent.weightAlgo" class="w-full px-4 py-2 rounded-lg border border-gray-300">
                  <option value="all_the_same">统一计算</option>
                </select>
              </div>
            </div>

            <!-- Weight & Color -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Priority</label>
                <input v-model="newEvent.weight" type="number" min="1" max="10" 
                       class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Color</label>
                <div class="flex items-center gap-2">
                  <input v-model="newEvent.color" type="color" 
                         class="w-12 h-10 rounded-md border border-gray-300 cursor-pointer">
                  <span class="text-sm text-gray-600">{{ newEvent.color }}</span>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" 
                    class="w-full md:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-200">
              <span class="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add Event
              </span>
            </button>
          </form>
        </div>

        <!-- 事件列表 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">事件列表</h2>
            <span class="text-sm text-gray-500">共 {{ events.length }} 个事件</span>
          </div>
          <!-- 原有列表内容保持不变 -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Algolia风格字体配置 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 输入框聚焦效果 */
input:focus, select:focus {
  @apply ring-2 ring-blue-100 border-blue-500;
}

/* 专业按钮样式 */
.button-primary {
  @apply px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
         shadow-sm transition-all duration-150;
}

/* 数据卡片悬停效果 */
.event-item {
  @apply transition-all duration-200 hover:shadow-md;
}
</style>

<script>
export default {
  data() {
    return {
      newEvent: {
        name: '',
        startDate: '',
        milestoneDate: '',
        weight: 0,
        color: '#3b82f6',
        eventType: 'corporate_report', // 新增字段
        eventSubType: 'fixed',        // 新增子类型
        effectSide: 'individual_stock', // 新增影响面
        stockCode: '',                // 个股编码
        stockName: '',                // 个股名称
        weightAlgo: 'all_the_same'    // 权重算法
      },
      events: []
    }
  },
  methods: {
    addEvent() {
      if (!this.newEvent.name || !this.newEvent.startDate || !this.newEvent.milestoneDate) {
        alert('Please fill all required fields');
        return;
      }
      
      this.events.push({...this.newEvent});
      this.resetForm();
    },
    removeEvent(index) {
      this.events.splice(index, 1);
    },
    resetForm() {
      this.newEvent = {
        name: '',
        startDate: '',
        milestoneDate: '',
        weight: 5,
        color: '#3b82f6'
      };
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
}
</script>

<style>
/* 添加全局过渡效果 */
.button-transition {
  @apply transition-all duration-200 ease-in-out;
}

/* 优化输入框聚焦效果 */
input:focus, select:focus {
  @apply ring-2 ring-blue-100 border-blue-500;
}

/* 表格行悬停效果 */
.event-item:hover {
  @apply bg-blue-50;
}
</style>