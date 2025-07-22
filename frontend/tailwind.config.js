/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 기존 버튼색상
        primary: '#2563eb', // blue-600
        primaryHover: '#1d4ed8', // blue-700
        danger: '#dc2626', // red-600
        dangerHover: '#b91c1c', // red-700
        grayMuted: '#d1d5db', // gray-300

        // 배경 통일
        background: '#f8f9fb',

        // Sidebar
        sidebarBg: '#1E293B', // slate-900
        sidebarText: '#F8FAFC', // slate-50
        sidebarHover: '#334155', // slate-700
        sidebarActive: '#334155', // slate-700

        // 카드 하이라이트 색상 (Notes, Exam, 등등)
        noteBg: '#fef9c3', // 연노랑
        meetingBg: '#f0f9ff', // 연하늘
        examBg: '#fef3c7', // 연주황
        collegeBg: '#f3f4f6', // 연회색
        conversationBg: '#f9fafb', // 채팅 영역 배경

        // 텍스트 계층 (섹션 아이콘 + 이름)
        sectionChecklist: '#ef4444',
        sectionTodo: '#3b82f6',
        sectionMeeting: '#10b981',
        sectionNote: '#eab308',
        sectionExam: '#f43f5e',
        sectionTime: '#14b8a6',
        sectionConversation: '#0ea5e9',
        sectionCollege: '#6366f1',
        sectionContact: '#a855f7',
        sectionAccess: '#a855f7',

        text: {
          DEFAULT: '#1f2937', // gray-800
          soft: '#6b7280', // gray-500
        },
        input: {
          border: '#cbd5e1',
          bg: '#f9fafb',
          focus: '#3b82f6',
        },
      },
      spacing: {
        layout: '24px', // 예시: 전체 페이지 여백
      },
      borderRadius: {
        DEFAULT: '1rem', // 모든 컴포넌트 기본 radius
        lg: '1.25rem',
        input: '0.375rem',
      },
      fontSize: {
        label: ['0.875rem', { lineHeight: '1.5rem' }],
        title: ['1.5rem', { fontWeight: '700' }],
        subtitle: ['1.25rem', { fontWeight: '600' }],
        description: ['1rem', { fontWeight: '500' }],
        xs: ['0.75rem', '1rem'], // 12px
        sm: ['0.875rem', '1.25rem'], // 14px
        base: ['1rem', '1.5rem'], // 16px
        lg: ['1.125rem', '1.75rem'], // 18px
        xl: ['1.25rem', '1.75rem'], // 20px
        xxl: ['1.5rem', '2rem'], // 24px
        xxxl: ['1.875rem', '2.25rem'], // 30px
        xxxxl: ['2.25rem', '2.5rem'], // 36px
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        // Layout
        '.main-content': {
          '@apply space-y-6 p-6': {},
        },
        '.section-box': {
          '@apply bg-white p-6 rounded-xl shadow space-y-3': {},
        },
        '.section-title': {
          '@apply flex items-center gap-2 text-lg font-bold mb-2': {},
        },
        '.card-grid': {
          '@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6': {},
        },

        // Typography
        '.text-soft-base': {
          '@apply text-base text-text-soft': {},
        },
        '.text-soft-sm': {
          '@apply text-sm text-text-soft': {},
        },
        '.text-soft-xs': {
          '@apply text-xs text-text-soft': {},
        },

        // Card & Item
        '.card': {
          '@apply bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer':
            {},
        },
        '.list-box-item': {
          '@apply p-3 bg-gray-50 rounded': {},
        },

        // Button
        '.btn': {
          '@apply px-4 py-2 rounded font-semibold transition-all': {},
        },
        '.btn-primary': {
          '@apply btn bg-primary text-white hover:bg-blue-700': {},
        },
        '.btn-outline': {
          '@apply btn border border-primary text-primary hover:bg-blue-50': {},
        },

        // Badge
        '.badge': {
          '@apply text-xs inline-block px-2 py-1 rounded font-medium': {},
        },
        '.badge-grade': {
          '@apply badge bg-indigo-100 text-indigo-700': {},
        },

        // Calendar
        '.calendar-box': {
          '@apply bg-white p-6 rounded-xl shadow': {},
        },
        '.calendar-hour': {
          '@apply border-t pt-2 pb-1': {},
        },
        '.calendar-label': {
          '@apply text-gray-400 font-medium text-xs': {},
        },
        '.calendar-event': {
          '@apply text-indigo-600 font-semibold text-sm': {},
        },
        '.calendar-empty': {
          '@apply text-gray-300 text-sm': {},
        },

        // Form
        '.form-input': {
          '@apply border border-input-border bg-input-bg rounded-input px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-input-focus':
            {},
        },
      });
    }),
  ],
};
