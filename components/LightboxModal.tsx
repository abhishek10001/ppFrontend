'use client';

import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, ExternalLink, Sliders } from 'lucide-react';
import { IPhoto } from '@/lib/fallbackData';
import Link from 'next/link';

interface LightboxModalProps {
  plate: IPhoto | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function LightboxModal({ plate, onClose, onPrev, onNext }: LightboxModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);

  useEffect(() => {
    setZoomLevel(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === '+' || e.key === '=') setZoomLevel(prev => Math.min(prev + 0.5, 3));
      if (e.key === '-' || e.key === '_') setZoomLevel(prev => Math.max(prev - 0.5, 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [plate, onClose, onPrev, onNext]);

  if (!plate) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col backdrop-blur-sm select-none">
      {/* Top Bar */}
      <div className="h-14 border-b border-[#262626] px-3 sm:px-8 flex items-center justify-between font-mono text-xs flex-shrink-0 bg-black">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
          <span className="font-bold text-white tracking-widest text-[11px] sm:text-xs whitespace-nowrap">{plate.plateNumber}</span>
          <span className="text-[#525252] hidden sm:inline">|</span>
          <span className="text-[#A3A3A3] truncate max-w-[120px] sm:max-w-xs md:max-w-md uppercase tracking-wider text-[10px] sm:text-xs">
            {plate.title}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 text-[11px] flex-shrink-0">
          {/* Zoom controls */}
          <div className="flex items-center border border-[#333333] divide-x divide-[#333333]">
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 1))}
              className="p-1.5 sm:px-2.5 sm:py-1 hover:bg-white hover:text-black transition-colors"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="hidden sm:inline px-2 py-1 text-[10px] text-[#A3A3A3] min-w-[42px] text-center font-mono">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 3))}
              className="p-1.5 sm:px-2.5 sm:py-1 hover:bg-white hover:text-black transition-colors"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid overlay toggle (Desktop / Tablet) */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`border px-2.5 py-1 text-[10px] tracking-widest hidden md:inline-flex items-center space-x-1.5 transition-colors ${
              showGrid ? 'bg-white text-black border-white' : 'border-[#333333] text-[#A3A3A3] hover:text-white'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>GRID</span>
          </button>

          {/* Close button (Touch-friendly 36px) */}
          <button
            onClick={onClose}
            className="border border-[#404040] p-1.5 sm:p-2 hover:bg-white hover:text-black transition-colors"
            title="Close [Esc]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content: Responsive Split/Scrollable Inspection View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative bg-[#050505]">
        {/* Navigation Arrow Left */}
        {onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 top-[25vh] sm:top-[30vh] lg:top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/70 border border-[#333333] hover:bg-white hover:text-black transition-colors"
            title="Previous Plate [←]"
            aria-label="Previous plate"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Navigation Arrow Right */}
        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 lg:right-[390px] top-[25vh] sm:top-[30vh] lg:top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/70 border border-[#333333] hover:bg-white hover:text-black transition-colors"
            title="Next Plate [→]"
            aria-label="Next plate"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Plate Viewport Container */}
        <div className="w-full lg:flex-1 h-[52vh] sm:h-[60vh] lg:h-auto flex items-center justify-center p-3 sm:p-8 lg:p-12 overflow-auto bg-[#050505] relative flex-shrink-0">
          {/* Bauhaus Archival Grid Overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/20 divide-x divide-white/10 divide-y z-10" />
          )}

          <div
            className="transition-transform duration-200 ease-out origin-center cursor-zoom-in max-h-full max-w-full flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={() => setZoomLevel(prev => (prev >= 2 ? 1 : prev + 0.5))}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={plate.cloudinary?.secureUrl || (plate as any).imageUrl}
              alt={`${plate.title} — ${plate.location?.city}`}
              className="max-h-[48vh] sm:max-h-[56vh] lg:max-h-[75vh] w-auto max-w-full object-contain shadow-2xl"
            />
          </div>
        </div>

        {/* Technical Monospace Data Sidebar (Scrollable on all devices) */}
        <div className="w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-[#262626] bg-[#0A0A0A] p-5 sm:p-8 flex flex-col justify-between overflow-y-auto font-mono text-xs flex-shrink-0">
          <div className="space-y-5 sm:space-y-6">
            {/* Header info */}
            <div>
              <div className="text-[10px] text-[#737373] tracking-widest uppercase mb-1">
                REGISTRY SPECIFICATION // ARCHIVE
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-sans">
                {plate.title}
              </h2>
              {plate.location?.specificLocation && (
                <div className="text-[11px] text-[#A3A3A3] mt-1">
                  {plate.location.specificLocation}
                </div>
              )}
            </div>

            {/* Location & Year */}
            <div className="border-t border-[#1F1F1F] pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#737373]">MUNICIPALITY:</span>
                <span className="text-white font-semibold uppercase">{plate.location?.city || 'INDIA'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">CHRONOLOGY:</span>
                <span className="text-white">{plate.year}</span>
              </div>
            </div>

            {/* Technical EXIF Matrix */}
            <div className="border-t border-[#1F1F1F] pt-4">
              <div className="text-[10px] text-[#737373] tracking-widest uppercase mb-2 sm:mb-3">
                OPTICAL & EMULSION FORMULARY
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#141414]">
                  <span className="text-[#737373]">CAMERA BODY:</span>
                  <span className="text-white text-right">{plate.exif?.camera || 'Canon EOS R10'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#141414]">
                  <span className="text-[#737373]">OPTICAL LENS:</span>
                  <span className="text-white text-right">{plate.exif?.lens || 'Canon RF 35mm f/1.8 IS STM'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#141414]">
                  <span className="text-[#737373]">FOCAL LENGTH:</span>
                  <span className="text-white">{plate.exif?.focalLength || '35mm'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#141414]">
                  <span className="text-[#737373]">APERTURE:</span>
                  <span className="text-white">{plate.exif?.aperture || 'f/2.8'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#141414]">
                  <span className="text-[#737373]">SHUTTER SPEED:</span>
                  <span className="text-white">{plate.exif?.shutterSpeed || '1/320s'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#141414]">
                  <span className="text-[#737373]">ISO RATING:</span>
                  <span className="text-white">{plate.exif?.iso || 'ISO 400'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#141414]">
                  <span className="text-[#737373]">SENSOR / FORMAT:</span>
                  <span className="text-white text-right">{plate.exif?.filmStock || '24.2MP CMOS RAW'}</span>
                </div>
              </div>
            </div>

            {/* Cloudinary & Dimensions */}
            <div className="border-t border-[#1F1F1F] pt-4 space-y-1.5 text-[10px] text-[#737373]">
              {plate.cloudinary?.aspectRatio && (
                <div className="flex justify-between">
                  <span>ASPECT RATIO:</span>
                  <span className="text-white font-mono">{plate.cloudinary.aspectRatio}</span>
                </div>
              )}
              {plate.cloudinary?.width && plate.cloudinary?.height && (
                <div className="flex justify-between">
                  <span>ARCHIVAL RESOLUTION:</span>
                  <span className="text-white font-mono">{plate.cloudinary.width} × {plate.cloudinary.height} PX</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>CATEGORY:</span>
                <span className="text-white font-mono uppercase">{plate.category || 'STREETS'}</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-[#1F1F1F] space-y-2 mt-6">
            <Link
              href={`/about?plate=${encodeURIComponent(plate.plateNumber)}#inquiries`}
              onClick={onClose}
              className="w-full py-3 bg-white text-black text-center font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-2"
            >
              <span>INQUIRE ABOUT THIS PRINT</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <div className="text-[9px] text-[#525252] text-center tracking-widest uppercase">
              ARCHIVAL PIGMENT PRINT • 310GSM COTTON RAG
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
