import { useLocale } from '@/lib/i18n';
import { Link as InertiaLink } from '@inertiajs/react';
import { type ComponentProps } from 'react';

export function Link({ href, ...props }: ComponentProps<typeof InertiaLink>) {
    const { href: localize } = useLocale();
    return <InertiaLink {...props} href={typeof href === 'string' ? localize(href) : href} />;
}
