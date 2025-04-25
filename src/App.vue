<template>
  <div class="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
    <nav class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <router-link to="/" class="text-xl font-bold text-primary hover:text-primary-600">
            StockEvents
          </router-link>
          <div class="hidden md:flex items-center space-x-8">
            <router-link 
              to="/events" 
              class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors
                     font-medium text-sm">
              事件管理
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view/>
    </main>

    <footer class="border-t border-gray-200 bg-white mt-auto">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <span class="text-sm text-gray-600">&copy; 2024 StockEvents. All rights reserved.</span>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-600 hover:text-gray-800 text-sm">隐私政策</a>
            <a href="#" class="text-gray-600 hover:text-gray-800 text-sm">服务条款</a>
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