'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { submitInquiry, fetchSiteConfig } from '@/lib/api';

type InquiryClass = 'PRINT ACQUISITION' | 'EDITORIAL ASSIGNMENT' | 'GENERAL ARCHIVAL';

export default function AboutPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [classification, setClassification] = useState<InquiryClass>('PRINT ACQUISITION');
  const [projectScope, setProjectScope] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [siteConfig, setSiteConfig] = useState<any>(null);

  useEffect(() => {
    fetchSiteConfig().then(cfg => {
      if (cfg) setSiteConfig(cfg);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !projectScope) return;

    setFormStatus('submitting');
    const result = await submitInquiry({
      fullName,
      email,
      classification,
      projectScope
    });

    if (result.success) {
      setFormStatus('success');
      setStatusMessage(result.message);
      setFullName('');
      setEmail('');
      setProjectScope('');
    } else {
      setFormStatus('error');
      setStatusMessage(result.message);
    }
  };

  const aboutPhoto = siteConfig?.aboutPhoto || {
    label: 'PLATE 01 / AUTOPORTRAIT',
    title: 'Abhishek Gangwar with Canon EOS R10',
    imageUrl: '',
    caption: 'NEW DELHI METROPOLITAN AREA - AMBIENT DAWN LIGHT',
    bio: 'Based between New Delhi and Pune. I love to Show how I Connect with the Streets, People and the environment around me.'
  };

  const photographerName = siteConfig?.photographerName || 'Abhishek Gangwar';
  const directDeskEmail = siteConfig?.contact?.directDesk || 'abhishek.work329@gmail.com';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Provenance, Autoportrait, Philosophy */}
          <div className="lg:col-span-7 space-y-10 sm:space-y-12">
            {/* Bio Narrative */}
            <div className="space-y-3 sm:space-y-4">
              <div className="mono-label text-[#737373] text-[9px] sm:text-[11px]">
                PROVENANCE & ETHOS // {photographerName.toUpperCase()}
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-tight uppercase font-sans">
                ABOUT & ETHOS
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[#404040] leading-relaxed max-w-2xl">
                {aboutPhoto.bio || 'Based between New Delhi and Pune. I love to Show how I Connect with the Streets, People and the environment around me.'}
              </p>
            </div>

            {/* Self-Portrait Plate Container (Uncropped with white matting) */}
            {aboutPhoto.imageUrl ? (
              <div className="border border-[#E5E5E5] bg-white">
                <div className="relative p-2.5 sm:p-6 bg-white aspect-[4/5] max-h-[580px] flex items-center justify-center overflow-hidden">
                  <div className="absolute top-2.5 left-2.5 z-10 px-2 sm:px-2.5 py-1 bg-black text-white font-mono text-[8px] sm:text-[9px] tracking-widest uppercase">
                    {aboutPhoto.label || 'PLATE 01 / AUTOPORTRAIT'}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={aboutPhoto.imageUrl}
                    alt={aboutPhoto.title || photographerName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="border-t border-[#E5E5E5] px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-[9px] sm:text-[10px] text-[#737373] flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <span className="uppercase truncate">{aboutPhoto.caption || 'NEW DELHI METROPOLITAN AREA - AMBIENT DAWN LIGHT'}</span>
                  <span className="uppercase text-[9px] text-[#A3A3A3] whitespace-nowrap">CANON EOS R10</span>
                </div>
              </div>
            ) : (
              <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 sm:p-8 aspect-[16/9] flex flex-col items-center justify-center text-center space-y-2">
                <span className="font-mono text-xs text-black font-bold uppercase tracking-wider">PIXEL PERFECT / {photographerName.toUpperCase()}</span>
                <span className="font-mono text-[11px] text-[#737373]">DOCUMENTARY STREET PHOTOGRAPHY // CANON EOS R10</span>
              </div>
            )}

            {/* Operational Philosophy Grid (Responsive 3 Cards) */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center font-mono text-xs border-b border-[#E5E5E5] pb-2">
                <span className="font-bold text-black uppercase">WORKING PHILOSOPHY</span>
                <span className="text-[10px] text-[#737373] tracking-widest uppercase">FIELD ETHOS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-[#E5E5E5] p-4 sm:p-5 bg-white space-y-2">
                  <div className="font-mono text-xs font-bold text-black">
                    01.<br />ZERO STAGING
                  </div>
                  <p className="font-mono text-[11px] text-[#525252] leading-relaxed">
                    Unposed, authentic street reality. Documenting raw human moments as they happen without direction.
                  </p>
                </div>

                <div className="border border-[#E5E5E5] p-4 sm:p-5 bg-white space-y-2">
                  <div className="font-mono text-xs font-bold text-black">
                    02.<br />AVAILABLE LIGHT
                  </div>
                  <p className="font-mono text-[11px] text-[#525252] leading-relaxed">
                    Strict reliance on ambient illumination—monsoon clouds, morning haze, neon reflections, and harsh midday sun.
                  </p>
                </div>

                <div className="border border-[#E5E5E5] p-4 sm:p-5 bg-white space-y-2">
                  <div className="font-mono text-xs font-bold text-black">
                    03.<br />DOCUMENTARY HONESTY
                  </div>
                  <p className="font-mono text-[11px] text-[#525252] leading-relaxed">
                    Honoring the genuine atmosphere, geometry, and spirit of Indian cities without synthetic manipulation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Acquisitions & Inquiries Desk */}
          <div className="lg:col-span-5 space-y-8" id="inquiries">
            <div className="border border-black p-5 sm:p-8 bg-white space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <div className="mono-label text-[#737373] text-[9px] sm:text-[11px]">
                  GET IN TOUCH
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-black uppercase font-sans tracking-tight">
                  WORK INQUIRIES & PRINTS
                </h2>
                <p className="font-mono text-xs text-[#525252] leading-relaxed">
                  Inquiries regarding limited edition prints, documentary assignments, or photo projects across India and worldwide.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] text-black font-bold uppercase tracking-wider block">
                    FULL NAME / INSTITUTIONAL TITLE *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Verma, Art Curator"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] text-black focus:outline-none focus:border-black text-xs font-mono"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[10px] text-black font-bold uppercase tracking-wider block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correspondence@domain.in"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] text-black focus:outline-none focus:border-black text-xs font-mono"
                  />
                </div>

                {/* Classification Toggle: 1-col on mobile, 3-col on tablet/desktop */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] text-black font-bold uppercase tracking-wider block">
                    INQUIRY CLASSIFICATION
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 border border-black divide-y sm:divide-y-0 sm:divide-x divide-black text-[9px] sm:text-[10px] text-center font-bold">
                    {(['PRINT ACQUISITION', 'EDITORIAL ASSIGNMENT', 'GENERAL ARCHIVAL'] as InquiryClass[]).map((cls) => (
                      <button
                        type="button"
                        key={cls}
                        onClick={() => setClassification(cls)}
                        className={`py-2.5 sm:py-2 px-2 tracking-wider uppercase transition-colors ${classification === cls ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#F4F4F4]'
                          }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Scope / Details */}
                <div className="space-y-1 pt-1">
                  <label className="text-[10px] text-black font-bold uppercase tracking-wider block">
                    PROJECT SCOPE / TECHNICAL DIMENSIONS *
                  </label>
                  <textarea
                    rows={4}
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    placeholder="Specify preferred print edition, print dimensions, publication calendar, or location specs..."
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] text-black focus:outline-none focus:border-black resize-none text-xs font-mono"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3.5 bg-black text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{formStatus === 'submitting' ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {formStatus === 'success' && (
                <div className="flex items-start space-x-2 p-3 bg-emerald-50 border border-emerald-400 font-mono text-xs text-emerald-900">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-400 font-mono text-xs text-red-900">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Direct Channels */}
              <div className="border-t border-[#E5E5E5] pt-5 space-y-2 font-mono text-[10px] text-[#737373]">
                <div className="font-bold text-black uppercase tracking-wider">
                  DIRECT DESK
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                  <span>EMAIL:</span>
                  <a href={`mailto:${directDeskEmail}`} className="text-black font-semibold hover:underline break-all">{directDeskEmail}</a>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                  <span>SIGNAL / SECURE:</span>
                  <span className="text-black font-semibold">+91 6398937329</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
