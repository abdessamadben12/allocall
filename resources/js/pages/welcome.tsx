import App from '@/components/pages/app';
import SeoHead from '@/components/seo-head';

export default function Welcome() {
    return (
        <>
            <SeoHead />
            <div>
                <App />
            </div>
        </>
    );
}
