import { z } from 'zod';

const uri = z.string().regex(/^[a-z][a-z0-9+.-]*:[^\s]+$/i, 'Enter an absolute URI.');
export const stationLocationUri = uri.refine((value) => /[:/]location[:/][^/?#\s]+$/i.test(value), 'Enter a Location URI.');
const optionalLocationUri = z.union([z.literal(''), stationLocationUri]);
export const stationRailSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, 'Enter a rail name.'),
  collection: z.string().min(1),
  contentSlots: z.number().int().positive(),
  disabled: z.boolean(),
  railEntityType: z.literal('Station'),
  railType: z.literal('generic'),
  contentQuery: z.object({
    byLocationId: optionalLocationUri,
    byLanguage: z.enum(['', 'en', 'us']),
    byIsHD: z.enum(['', 'true', 'false']),
    byIsPayPerView: z.enum(['', 'true', 'false']),
    byListingTime: z.string(),
  }).strict(),
  sortKey: z.enum(['channelNumber', 'title', 'callSign']),
  sortDirection: z.enum(['asc', 'desc']),
  slots: z.array(z.object({
    contentGuid: uri.refine((value) => /[:/]ChannelSchedule\/[^/?#\s]+$/i.test(value), 'Use a ChannelSchedule URI.'),
    pinned: z.boolean(),
  })),
});

export type StationRail = z.infer<typeof stationRailSchema>;
export const stationRailStorageKey = 'cvp-demo-station-rails-v1';
export const defaultStationRail: StationRail = {
  id: 'station-rail-demo', name: 'Featured stations', collection: 'Home', contentSlots: 10,
  disabled: false, railEntityType: 'Station', railType: 'generic',
  contentQuery: { byLocationId: '', byLanguage: '', byIsHD: '', byIsPayPerView: '', byListingTime: '' },
  sortKey: 'channelNumber', sortDirection: 'asc', slots: [],
};

export function listingTimeRange(value: string): [number, number] | null {
  const parts = value.split('~');
  if (parts.length !== 2 || parts.some((part) => !part)) return null;
  const times = parts.map((part) => /^\d+$/.test(part)
    ? Number(part) * 1000
    : z.iso.datetime({ offset: true }).safeParse(part).success ? Date.parse(part) : NaN);
  return times.every(Number.isFinite) && times[0] < times[1] ? [times[0], times[1]] : null;
}

export function validateStationRail(rail: StationRail): string | undefined {
  const result = stationRailSchema.safeParse(rail);
  if (!result.success) return result.error.issues[0].message;
  if (rail.contentQuery.byListingTime && !listingTimeRange(rail.contentQuery.byListingTime)) return 'Enter a listing range as start~end using ISO-8601 timestamps with time zones or epoch seconds. Start must precede end.';
  if (rail.slots.length > rail.contentSlots) return 'Remove manual stations before reducing the number of slots.';
  if (new Set(rail.slots.map((slot) => slot.contentGuid)).size !== rail.slots.length) return 'A station selection can only be added once.';
}

export function readStationRails(): StationRail[] {
  const stored = window.localStorage.getItem(stationRailStorageKey);
  return stored === null ? [structuredClone(defaultStationRail)] : z.array(stationRailSchema).parse(JSON.parse(stored));
}

export function saveStationRail(rail: StationRail) {
  const error = validateStationRail(rail);
  if (error) throw new Error(error);
  const rails = readStationRails();
  const existing = rails.find((item) => item.id === rail.id);
  if (existing && (existing.railEntityType !== rail.railEntityType || existing.railType !== rail.railType)) throw new Error('Rail entity type and rail behavior cannot change after creation.');
  window.localStorage.setItem(stationRailStorageKey, JSON.stringify([...rails.filter((item) => item.id !== rail.id), rail]));
}

export function deleteStationRail(id: string) {
  window.localStorage.setItem(stationRailStorageKey, JSON.stringify(readStationRails().filter((rail) => rail.id !== id)));
}

export interface StationPreview {
  contentGuid: string;
  title: string;
  callSign: string;
  channelNumber: string;
  locationId: string;
  language: 'en' | 'us';
  isHD: boolean;
  isPayPerView: boolean;
  availableFrom?: number;
  expires?: number;
  listings: { title: string; start: number; end: number }[];
}

export function stationFixtures(now = Date.now()): StationPreview[] {
  return [
    { title: 'World news', callSign: 'WNEWS', channelNumber: '101', locationId: 'urn:theplatform:tv:location:london', language: 'en', isHD: true, isPayPerView: false },
    { title: 'Sports network', callSign: 'SPORT', channelNumber: '202', locationId: 'urn:theplatform:tv:location:london', language: 'us', isHD: true, isPayPerView: true },
    { title: 'World news', callSign: 'WNEWS', channelNumber: '105', locationId: 'urn:theplatform:tv:location:any', language: 'en', isHD: true, isPayPerView: false },
    { title: 'Family entertainment', callSign: 'FAMILY', channelNumber: '303', locationId: 'urn:theplatform:tv:location:any', language: 'en', isHD: false, isPayPerView: false },
    { title: 'Independent station', callSign: 'INDIE', channelNumber: '', locationId: '', language: 'us', isHD: true, isPayPerView: false },
  ].map((station, index) => ({
    ...station, language: station.language === 'en' ? 'en' : 'us',
    contentGuid: `urn:theplatform:tv:ChannelSchedule/${index + 1}`,
    listings: [{ title: ['Newsroom live', 'Match day', 'Newsroom live', 'Family favourites', 'Independent cinema'][index], start: now - 1800000, end: now + 1800000 }],
  }));
}

export function previewStationRail(rail: StationRail, stations: StationPreview[], now = Date.now(), locationOverride = '') {
  const query = rail.contentQuery;
  const location = locationOverride || query.byLocationId;
  const range = query.byListingTime ? listingTimeRange(query.byListingTime) : null;
  const available = stations.filter((station) => (!station.expires || station.expires > now)
    && (!station.availableFrom || station.availableFrom <= now)
    && station.listings.some((listing) => listing.end > now)
    && (!location || station.locationId === location));
  const matches = available.filter((station) => (!query.byLanguage || station.language === query.byLanguage)
    && (!query.byIsHD || String(station.isHD) === query.byIsHD)
    && (!query.byIsPayPerView || String(station.isPayPerView) === query.byIsPayPerView)
    && (!range || station.listings.some((listing) => listing.start < range[1] && listing.end > range[0])));
  matches.sort((a, b) => a[rail.sortKey].localeCompare(b[rail.sortKey], undefined, { numeric: true }) * (rail.sortDirection === 'asc' ? 1 : -1));
  const manual = rail.slots.map((slot) => ({ slot, station: available.find((station) => station.contentGuid === slot.contentGuid) }));
  const automatic = matches.filter((station) => !rail.slots.some((slot) => slot.contentGuid === station.contentGuid));
  const result: (StationPreview | undefined)[] = Array.from({ length: rail.contentSlots });
  manual.forEach(({ slot, station }, index) => { if (slot.pinned) result[index] = station; });
  const queue = [...manual.filter(({ slot }) => !slot.pinned).flatMap(({ station }) => station ? [station] : []), ...automatic];
  return Array.from({ length: rail.contentSlots }, (_, index) => rail.slots[index]?.pinned ? result[index] : queue.shift());
}
