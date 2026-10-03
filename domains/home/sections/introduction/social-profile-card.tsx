import { ArrowUpRight, Clock, Mail, MapPin } from 'lucide-react';

export type SocialProfile = {
  platform: 'github' | 'x' | 'cal' | 'email';
  name: string;
  username: string;
  bio: string;
  location?: string;
  avatar?: string;
  banner?: string;
  followers?: number;
  repositories?: number;
  duration?: string;
  actionLabel?: string;
  detailLabel?: string;
};

type SocialProfileCardProps = {
  profile: SocialProfile;
  href: string;
  id: string;
};

const numberFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
});

export function SocialProfileCard({ profile, id }: SocialProfileCardProps) {
  const isX = profile.platform === 'x';
  const isCal = profile.platform === 'cal';
  const isContact = isCal || profile.platform === 'email';

  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('');

  const avatar = profile.avatar ? (
    // biome-ignore lint/performance/noImgElement: remote profile avatar
    <img
      alt=""
      className={
        isX
          ? 'relative size-16 shrink-0 rounded-full border-4 border-surface bg-surface object-cover'
          : 'size-12 shrink-0 rounded-full border border-border object-cover'
      }
      height={isX ? 64 : 48}
      referrerPolicy="no-referrer"
      src={profile.avatar}
      width={isX ? 64 : 48}
    />
  ) : (
    <span
      aria-hidden="true"
      className={
        isX
          ? 'relative flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-surface bg-bg font-mono text-muted text-sm'
          : 'flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-muted text-sm'
      }
    >
      {initials}
    </span>
  );

  if (isContact) {
    return (
      <span
        id={id}
        className="block overflow-hidden rounded-2xl border border-border bg-surface p-5 text-left text-fg shadow-xl"
      >
        <span className="flex items-center justify-between">
          {isCal ? (
            <span className="font-semibold text-lg tracking-tight">
              Cal<span className="text-muted">.com</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Mail
                aria-hidden="true"
                className="size-4 text-red-500"
                strokeWidth={1.7}
              />

              <span className="font-medium text-sm">Gmail</span>
            </span>
          )}

          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 text-muted"
            strokeWidth={1.5}
          />
        </span>

        <span className="mt-5 flex items-center gap-3">
          {avatar}

          <span className="block min-w-0">
            <span className="block truncate font-medium text-sm">{profile.name}</span>

            {profile.actionLabel && (
              <span className="mt-1 block text-muted text-xs">{profile.actionLabel}</span>
            )}
          </span>
        </span>

        {profile.bio && (
          <span className="mt-4 block text-muted text-sm leading-relaxed">{profile.bio}</span>
        )}

        {isCal && profile.duration && (
          <span className="mt-4 flex items-center gap-2 border-border border-t pt-3 text-muted text-xs">
            <Clock
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.5}
            />

            {profile.duration}
          </span>
        )}
      </span>
    );
  }

  const identity = (
    <span className="block min-w-0">
      <span
        className={
          isX ? 'block font-semibold text-base leading-tight' : 'block truncate font-medium text-sm'
        }
      >
        {profile.name}
      </span>

      <span className="mt-1 block font-mono text-muted text-xs">
        {isX ? '@' : ''}
        {profile.username}
      </span>
    </span>
  );

  return (
    <span
      id={id}
      className="block overflow-hidden rounded-2xl border border-border bg-surface text-left text-fg shadow-xl"
    >
      {isX && (
        <span
          className="block aspect-3/1 border-border border-b bg-bg bg-center bg-cover"
          style={profile.banner ? { backgroundImage: `url("${profile.banner}")` } : undefined}
        />
      )}

      <span className="block px-5 pb-5">
        {isX ? (
          <>
            <span className="-mt-8 mb-3 block">{avatar}</span>
            {identity}
          </>
        ) : (
          <span className="flex items-center gap-3 pt-5">
            {avatar}
            {identity}
          </span>
        )}

        {profile.bio && (
          <span className="mt-4 block text-fg/80 text-sm leading-relaxed">{profile.bio}</span>
        )}

        {profile.location && (
          <span className="mt-3 flex items-center gap-1.5 text-muted text-xs">
            <MapPin
              aria-hidden="true"
              className="size-3.5 shrink-0"
            />

            {profile.location}
          </span>
        )}

        {!isX && (profile.repositories !== undefined || profile.followers !== undefined) && (
          <span className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-border border-t pt-3 text-muted text-xs">
            {profile.repositories !== undefined && (
              <span>
                <span className="font-medium text-fg">
                  {numberFormatter.format(profile.repositories)}
                </span>{' '}
                repositories
              </span>
            )}

            {profile.followers !== undefined && (
              <span>
                <span className="font-medium text-fg">
                  {numberFormatter.format(profile.followers)}
                </span>{' '}
                followers
              </span>
            )}
          </span>
        )}
      </span>
    </span>
  );
}
