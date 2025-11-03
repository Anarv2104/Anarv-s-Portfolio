'use client';

import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

export default function PerformanceOptimizer() {
  usePerformanceOptimization();
  return null;
}