export function normalizeCollege(item) {
  return {
    id: item.id?.toString() || '',
    name: item.school?.name || '정보 없음',
    city: item.school?.city || '',
    state: item.school?.state || '',
    url: item.school?.school_url || '',
  };
}
