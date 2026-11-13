'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Layers, Grid3X3 } from 'lucide-react';
import { IPhoto } from '@/lib/fallbackData';
import { fetchPhotos } from '@/lib/api';
import LightboxModal from '@/components/LightboxModal';

type ViewMode = 'standard' | 'compact';

export default function ArchivePage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<ViewMode>('compact');
  const [selectedPlate, setSelectedPlate] = useState<IPhoto | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [plates, setPlates] = useState<IPhoto[]>([]);

  useEffect(() => {
    fetchPhotos({ limit: 100 }).then(res => {
      setPlates(res.items || []);
    });
  }, []);

  // Dynamically compute unique categories from actual photo collection
  const dynamicCategories = useMemo(() => {
    const cats = new Set<string>();
    plates.forEach(p => {
      if (p.category && p.category.trim()) {
        cats.add(p.category.trim().toUpperCase());
      }
    });
    return ['ALL', ...Array.from(cats)];
  }, [plates]);

  // Dynamic filter matching
  const filteredPlates = useMemo(() => {
    if (activeCategory === 'ALL') return plates;
    return plates.filter(p => (p.category || '').trim().toUpperCase() === activeCategory);
  }, [activeCategory, plates]);

  const displayedPlates = filteredPlates.slice(0, visibleCount);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Archive Header */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-4 sm:pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 border-b border-[#E5E5E5]">
          <div className="space-y-2 sm:space-y-3">
            <div className="mono-label text-[#737373] text-[9px] sm:text-[11px]">
              PHOTO ARCHIVE • ABHISHEK GANGWAR
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase font-sans">
              ARCHIVE
            </h1>
            <p className="max-w-xl text-xs sm:text-sm text-[#525252] font-mono leading-relaxed">
              Complete photographic index of street captures, geometry, and human moments across Indian cities. Photographed on Canon EOS R10.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center space-x-4 font-mono text-xs self-start md:self-end">
            <div className="flex border border-black divide-x divide-black">
              <button
                onClick={() => setViewMode('standard')}
                className={`px-3 py-1.5 flex items-center space-x-1.5 transition-colors uppercase text-[10px] font-semibold ${
                  viewMode === 'standard' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#F4F4F4]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">STANDARD</span>
                <span className="sm:hidden">LARGE</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-1.5 flex items-center space-x-1.5 transition-colors uppercase text-[10px] font-semibold ${
                  viewMode === 'compact' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#F4F4F4]'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">COMPACT</span>
                <span className="sm:hidden">GRID</span>
              </button>
            </div>
            <span className="text-[10px] text-[#737373] tracking-widest hidden sm:inline uppercase">
              {plates.length} PLATES REGISTERED
            </span>
          </div>
        </div>

        {/* 2. Dynamic Classification & Filter Bar (Touch-friendly & Smooth Scroll) */}
        <div className="border-b border-[#E5E5E5] py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0 touch-pan-x">
            {dynamicCategories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleCount(12);
                  }}
                  className={`px-3 py-1.5 text-[10px] tracking-wider uppercase whitespace-nowrap transition-colors border font-mono ${
                    isSelected
                      ? 'bg-black text-white border-black font-bold'
                      : 'border-[#E5E5E5] text-[#525252] hover:border-black hover:text-black'
                  }`}
                >
                  {category === 'ALL' ? '■ ALL WORKS' : category}
                </button>
              );
            })}
          </div>

          <div className="text-[10px] text-[#737373] tracking-widest uppercase whitespace-nowrap self-end md:self-auto">
            SHOWING {String(displayedPlates.length).padStart(2, '0')} / {String(filteredPlates.length).padStart(2, '0')} PLATES
          </div>
        </div>
      </section>

      {/* 3. Archival Plate Grid (Uncropped with Bauhaus Passe-Partout Matting) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6">
        {displayedPlates.length > 0 ? (
          <div
            className={`grid gap-4 sm:gap-6 lg:gap-8 ${
              viewMode === 'standard'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {displayedPlates.map((plate) => (
              <div
                key={plate.plateNumber + (plate._id || '')}
                onClick={() => setSelectedPlate(plate)}
                className="group cursor-pointer bg-white transition-opacity hover:opacity-95"
              >
                {/* Framed Image Container: White passe-partout / matting with light grey border */}
                <div className="border border-[#E5E5E5] bg-white p-2 sm:p-3 aspect-[4/3] flex items-center justify-center overflow-hidden group-hover:border-black transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={plate.cloudinary?.secureUrl || (plate as any).imageUrl}
                    alt={plate.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Plate Title & Category Strip */}
                <div className="mt-2 sm:mt-2.5">
                  <h3 className="text-xs sm:text-sm font-semibold text-black tracking-tight leading-snug group-hover:underline truncate">
                    {plate.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[9px] sm:text-[10px] text-[#737373] tracking-widest uppercase mt-0.5 font-mono gap-0.5">
                    <span className="truncate">{plate.category || 'STREETS'}</span>
                    <span className="truncate">{plate.location.city} • {plate.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#CCCCCC] p-8 sm:p-16 text-center my-8">
            <p className="font-mono text-xs uppercase tracking-widest text-[#737373]">
              NO ARCHIVAL PLATES REGISTERED YET
            </p>
            <p className="font-mono text-[11px] text-[#A3A3A3] mt-2">
              Upload photographs via the admin dashboard to populate the photo archive.
            </p>
          </div>
        )}
      </section>

      {/* 4. Minimal Load More Bottom Bar */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 sm:py-10 border-t border-[#E5E5E5] mt-8 sm:mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <p className="text-[10px] sm:text-[11px] text-[#737373] uppercase tracking-wider text-center sm:text-left max-w-xl">
            Archival pigment prints on 310gsm cotton rag. Tap any plate to inspect technical EXIF data and optical formulary.
          </p>

          <div className="w-full sm:w-auto flex justify-center">
            {visibleCount < filteredPlates.length ? (
              <button
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="w-full sm:w-auto px-6 py-3 bg-black text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors text-center"
              >
                LOAD MORE PLATES [{visibleCount} / {filteredPlates.length}]
              </button>
            ) : (
              <span className="w-full sm:w-auto text-center px-5 py-2.5 border border-[#E5E5E5] text-[#737373] text-[10px] font-mono uppercase tracking-widest">
                ALL {filteredPlates.length} PLATES DISPLAYED
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal (For Inspecting Technical Camera & Print Details) */}
      <LightboxModal
        plate={selectedPlate}
        onClose={() => setSelectedPlate(null)}
        onPrev={() => {
          if (!selectedPlate) return;
          const idx = filteredPlates.findIndex(p => p.slug === selectedPlate.slug);
          if (idx > 0) setSelectedPlate(filteredPlates[idx - 1]);
        }}
        onNext={() => {
          if (!selectedPlate) return;
          const idx = filteredPlates.findIndex(p => p.slug === selectedPlate.slug);
          if (idx < filteredPlates.length - 1) setSelectedPlate(filteredPlates[idx + 1]);
        }}
      />
    </div>
  );
}
