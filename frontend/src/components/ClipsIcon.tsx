export default function ClipsIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M3 9h18M8 4l3 5M15 4l3 5" />
    <path d="m10 12 5 2.5-5 2.5v-5Z" strokeLinejoin="round" />
  </svg>;
}
