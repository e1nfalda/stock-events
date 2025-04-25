<template>
  <div class="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
    <h2 class="text-lg font-semibold mb-4 text-gray-800">Event Timeline</h2>
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { CustomChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TimelineComponent,
  ToolboxComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, computed } from 'vue'

use([
  CanvasRenderer,
  CustomChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TimelineComponent,
  ToolboxComponent
])

export default {
  name: 'TimelineChart',
  components: {
    VChart
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartOption = computed(() => ({
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          const event = props.events.find(e => e.id === params[0].value[2])
          return `
            <div class="font-sans">
              <div class="font-bold">${getEventTypeLabel(event.eventType)}</div>
              <div>${event.effectSide === 'individual_stock' ? 
                `${event.stockCode} - ${event.stockName}` : 
                getEffectSideLabel(event.effectSide)}</div>
              <div>权重: ${event.weight}</div>
              <div>开始: ${formatDate(event.effectStartTime)}</div>
              <div>结束: ${formatDate(event.effectMilestone)}</div>
            </div>
          `
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      grid: {
        top: 60,
        bottom: 30
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        data: ['Market', 'Industry', 'Stock'],
        axisTick: {
          alignWithLabel: true
        }
      },
      series: [{
        type: 'custom',
        renderItem: (params, api) => {
          const event = props.events.find(e => e.id === api.value(2))
          const start = api.coord([api.value(0), api.value(1)])
          const end = api.coord([api.value(3), api.value(1)])
          const height = 20
          
          return {
            type: 'group',
            children: [{
              type: 'rect',
              shape: {
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
              },
              style: {
                fill: getEventColor(event.eventType),
                opacity: 0.8
              }
            }]
          }
        },
        dimensions: [
          'startTime',
          'level',
          'id',
          'endTime'
        ],
        encode: {
          x: [0, 3],
          y: 1
        },
        data: props.events.map(event => [
          new Date(event.effectStartTime),
          getLevelIndex(event.effectSide),
          event.id,
          new Date(event.effectMilestone)
        ])
      }]
    }))

    const getEventColor = (type) => {
      const colors = {
        corporate_report: '#3B82F6',
        holiday: '#EF4444',
        policy: '#10B981',
        announcement: '#8B5CF6'
      }
      return colors[type] || '#6B7280'
    }

    const getLevelIndex = (effectSide) => {
      const levels = {
        market: 0,
        industry: 1,
        individual_stock: 2
      }
      return levels[effectSide] || 0
    }

    const getEventTypeLabel = (type) => {
      const types = {
        corporate_report: '公司报告',
        holiday: '节假日',
        policy: '行政政策',
        announcement: '公司公告'
      }
      return types[type] || type
    }

    const getEffectSideLabel = (side) => {
      const sides = {
        market: '市场整体',
        industry: '行业',
        individual_stock: '个股'
      }
      return sides[side] || side
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    return {
      chartOption
    }
  }
}
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>