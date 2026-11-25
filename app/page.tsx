'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IPhoto, IDispatch } from '@/lib/fallbackData';
import { fetchSiteConfig, fetchPhotos, fetchDispatches } from '@/lib/api';

export default function IndexPage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [plates, setPlates] = useState<IPhoto[]>([]);
  const [recentEssays, setRecentEssays] = useState<IDispatch[]>([]);

  useEffect(() => {
    fetchSiteConfig().then(cfg => {
      if (cfg) setSiteConfig(cfg);
    });
    fetchPhotos({ limit: 50 }).then(res => {
      setPlates(res.items || []);
    });
    fetchDispatches().then(dispatches => {
      setRecentEssays((dispatches || []).slice(0, 3));
    });
  }, []);

  const heroPlate = siteConfig?.heroPlate;
  const defaultHeroUrl = plates[0]?.cloudinary?.secureUrl || (plates[0] as any)?.imageUrl;
  const heroImageUrl = (heroPlate?.imageUrl && heroPlate.imageUrl.trim()) ? heroPlate.imageUrl : defaultHeroUrl;
  const featuredPlates = plates.slice(0, 8);

  return (
    <div className="bg-white">
      {/* 1. Hero Header Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-6">
        {/* Eyebrow */}
        <div className="mono-label text-[#737373] text-[9px] sm:text-[11px] mb-2 sm:mb-3">
          VISUALS & JOURNAL • ABHISHEK GANGWAR
        </div>

        {/* Display Title and Subcopy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black uppercase font-sans break-words">
            STREETS &<br />
            STORIES
          </h1>
          <p className="max-w-md text-xs sm:text-sm text-[#525252] font-mono leading-relaxed lg:text-right pb-1">
            Street photography and visual journal from Indian Cities. Documenting everyday life, geometry, and human moments.
          </p>
        </div>

        {/* 16:9 Cinematic Hero Archival Banner */}
        {heroImageUrl && (
          <div className="border border-black bg-black shadow-lg">
            {/* Cinematic 16:9 Image Container (Occupies full length, crops any uploaded aspect ratio to 16:9) */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A0A0A] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImageUrl}
                alt={heroPlate?.title || 'Hero Photograph'}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />

              {/* Subtle Bottom Contrast Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Architectural Colophon Strip */}
            <div className="border-t border-[#262626] bg-[#0A0A0A] text-white p-3.5 sm:px-6 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider gap-2">
              <div className="flex items-center space-x-2.5 truncate">
                <span className="bg-white text-black font-bold px-1.5 py-0.5 text-[9px] uppercase tracking-widest flex-shrink-0">
                  {heroPlate?.plateNumber || 'PL. 01'}
                </span>
                <span className="font-bold uppercase tracking-tight text-white text-xs sm:text-sm truncate">
                  {heroPlate?.title || 'UNTITLED FIELD PIECE'}
                </span>
                {heroPlate?.year && (
                  <span className="text-[#737373] hidden sm:inline">
                    // {heroPlate.year}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3 text-[9px] sm:text-[10px] text-[#A3A3A3] uppercase tracking-widest self-start sm:self-auto">
                {heroPlate?.location && (
                  <span className="text-[#CCC] truncate">
                    {heroPlate.location}
                  </span>
                )}
                <Link
                  href="/archive"
                  className="text-white hover:underline flex items-center space-x-1 whitespace-nowrap pl-2.5 border-l border-[#333]"
                >
                  <span>VIEW FULL ARCHIVE</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. Selected Plates (Uncropped Photos in Responsive Bauhaus Grid) */}
      <section id="selected-works" className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-12 sm:pb-14">
        {/* Section Header */}
        <div className="border-b border-[#E5E5E5] pb-3 mb-6 sm:mb-8 flex items-center justify-between font-mono text-xs tracking-wider">
          <div className="font-bold text-black uppercase">
            SELECTED WORKS ({String(featuredPlates.length).padStart(2, '0')})
          </div>
          <div className="text-[#737373] text-[9px] sm:text-[10px] uppercase tracking-widest">
            ARCHIVE PHOTOGRAPHS
          </div>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        {featuredPlates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
              {featuredPlates.map((plate) => (
                <div
                  key={plate.slug || plate.plateNumber || plate._id}
                  className="group"
                >
                  {/* Framed Image Container: White passe-partout / matting with light grey border */}
                  <div className="border border-[#E5E5E5] bg-white p-3 aspect-[4/3] flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={plate.cloudinary?.secureUrl || (plate as any).imageUrl}
                      alt={plate.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Title & Category below the bordered photo */}
                  <div className="mt-2.5">
                    <h3 className="text-sm font-semibold text-black tracking-tight leading-snug">
                      {plate.title}
                    </h3>
                    <p className="text-[10px] text-[#737373] tracking-widest uppercase mt-0.5 font-mono">
                      {plate.category || 'STREETS'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View Complete Archive Action Link */}
            <div className="pt-10 sm:pt-12 flex justify-center">
              <Link
                href="/archive"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 border border-black bg-black text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors text-center"
              >
                <span>VIEW FULL ARCHIVE & PRINT DETAILS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="border border-dashed border-[#CCCCCC] p-8 sm:p-12 text-center my-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[#737373]">
              NO ARCHIVAL PLATES REGISTERED YET
            </p>
            <p className="font-mono text-[11px] text-[#A3A3A3] mt-2">
              Upload photographs through the admin dashboard to display your portfolio here.
            </p>
          </div>
        )}
      </section>

      {/* 3. Field Writing / Journal Index Showcase */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="border-b border-black pb-3 flex items-center justify-between font-mono text-xs tracking-wider mb-6 sm:mb-8">
          <div className="font-bold text-black uppercase">JOURNAL & STORIES</div>
          <div className="text-[#737373] text-[9px] sm:text-[10px] tracking-widest uppercase">FIELD NOTES</div>
        </div>

        {recentEssays.length > 0 ? (
          <div className="space-y-6">
            {/* Featured Hero Story Card */}
            {(() => {
              const leadEssay = recentEssays[0];
              const remainingEssays = recentEssays.slice(1);
              const photoCount = leadEssay.galleryPhotos?.length || leadEssay.plateCount || 1;

              return (
                <>
                  <div className="border border-black bg-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm">
                    {/* Left Column: Story Text & Meta */}
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-[#E5E5E5]">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] sm:text-[10px] text-[#737373] tracking-widest uppercase">
                          <span className="w-1.5 h-1.5 bg-black"></span>
                          <span className="font-bold text-black">{leadEssay.dossierNumber || 'FEATURED JOURNAL'}</span>
                          <span>•</span>
                          <span>
                            {new Date(leadEssay.publishedDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          {leadEssay.readTimeMinutes ? <span>• {leadEssay.readTimeMinutes} MIN READ</span> : null}
                          <span>• {photoCount} {photoCount === 1 ? 'PHOTO' : 'PHOTOS'}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black uppercase tracking-tight font-sans leading-tight">
                          <Link href={`/essays/${leadEssay.slug}`} className="hover:opacity-75 transition-opacity">
                            {leadEssay.title}
                          </Link>
                        </h2>

                        <p className="font-mono text-xs sm:text-sm text-[#333333] leading-relaxed line-clamp-3 sm:line-clamp-4">
                          {leadEssay.abstract}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
                        <div className="font-mono text-[9px] sm:text-[10px] text-[#737373] tracking-wider uppercase">
                          <span className="text-black font-semibold">{leadEssay.location || 'INDIA'}</span> • CANON EOS R10
                        </div>

                        <Link
                          href={`/essays/${leadEssay.slug}`}
                          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-black text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors w-full sm:w-auto text-center"
                        >
                          <span>READ STORY</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Uncropped Hero Image */}
                    <div className="lg:col-span-5 flex flex-col justify-between bg-[#FAFAFA]">
                      {leadEssay.leadCoverPhotoUrl ? (
                        <Link
                          href={`/essays/${leadEssay.slug}`}
                          className="relative p-4 sm:p-6 flex items-center justify-center min-h-[240px] sm:min-h-[320px] lg:h-full bg-white group cursor-pointer"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={leadEssay.leadCoverPhotoUrl}
                            alt={leadEssay.title}
                            className="max-h-[340px] w-auto max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                          />
                        </Link>
                      ) : (
                        <div className="p-8 sm:p-12 flex items-center justify-center min-h-[220px] sm:min-h-[300px] text-center font-mono text-xs text-[#737373]">
                          COVER PHOTOGRAPH
                        </div>
                      )}
                      <div className="p-3 bg-[#F4F4F4] border-t border-[#E5E5E5] flex justify-between font-mono text-[9px] sm:text-[10px] text-[#525252] tracking-widest uppercase">
                        <span className="truncate">{leadEssay.title}</span>
                        <span className="text-[#737373] whitespace-nowrap">{leadEssay.location || 'FIELD LOG'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Other Recent Essays (if any) */}
                  {remainingEssays.length > 0 && (
                    <div className="divide-y divide-[#E5E5E5] border border-[#E5E5E5] bg-white">
                      {remainingEssays.map((essay, index) => {
                        const formattedIdx = String(index + 2).padStart(2, '0');
                        return (
                          <Link
                            key={essay.slug}
                            href={`/essays/${essay.slug}`}
                            className="group py-3.5 sm:py-4 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAFAFA] transition-colors"
                          >
                            <div className="flex items-center space-x-3 sm:space-x-5">
                              <span className="font-mono text-xs text-[#737373] group-hover:text-black font-semibold">
                                {formattedIdx}
                              </span>
                              {essay.leadCoverPhotoUrl && (
                                <div className="w-12 h-9 bg-neutral-100 flex-shrink-0 border border-[#E5E5E5] overflow-hidden flex items-center justify-center">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={essay.leadCoverPhotoUrl}
                                    alt={essay.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <span className="font-bold text-sm text-black group-hover:translate-x-1 transition-transform uppercase font-sans">
                                {essay.title}
                              </span>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end space-x-4 font-mono text-xs text-[#737373] pl-8 sm:pl-0">
                              <span className="uppercase text-[10px] tracking-wider">
                                {new Date(essay.publishedDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })()}

            <div className="pt-2">
              <Link
                href="/essays"
                className="inline-flex items-center space-x-2 font-mono text-xs font-bold text-black hover:opacity-70 uppercase tracking-wider"
              >
                <span>VIEW ALL JOURNAL STORIES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-8 font-mono text-xs text-[#737373] text-center border border-[#E5E5E5] uppercase tracking-wider">
            NO JOURNAL STORIES PUBLISHED YET
          </div>
        )}
      </section>

      {/* 4. Notes on Street Photography Block */}
      <section className="bg-[#F8F8F8] border-y border-[#E5E5E5] py-12 sm:py-16 px-4 sm:px-8 my-8 sm:my-10">
        <div className="max-w-[1100px] mx-auto space-y-5 sm:space-y-6">
          <div className="mono-label text-[#737373] text-[9px] sm:text-[11px]">
            NOTES ON STREET PRACTICE // ABHISHEK GANGWAR
          </div>

          <blockquote className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight uppercase font-sans">
            “The decisive moment is an unyielding geometry of light and human migration.”
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pt-4 border-t border-[#E5E5E5]">
            <p className="font-mono text-[9px] sm:text-[10px] text-[#737373] tracking-widest uppercase">
              // FIELD NOTES — ABHISHEK GANGWAR
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/archive"
                className="px-5 py-2.5 bg-black text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors text-center"
              >
                VIEW PHOTO ARCHIVE
              </Link>
              <Link
                href="/about#inquiries"
                className="px-5 py-2.5 border border-black text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors text-center"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
