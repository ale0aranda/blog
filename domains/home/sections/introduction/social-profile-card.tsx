import { MapPin } from 'lucide-react';

export type SocialProfile = {
  platform: 'github' | 'x';
  name: string;
  username: string;
  bio: string;
  location?: string;
  avatar?: string;
  banner?: string;
  followers?: number;
  repositories?: number;
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
      AA
    </span>
  );

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
      className="block overflow-hidden rounded-2xl border border-border bg-surface text-left text-fg shadow-xl"
      id={id}
    >
      {isX && (
        <span
          className="block aspect-3/1 border-border border-b bg-bg bg-center bg-cover"
          style={
            profile.banner
              ? {
                  backgroundImage: `url("${profile.banner}")`
                }
              : undefined
          }
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
