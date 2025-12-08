"use client"

import { useBackground } from '../context/BackgroundContext';
import VignetteEffect from './VignetteEffect';

export default function VignetteEffectWrapper() {
  const { isWhiteBackground } = useBackground();
  return <VignetteEffect isWhiteBackground={isWhiteBackground} />;
} 