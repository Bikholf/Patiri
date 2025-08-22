<script lang="ts">
    import "../app.css";
    import { page } from "$app/stores";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/app-sidebar.svelte";
    import AppBreadcrumbs from "$lib/components/app-breadcrumbs.svelte";
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
    import { setLocale, getLocale } from "../paraglide/runtime.js";
    import * as m from "$paraglide/messages.js";
    import { Separator } from "$lib/components/ui/separator/index.js";

    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";

    let { children } = $props();

    function setLang(newLang: "en" | "de") {
        setLocale(newLang);
    }
</script>

{#if ($page.url.pathname as string) !== "/login" && ($page.url.pathname as string) !== "/register"}
    <Sidebar.Provider>
        <AppSidebar />
        <main class="w-full">
            <div class="flex items-center gap-2 p-2">
                <Sidebar.Trigger  class="-ml-1 pl-2"  />
                <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
                <AppBreadcrumbs />
            </div>
            <Separator orientation="horizontal" class="mr-2 data-[orientation=vertical]:h-4" />
            <div class="w-full p-2">{@render children?.()}</div>
        </main>
    </Sidebar.Provider>
{:else}
    <div class="w-full m-4">{@render children?.()}</div>
{/if}
