import { EZOIC_ENABLED } from '../config/site';

interface AdSlotProps {
  id: number;
  className?: string;
}

export function AdSlot({ id, className = '' }: AdSlotProps) {
  if (!EZOIC_ENABLED) return null;

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div id={`ezoic-pub-ad-placeholder-${id}`} />
    </div>
  );
}
