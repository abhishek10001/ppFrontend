import { IPhoto, IDispatch } from './fallbackData';

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

async function fetchWithFallbackPort(endpoint: string, options?: RequestInit) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  try {
    const res = await fetch(`${API_BASE_URL}${cleanEndpoint}`, options);
    if (res.ok) return res;
    throw new Error(`HTTP error ${res.status}`);
  } catch (err) {
    // Try port 5001 if locally running on 5000
    if (API_BASE_URL.includes('localhost:5000')) {
      const altUrl = API_BASE_URL.replace('5000', '5001');
      try {
        const altRes = await fetch(`${altUrl}${cleanEndpoint}`, options);
        if (altRes.ok) return altRes;
      } catch (e) {
        // silent fallback
      }
    }
    throw err;
  }
}

export async function fetchSiteConfig() {
  try {
    const res = await fetchWithFallbackPort('/site-config', { cache: 'no-store' });
    const data = await res.json();
    return data.data;
  } catch (err) {
    return {
      websiteName: 'PIXEL PERFECT',
      photographerName: 'Abhishek Gangwar',
      photographerEmail: 'abhishek.work329@gmail.com',
      tagline: 'DOCUMENTARY STREET PHOTOGRAPHY & FIELD PROSE',
      operationalNodes: 'NEW DELHI / MUMBAI / GLOBAL',
      heroPlate: {
        plateNumber: 'PL. 01',
        title: '',
        location: '',
        specificLocation: '',
        year: new Date().getFullYear(),
        imageUrl: ''
      },
      aboutPhoto: {
        label: 'PLATE 01 / AUTOPORTRAIT',
        title: 'Abhishek Gangwar with Canon EOS R10',
        imageUrl: '',
        caption: 'NEW DELHI METROPOLITAN AREA - AMBIENT DAWN LIGHT',
        bio: 'Based between New Delhi and Mumbai. Documenting transient human moments, architectural tensions, and urban solitude strictly under ambient natural illumination across the Indian subcontinent since 2018. Photographed with the Canon EOS R10.'
      },
      contact: {
        directDesk: 'abhishek.work329@gmail.com',
        signal: '+91 98-PIXEL-PERFECT',
        fieldArchive: '@pixelperfect.raw'
      }
    };
  }
}

export async function fetchPhotos(params?: {
  page?: number;
  limit?: number;
  category?: string;
  city?: string;
  featured?: boolean;
  search?: string;
}): Promise<{ items: IPhoto[]; total: number; page: number; pages: number }> {
  try {
    const url = new URL(`${API_BASE_URL}/photos`);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          url.searchParams.append(key, String(val));
        }
      });
    }
    const queryStr = url.search;
    const res = await fetchWithFallbackPort(`/photos${queryStr}`, { cache: 'no-store' });
    const data = await res.json();
    return {
      items: data.data || [],
      total: data.pagination?.total || data.data?.length || 0,
      page: data.pagination?.page || 1,
      pages: data.pagination?.pages || 1,
    };
  } catch (err) {
    return {
      items: [],
      total: 0,
      page: 1,
      pages: 1
    };
  }
}

export async function fetchPhotoBySlug(slug: string): Promise<IPhoto | null> {
  try {
    const res = await fetchWithFallbackPort(`/photos/${slug}`, { cache: 'no-store' });
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}

export async function fetchDispatches(): Promise<IDispatch[]> {
  try {
    const res = await fetchWithFallbackPort(`/dispatches?published=true`, { cache: 'no-store' });
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    return [];
  }
}

export async function fetchDispatchBySlug(slug: string): Promise<IDispatch | null> {
  try {
    const res = await fetchWithFallbackPort(`/dispatches/${slug}`, { cache: 'no-store' });
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}

export async function submitInquiry(data: {
  fullName: string;
  email: string;
  classification: string;
  projectScope: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetchWithFallbackPort(`/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    return { success: true, message: json.message || 'Archival inquiry transmitted successfully.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Transmission failed.' };
  }
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetchWithFallbackPort(`/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const json = await res.json();
    return { success: true, message: json.message || 'Subscribed to Postal Dispatches.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Subscription failed.' };
  }
}

