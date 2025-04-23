<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-blue-600">
              StockEvents
            </router-link>
            <div class="hidden md:flex space-x-8 ml-10">
              <router-link 
                to="/events" 
                class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">
                事件管理
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view/>
    </main>

    <!-- 页脚 -->
    <footer class="border-t bg-white mt-12">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-sm text-gray-600">
        <div class="flex justify-between">
          <span>© 2024 StockEvents. All rights reserved.</span>
          <div class="space-x-4">
            <a href="#" class="hover:text-blue-600">隐私政策</a>
            <a href="#" class="hover:text-blue-600">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.router-link-exact-active {
  @apply text-blue-600 border-b-2 border-blue-600;
}
</style>