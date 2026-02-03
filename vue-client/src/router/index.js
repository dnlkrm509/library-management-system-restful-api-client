import { createRouter, createWebHistory } from 'vue-router'

// Auth
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import ResetView from '@/views/auth/ResetView.vue'
import NewPasswordView from '@/views/auth/NewPasswordView.vue'

// Shop
import ResourcesView from '@/views/shop/ResourcesView.vue'
import DetailView from '@/views/shop/DetailView.vue'
import BorrowView from '@/views/shop/BorrowView.vue'
import BorrowHistoryView from '@/views/shop/BorrowHistoryView.vue'
import CheckoutView from '@/views/shop/CheckoutView.vue'
import CheckoutSuccessView from '@/views/shop/CheckoutSuccessView.vue'

// Admin
import AdminResourcesView from '@/views/admin/AdminResourcesView.vue'
import EditResourceView from '@/views/admin/EditResourceView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/resources' },

    { path: '/login', component: LoginView },
    { path: '/signup', component: SignupView },
    { path: '/reset', component: ResetView },
    { path: '/new-password', component: NewPasswordView },

    { path: '/resources', component: ResourcesView },
    { path: '/resources/:id', component: DetailView },

    { path: '/borrow', component: BorrowView },
    { path: '/borrow-history', component: BorrowHistoryView },

    { path: '/checkout', component: CheckoutView },
    { path: '/checkout-success', component: CheckoutSuccessView },

    { path: '/admin/resources', component: AdminResourcesView },
    { path: '/admin/edit', component: EditResourceView },
  ]
})

export default router