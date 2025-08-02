<script lang="ts">
    import "../app.css";
    import { page } from "$app/stores";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/app-sidebar.svelte";
    import AppBreadcrumbs from "$lib/components/app-breadcrumbs.svelte";
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
    import { setLocale, getLocale } from "../paraglide/runtime.js";
    import * as m from "../paraglide/messages.js";

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
        <main>
            <Sidebar.Trigger />
            <AppBreadcrumbs />
            <Button onclick={toggleMode} variant="outline" size="icon">
                <SunIcon
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
                />
                <MoonIcon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
            <ModeWatcher />
            {@render children?.()}
        </main>
    </Sidebar.Provider>
{:else}
    <Button onclick={toggleMode} variant="outline" size="icon">
        <SunIcon
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
        />
        <MoonIcon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
    </Button>
    <ModeWatcher />
    <Button onclick={() => setLang("en")}>{m.ENGLISH()}</Button>
    <Button onclick={() => setLang("de")}>{m.GERMAN()}</Button>
    <p>Current locale: {getLocale()}</p>
    {@render children?.()}
{/if}
