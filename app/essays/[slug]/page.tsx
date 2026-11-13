'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Printer } from 'lucide-react';
import { IDispatch } from '@/lib/fallbackData';
import { fetchDispatchBySlug, fetchDispatches } from '@/lib/api';

export default function EssayReaderPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [dispatch, setDispatch] = useState<IDispatch | null>(null);
  const [allDispatches, setAllDispatches] = useState<IDispatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([
      fetchDispatchBySlug(slug),
      fetchDispatches()
    ]).then(([d, list]) => {
      setDispatch(d);
      setAllDispatches(list || []);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen py-24 px-4 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#737373]">
          LOADING JOURNAL STORY...
        </p>
      </div>
    );
  }

  if (!dispatch) {
    return (
      <div className="bg-white min-h-screen py-24 px-4 text-center space-y-4">
        <p className="font-mono text-sm uppercase tracking-widest text-black font-bold">
          STORY NOT FOUND
        </p>
        <p className="font-mono text-xs text-[#737373]">
          The journal entry you requested does not exist or has been removed.
        </p>
        <div className="pt-2">
          <Link
            href="/essays"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-black text-white font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO JOURNAL</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allDispatches.findIndex(d => d.slug === dispatch.slug);
  const prevDispatch = currentIndex > 0 ? allDispatches[currentIndex - 1] : null;
  const nextDispatch = currentIndex >= 0 && currentIndex < allDispatches.length - 1 ? allDispatches[currentIndex + 1] : null;

  return (
    <div className="bg-white min-h-screen">
      {/* Header Strip */}
      <div className="border-b border-[#E5E5E5] bg-[#FAFAFA] py-3 px-4 sm:px-8 font-mono text-xs">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between text-[#737373]">
          <Link
            href="/essays"
            className="flex items-center space-x-2 text-black hover:opacity-75 uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO JOURNAL</span>
          </Link>
          <div className="hidden sm:inline uppercase tracking-widest text-[10px]">
            {dispatch.location || 'INDIA'} • CANON EOS R10
          </div>
        </div>
      </div>

      {/* Article Container */}
      <article className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-12 pb-20">
        {/* Title & Metadata */}
        <div className="space-y-6 pb-10 border-b border-[#E5E5E5]">
          <div className="mono-label text-[#737373] uppercase">
            {dispatch.location || 'FIELD LOG'} {dispatch.publishedDate ? `— ${new Date(dispatch.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` : ''}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-black uppercase tracking-tight font-sans leading-[0.95] break-words">
            {dispatch.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[#525252] uppercase">
            {dispatch.readTimeMinutes && <span>READING TIME: {dispatch.readTimeMinutes} MINUTES</span>}
            {dispatch.readTimeMinutes && dispatch.plateCount ? <span>•</span> : null}
            {dispatch.plateCount ? <span>PHOTOGRAPHS: {dispatch.plateCount}</span> : null}
            {dispatch.formatTag ? (
              <>
                <span>•</span>
                <span>{dispatch.formatTag}</span>
              </>
            ) : null}
          </div>

          {dispatch.abstract && (
            <p className="font-mono text-sm sm:text-base text-[#262626] leading-relaxed max-w-3xl pt-2">
              {dispatch.abstract}
            </p>
          )}
        </div>

        {/* Lead Hero Plate (Uncropped with white matting) */}
        {dispatch.leadCoverPhotoUrl && (
          <div className="my-8 sm:my-10 border border-[#E5E5E5] bg-white">
            <div className="relative p-2.5 sm:p-6 bg-white aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] max-h-[580px] flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dispatch.leadCoverPhotoUrl}
                alt={dispatch.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3 sm:px-4 sm:py-2.5 bg-white border-t border-[#E5E5E5] flex flex-col sm:flex-row justify-between font-mono text-[9px] sm:text-[10px] tracking-widest text-[#525252] uppercase gap-1">
              <div className="truncate">{dispatch.title}</div>
              <div className="whitespace-nowrap text-[#737373]">{dispatch.location || 'INDIA'}</div>
            </div>
          </div>
        )}

        {/* Dual-Column Reader: Sidebar & Prose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-6 items-start">
          {/* Left: Curatorial Dossier & Field Notes Sidebar (Clean - no weather card) */}
          <aside className="lg:col-span-4 space-y-6 font-mono text-xs border border-[#E5E5E5] p-5 sm:p-6 bg-[#FAFAFA] static lg:sticky lg:top-24">
            <div>
              <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-3 border-b border-[#E5E5E5] pb-2">
                DOSSIER SPECIFICATION
              </div>
              <div className="space-y-2 text-[11px] text-[#525252]">
                <div className="flex justify-between">
                  <span className="text-[#737373]">SERIES / DOSSIER:</span>
                  <span className="text-black font-semibold uppercase">{dispatch.dossierNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">LOCATION:</span>
                  <span className="text-black font-semibold uppercase">{dispatch.location || 'INDIA'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">CAMERA:</span>
                  <span className="text-black font-semibold uppercase">CANON EOS R10</span>
                </div>
                {dispatch.formatTag && (
                  <div className="flex justify-between">
                    <span className="text-[#737373]">FORMAT:</span>
                    <span className="text-black">{dispatch.formatTag}</span>
                  </div>
                )}
                {dispatch.publishedDate && (
                  <div className="flex justify-between">
                    <span className="text-[#737373]">DATE LOGGED:</span>
                    <span className="text-black">
                      {new Date(dispatch.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {dispatch.galleryPhotos && dispatch.galleryPhotos.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#737373]">PLATES INCLUDED:</span>
                    <span className="text-black font-semibold">{dispatch.galleryPhotos.length} IMAGES</span>
                  </div>
                )}
              </div>
            </div>

            {dispatch.locationalMemorandum && (
              <div className="border-t border-[#E5E5E5] pt-4">
                <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-2">
                  CURATORIAL NOTES
                </div>
                <p className="text-[10px] text-[#525252] leading-relaxed">
                  {dispatch.locationalMemorandum}
                </p>
              </div>
            )}

            <div className="border-t border-[#E5E5E5] pt-4">
              <button
                onClick={() => window.print()}
                className="w-full py-2 border border-black text-black font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <Printer className="w-3 h-3" />
                <span>PRINT STORY</span>
              </button>
            </div>
          </aside>

          {/* Right: Essay Markdown Content & Multiple Gallery Plates */}
          <div className="lg:col-span-8 space-y-8 font-mono text-sm leading-relaxed text-[#1F1F1F]">
            {(dispatch.contentMarkdown || '').split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight font-sans pt-6 border-b border-[#E5E5E5] pb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('```')) {
                const codeContent = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                return (
                  <pre key={index} className="p-4 bg-[#0A0A0A] text-white text-xs font-mono border-l-2 border-neutral-400 overflow-x-auto whitespace-pre-wrap">
                    {codeContent}
                  </pre>
                );
              }
              return (
                <p key={index} className={index === 0 ? 'dropcap' : ''}>
                  {paragraph}
                </p>
              );
            })}

            {/* Multiple Gallery Photos / Photo Essay Series Plates */}
            {dispatch.galleryPhotos && dispatch.galleryPhotos.length > 0 && (
              <div className="mt-12 sm:mt-16 space-y-8 pt-8 border-t border-black">
                <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#E5E5E5]">
                  <div className="font-bold text-black uppercase tracking-wider">
                    PHOTO ESSAY PLATES ({dispatch.galleryPhotos.length})
                  </div>
                  <div className="text-[#737373] text-[10px] tracking-widest uppercase">
                    FIELD DOCUMENTATION // CANON EOS R10
                  </div>
                </div>

                <div className="space-y-10">
                  {dispatch.galleryPhotos.map((photo, pIdx) => (
                    <figure key={pIdx} className="border border-[#E5E5E5] bg-white">
                      <div className="p-3 sm:p-6 bg-[#FAFAFA] flex items-center justify-center min-h-[280px] max-h-[680px] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.imageUrl}
                          alt={photo.caption || photo.title || `Photo plate ${pIdx + 1}`}
                          className="max-h-[620px] w-auto max-w-full object-contain mx-auto"
                        />
                      </div>
                      <figcaption className="p-3 sm:px-5 sm:py-3 bg-white border-t border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between font-mono text-[10px] sm:text-xs text-[#525252] gap-1">
                        <span className="font-bold text-black uppercase tracking-wider">
                          PLATE {String(pIdx + 1).padStart(2, '0')}{photo.title ? ` // ${photo.title}` : ''}
                        </span>
                        {photo.caption && (
                          <span className="text-[#737373] tracking-wide">{photo.caption}</span>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Previous / Next Navigation */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-mono text-xs">
          {prevDispatch ? (
            <Link
              href={`/essays/${prevDispatch.slug}`}
              className="flex items-center space-x-2 text-black hover:opacity-75 uppercase tracking-wider py-1.5"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">PREV: {prevDispatch.title}</span>
            </Link>
          ) : (
            <span className="text-[#A3A3A3] uppercase tracking-wider py-1.5">FIRST STORY</span>
          )}

          {nextDispatch ? (
            <Link
              href={`/essays/${nextDispatch.slug}`}
              className="flex items-center justify-end space-x-2 text-black hover:opacity-75 uppercase tracking-wider text-right py-1.5"
            >
              <span className="truncate">NEXT: {nextDispatch.title}</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </Link>
          ) : (
            <span className="text-[#A3A3A3] uppercase tracking-wider text-right py-1.5">LATEST STORY</span>
          )}
        </div>
      </article>
    </div>
  );
}
