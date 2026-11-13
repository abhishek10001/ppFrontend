'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { IDispatch } from '@/lib/fallbackData';
import { fetchDispatches, subscribeNewsletter } from '@/lib/api';

export default function EssaysPage() {
  const [dispatches, setDispatches] = useState<IDispatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subMessage, setSubMessage] = useState('');

  useEffect(() => {
    fetchDispatches().then(items => {
      setDispatches(items || []);
      setLoading(false);
    });
  }, []);

  const leadDispatch = dispatches.length > 0 ? dispatches[0] : null;
  const chronologicalDispatches = dispatches.length > 1 ? dispatches.slice(1) : [];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubStatus('loading');
    const res = await subscribeNewsletter(email);
    if (res.success) {
      setSubStatus('success');
      setSubMessage(res.message);
      setEmail('');
    } else {
      setSubStatus('error');
      setSubMessage(res.message);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Journal Header */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
          <div className="space-y-3">
            <div className="mono-label text-[#737373]">
              FIELD JOURNAL & STORIES • ABHISHEK GANGWAR
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black uppercase font-sans">
              JOURNAL
            </h1>
            <p className="max-w-xl text-xs sm:text-sm text-[#525252] font-mono leading-relaxed">
              Documenting places, daily street life, and what it felt like in the moment. Photographed on Canon EOS R10 across Indian cities.
            </p>
          </div>
          <div className="text-[10px] font-mono text-[#737373] tracking-widest uppercase">
            {dispatches.length} STORIES PUBLISHED
          </div>
        </div>

        {/* 2. Lead Story Showcase Card (if exists) */}
        {leadDispatch && (
          <div className="mt-8 border border-black bg-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Left Column: Story Text & Metadata */}
            <div className="lg:col-span-6 p-5 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-[#E5E5E5]">
              <div className="space-y-3 sm:space-y-4">
                <div className="mono-label text-black font-bold text-[9px] sm:text-[11px]">
                  ■ FEATURED STORY
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black uppercase tracking-tight font-sans leading-tight break-words">
                  {leadDispatch.title}
                </h2>

                <div className="font-mono text-[9px] sm:text-[10px] text-[#737373] tracking-widest uppercase">
                  {leadDispatch.publishedDate ? new Date(leadDispatch.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''} {leadDispatch.readTimeMinutes ? `• ${leadDispatch.readTimeMinutes} MIN READ` : ''} {leadDispatch.plateCount ? `• ${leadDispatch.plateCount} PHOTOS` : ''}
                </div>

                <p className="font-mono text-xs sm:text-sm text-[#333333] leading-relaxed">
                  {leadDispatch.abstract}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#737373] tracking-wider uppercase">
                  <span className="text-black font-semibold">CANON EOS R10</span> • {leadDispatch.location || 'INDIA'}
                </div>

                <Link
                  href={`/essays/${leadDispatch.slug}`}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-black text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors w-full sm:w-auto text-center"
                >
                  <span>READ FULL STORY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Uncropped / Clean Image Container */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-[#FAFAFA] text-black">
              {leadDispatch.leadCoverPhotoUrl ? (
                <div className="relative p-4 sm:p-6 flex items-center justify-center min-h-[240px] sm:min-h-[340px] lg:h-full bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leadDispatch.leadCoverPhotoUrl}
                    alt={leadDispatch.title}
                    className="max-h-[380px] w-auto max-w-full object-contain"
                  />
                </div>
              ) : (
                <div className="p-8 sm:p-12 flex items-center justify-center min-h-[220px] sm:min-h-[300px] text-center font-mono text-xs text-[#737373]">
                  COVER PHOTOGRAPH
                </div>
              )}
              <div className="p-3 sm:p-3.5 bg-[#F4F4F4] border-t border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#525252] tracking-widest uppercase gap-1">
                <div className="truncate">{leadDispatch.title}</div>
                <div className="whitespace-nowrap text-[#737373]">{leadDispatch.location || 'FIELD LOG'}</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. Chronological Stories Register */}
      {chronologicalDispatches.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14">
          <div className="border-b border-black pb-3 mb-6 flex items-center justify-between font-mono text-xs tracking-wider">
            <div className="font-bold text-black uppercase">ALL STORIES & NOTES</div>
            <div className="text-[#737373] text-[10px] tracking-widest uppercase">CHRONOLOGICAL</div>
          </div>

          <div className="divide-y divide-[#E5E5E5] border-b border-[#E5E5E5]">
            {chronologicalDispatches.map((dispatch, idx) => {
              const formattedIdx = String(idx + 1).padStart(2, '0') + '.';
              return (
                <div
                  key={dispatch.slug}
                  className="py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#FAFAFA] px-2 transition-colors group"
                >
                  <div className="flex items-start md:items-center space-x-4 sm:space-x-8">
                    <span className="font-mono text-xs font-bold text-[#737373] group-hover:text-black">
                      {formattedIdx}
                    </span>

                    <div className="space-y-1">
                      <Link
                        href={`/essays/${dispatch.slug}`}
                        className="font-bold text-sm sm:text-base text-black uppercase font-sans group-hover:underline"
                      >
                        {dispatch.title}
                      </Link>
                      <div className="font-mono text-[10px] text-[#737373] tracking-wider uppercase flex flex-wrap gap-x-3">
                        <span>{dispatch.location}</span>
                        {dispatch.publishedDate && (
                          <>
                            <span>•</span>
                            <span>{new Date(dispatch.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                          </>
                        )}
                        {dispatch.plateCount > 0 && (
                          <>
                            <span>•</span>
                            <span>{dispatch.plateCount} PHOTOS</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
                    {dispatch.leadCoverPhotoUrl && (
                      <div className="w-16 h-12 bg-white border border-[#E5E5E5] p-1 overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={dispatch.leadCoverPhotoUrl}
                          alt={dispatch.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <Link
                      href={`/essays/${dispatch.slug}`}
                      className="font-mono text-[11px] font-bold text-black flex items-center space-x-1 hover:opacity-70 uppercase tracking-widest whitespace-nowrap"
                    >
                      <span>READ STORY</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty State when no stories exist */}
      {!loading && dispatches.length === 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
          <div className="border border-dashed border-[#CCCCCC] p-12 sm:p-16 text-center">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-black">
              NO JOURNAL STORIES REGISTERED YET
            </p>
            <p className="font-mono text-xs text-[#737373] mt-2 max-w-md mx-auto">
              Write and publish field notes and journal stories from the admin dashboard to showcase your work here.
            </p>
          </div>
        </section>
      )}

      {/* 4. Subscribe to Field Journal */}
      <section className="bg-[#F8F8F8] border-t border-[#E5E5E5] py-14 px-4 sm:px-8 mt-10">
        <div className="max-w-[1100px] mx-auto space-y-6">
          <div className="mono-label text-[#737373]">
            STAY UPDATED // FIELD NOTES
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight font-sans">
            RECEIVE FIELD NOTES BY EMAIL
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#525252] max-w-xl leading-relaxed">
            New visual journals, street notes, and photographs directly in your inbox. No spam.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-xl pt-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="YOUR.EMAIL@DOMAIN.COM"
              required
              className="flex-1 bg-white border border-black px-4 py-3 font-mono text-xs text-black placeholder:text-[#A3A3A3] focus:outline-none"
            />
            <button
              type="submit"
              disabled={subStatus === 'loading'}
              className="bg-black text-white px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              {subStatus === 'loading' ? (
                <span>SAVING...</span>
              ) : subStatus === 'success' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>SUBSCRIBED</span>
                </>
              ) : (
                <span>SUBSCRIBE</span>
              )}
            </button>
          </form>

          {subMessage && (
            <p className={`font-mono text-xs ${subStatus === 'success' ? 'text-black font-semibold' : 'text-red-600'}`}>
              {subMessage}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
