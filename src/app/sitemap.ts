import { MetadataRoute } from 'next';
import { ServerGet } from '@/services/serverApi';
import { endpoints } from '@/services/endPoints';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${baseUrl}`, priority: 1.0, changeFrequency: 'daily' },
        { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'weekly' },
        { url: `${baseUrl}/faq`, priority: 0.8, changeFrequency: 'weekly' },
        { url: `${baseUrl}/list-your-space`, priority: 0.8, changeFrequency: 'weekly' },
        { url: `${baseUrl}/contact-us`, priority: 0.7, changeFrequency: 'monthly' },
        { url: `${baseUrl}/blogs`, priority: 0.7, changeFrequency: 'daily' },
        { url: `${baseUrl}/articles/guests`, priority: 0.7, changeFrequency: 'weekly' },
        { url: `${baseUrl}/articles/hosts`, priority: 0.7, changeFrequency: 'weekly' },
        { url: `${baseUrl}/privacy`, priority: 0.5, changeFrequency: 'yearly' },
        { url: `${baseUrl}/terms`, priority: 0.5, changeFrequency: 'yearly' },
        { url: `${baseUrl}/cancellationPolicy`, priority: 0.5, changeFrequency: 'yearly' },
        { url: `${baseUrl}/proudly-not-ai`, priority: 0.5, changeFrequency: 'yearly' },
    ];

    let dynamicRoutes: MetadataRoute.Sitemap = [];

    // Fetch Spaces
    try {
        const spacesRes: any = await ServerGet(endpoints.GUEST_SPACE_LIST + '?limit=50000');
        const spaces = spacesRes?.data?.records || [];
        
        const spaceRoutes: MetadataRoute.Sitemap = spaces.map((space: any) => ({
            url: `${baseUrl}/space-details/${space.slug || space.id}`,
            lastModified: space.updatedAt || new Date().toISOString(),
            priority: 0.9,
            changeFrequency: 'daily',
        }));
        
        dynamicRoutes = [...dynamicRoutes, ...spaceRoutes];
    } catch (error) {
        console.error('Sitemap: Error fetching spaces', error);
    }

    // Fetch Blogs
    try {
        const blogsRes: any = await ServerGet(endpoints.GET_BLOGS + '?limit=50000');
        const blogs = blogsRes?.data?.records || blogsRes?.data || [];
        
        const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
            url: `${baseUrl}/blogs/${blog.slug}`,
            lastModified: blog.updatedAt || new Date().toISOString(),
            priority: 0.8,
            changeFrequency: 'weekly',
        }));
        
        dynamicRoutes = [...dynamicRoutes, ...blogRoutes];
    } catch (error) {
        console.error('Sitemap: Error fetching blogs', error);
    }

    // Fetch Articles (Guest & Host)
    const fetchArticlesForSection = async (articleType: string, sectionPath: string) => {
        try {
            const articlesRes: any = await ServerGet(endpoints.GET_ARTICLES(articleType));
            const categories = articlesRes?.category || [];
            
            const articleRoutes: MetadataRoute.Sitemap = [];
            
            categories.forEach((cat: any) => {
                if (cat.articles && Array.isArray(cat.articles)) {
                    cat.articles.forEach((art: any) => {
                        articleRoutes.push({
                            url: `${baseUrl}/articles/${sectionPath}/${art.slug}`,
                            lastModified: art.updated_at || new Date().toISOString(),
                            priority: 0.7,
                            changeFrequency: 'weekly',
                        });
                    });
                }
            });
            
            return articleRoutes;
        } catch (error) {
            console.error(`Sitemap: Error fetching ${articleType} articles`, error);
            return [];
        }
    };

    const guestArticleRoutes = await fetchArticlesForSection('guest', 'guests');
    const hostArticleRoutes = await fetchArticlesForSection('host', 'hosts');
    
    dynamicRoutes = [...dynamicRoutes, ...guestArticleRoutes, ...hostArticleRoutes];

    return [...staticRoutes, ...dynamicRoutes];
}
