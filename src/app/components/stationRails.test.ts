import { beforeEach, describe, expect, it } from 'vitest';
import { defaultStationRail, deleteStationRail, listingTimeRange, previewStationRail, readStationRails, saveStationRail, stationFixtures, stationRailSchema, stationRailStorageKey, validateStationRail } from './stationRails';

beforeEach(() => window.localStorage.clear());

describe('Station RailConfig contract', () => {
  it('accepts only station query filters, languages, sort keys, and generic behavior', () => {
    expect(stationRailSchema.safeParse({ ...defaultStationRail, railType: 'personalized' }).success).toBe(false);
    expect(stationRailSchema.safeParse({ ...defaultStationRail, sortKey: 'year' }).success).toBe(false);
    expect(stationRailSchema.safeParse({ ...defaultStationRail, contentQuery: { ...defaultStationRail.contentQuery, byLanguage: 'fr' } }).success).toBe(false);
    expect(stationRailSchema.safeParse({ ...defaultStationRail, contentQuery: { ...defaultStationRail.contentQuery, byTitle: 'Invalid program filter' } }).success).toBe(false);
    expect(stationRailSchema.safeParse({ ...defaultStationRail, contentQuery: { ...defaultStationRail.contentQuery, byLocationId: 'urn:theplatform:tv:ProgramAvailability/1' } }).success).toBe(false);
    for (const sortKey of ['channelNumber', 'title', 'callSign']) expect(stationRailSchema.safeParse({ ...defaultStationRail, sortKey }).success).toBe(true);
  });
  it('validates listing ranges in ISO-8601 and epoch seconds', () => {
    expect(listingTimeRange('2026-11-02T18:00:00Z~2026-11-02T19:00:00Z')).not.toBeNull();
    expect(listingTimeRange('100~200')).toEqual([100000, 200000]);
    for (const value of ['200~100', '100~100', '~200', 'abc~def', '2026-11-02~2026-11-03', '2026-02-30T12:00:00Z~2026-03-03T12:00:00Z']) expect(listingTimeRange(value)).toBeNull();
  });
  it('requires ChannelSchedule GUIDs, unique slots and available capacity', () => {
    const slot = { contentGuid: 'urn:theplatform:tv:ChannelSchedule/1', pinned: true };
    expect(validateStationRail({ ...defaultStationRail, slots: [slot] })).toBeUndefined();
    expect(validateStationRail({ ...defaultStationRail, slots: [{ ...slot, contentGuid: 'urn:theplatform:tv:ProgramAvailability/1' }] })).toBeTruthy();
    expect(validateStationRail({ ...defaultStationRail, slots: [slot, slot] })).toContain('once');
    expect(validateStationRail({ ...defaultStationRail, contentSlots: 0 })).toBeTruthy();
    expect(validateStationRail({ ...defaultStationRail, contentSlots: 1, slots: [slot, { ...slot, contentGuid: 'urn:theplatform:tv:ChannelSchedule/2' }] })).toContain('reducing');
  });
  it('persists updates and deletion without reseeding deleted rails', () => {
    saveStationRail({ ...defaultStationRail, name: 'Updated stations' });
    expect(readStationRails()[0].name).toBe('Updated stations');
    deleteStationRail(defaultStationRail.id);
    expect(readStationRails()).toEqual([]);
  });
  it('surfaces corrupt browser storage rather than reporting success', () => {
    window.localStorage.setItem(stationRailStorageKey, 'invalid');
    expect(() => readStationRails()).toThrow();
    expect(() => saveStationRail(defaultStationRail)).toThrow();
  });
});

describe('Station preview semantics', () => {
  const now = 1800000000000;
  const stations = stationFixtures(now);
  it('keeps multiple channels and channel-less stations without a location', () => {
    const results = previewStationRail(defaultStationRail, stations, now).filter(Boolean);
    expect(results).toHaveLength(5);
    expect(results.filter((station) => station?.callSign === 'WNEWS')).toHaveLength(2);
    expect(results.some((station) => !station?.channelNumber)).toBe(true);
  });
  it('matches location:any literally and allows an end-user location override', () => {
    const rail = { ...defaultStationRail, contentQuery: { ...defaultStationRail.contentQuery, byLocationId: 'urn:theplatform:tv:location:london' } };
    expect(previewStationRail(rail, stations, now).filter(Boolean)).toHaveLength(2);
    const results = previewStationRail(rail, stations, now, 'urn:theplatform:tv:location:any').filter(Boolean);
    expect(results).toHaveLength(2);
    expect(results.every((station) => station?.locationId.endsWith(':any'))).toBe(true);
    expect(rail.contentQuery.byLocationId).toContain('london');
  });
  it('excludes expired, unavailable, and inactive stations', () => {
    expect(previewStationRail(defaultStationRail, [
      { ...stations[0], expires: now - 1 },
      { ...stations[1], availableFrom: now + 1 },
      { ...stations[2], listings: [] },
      { ...stations[3], listings: [{ title: 'Past', start: now - 20, end: now - 1 }] },
    ], now).filter(Boolean)).toHaveLength(0);
  });
  it('applies all query criteria and preserves pinned manual selections', () => {
    const rail = { ...defaultStationRail, contentQuery: { ...defaultStationRail.contentQuery, byIsPayPerView: 'true' as const }, slots: [{ contentGuid: stations[0].contentGuid, pinned: true }] };
    const results = previewStationRail(rail, stations, now);
    expect(results[0]).toEqual(stations[0]);
    expect(results[1]).toEqual(stations[1]);
    expect(results.filter(Boolean)).toHaveLength(2);
  });
  it('keeps an unavailable pinned position empty instead of fabricating data', () => {
    const rail = { ...defaultStationRail, slots: [{ contentGuid: 'urn:theplatform:tv:ChannelSchedule/unknown', pinned: true }] };
    expect(previewStationRail(rail, stations, now)[0]).toBeUndefined();
  });
  it('applies language, HD and listing time together, and honors numeric channel sorting', () => {
    const rail = { ...defaultStationRail, contentQuery: { ...defaultStationRail.contentQuery, byLanguage: 'en' as const, byIsHD: 'true' as const, byListingTime: `${now / 1000}~${now / 1000 + 60}` } };
    expect(previewStationRail(rail, stations, now).filter(Boolean).map((station) => station?.channelNumber)).toEqual(['101', '105']);
    expect(previewStationRail({ ...rail, sortDirection: 'desc' }, stations, now).filter(Boolean).map((station) => station?.channelNumber)).toEqual(['105', '101']);
    expect(previewStationRail({ ...rail, contentQuery: { ...rail.contentQuery, byListingTime: '100~200' } }, stations, now).filter(Boolean)).toHaveLength(0);
  });
});
