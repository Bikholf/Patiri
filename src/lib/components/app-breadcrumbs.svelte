<script lang="ts">
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import { page } from "$app/stores";
    import * as m from "$paraglide/messages.js";

    interface BreadcrumbConfig {
        label?: string;
        translationKey?: string;
        href?: string;
    }

    // Funktion zum Generieren der Breadcrumbs basierend auf Route-Konfiguration
    function generateBreadcrumbs(
        pathname: string, 
        params: Record<string, string>,
        routeConfig: BreadcrumbConfig[]
    ) {
        const segments = pathname.split('/').filter(Boolean);
        const breadcrumbs: Array<{
            label: string;
            href: string;
            isLast: boolean;
        }> = [];

        // Home als erstes Breadcrumb
        breadcrumbs.push({
            label: m.breadcrumb_home() ? m.breadcrumb_home() : 'Home',
            href: '/',
            isLast: segments.length === 0
        });

        let currentPath = '';
        
        segments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const isLast = index === segments.length - 1;
            
            let label = segment;
            
            // Prüfe ob es Route-Konfiguration gibt
            const config = routeConfig[index];
            if (config) {
                if (config.translationKey && m[config.translationKey as keyof typeof m]) {
                    // Verwende Übersetzung
                    const translationFn = m[config.translationKey as keyof typeof m] as Function;
                    label = translationFn();
                } else if (config.label) {
                    // Verwende bereitgestelltes Label
                    label = config.label;
                }
            } else {
                // Fallback: Prüfe ob es ein Parameter ist
                const paramKey = Object.keys(params).find(key => params[key] === segment);
                if (paramKey) {
                    label = segment; // Verwende Parameter-Wert
                } else {
                    // Standard-Kapitalisierung
                    label = segment.charAt(0).toUpperCase() + segment.slice(1);
                }
            }

            breadcrumbs.push({
                label,
                href: currentPath,
                isLast
            });
        });

        return breadcrumbs;
    }

    // Hole Route-Konfiguration aus Page-Data
    $: routeConfig = $page.data.breadcrumbConfig || [];
    $: breadcrumbs = generateBreadcrumbs($page.url.pathname, $page.params, routeConfig);
</script>

<Breadcrumb.Root>
    <Breadcrumb.List>
        {#each breadcrumbs as breadcrumb, index}
            <Breadcrumb.Item>
                {#if breadcrumb.isLast}
                    <Breadcrumb.Page>{breadcrumb.label}</Breadcrumb.Page>
                {:else}
                    <Breadcrumb.Link href={breadcrumb.href}>{breadcrumb.label}</Breadcrumb.Link>
                {/if}
            </Breadcrumb.Item>
            {#if !breadcrumb.isLast}
                <Breadcrumb.Separator />
            {/if}
        {/each}
    </Breadcrumb.List>
</Breadcrumb.Root>