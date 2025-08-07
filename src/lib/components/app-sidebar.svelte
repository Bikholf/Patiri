<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import CalendarIcon from "@lucide/svelte/icons/calendar";
    import HouseIcon from "@lucide/svelte/icons/house";
    import InboxIcon from "@lucide/svelte/icons/inbox";
    import SearchIcon from "@lucide/svelte/icons/search";
    import SettingsIcon from "@lucide/svelte/icons/settings";
    import NavUser from "./app-navuser.svelte";
    import CompassIcon from "@lucide/svelte/icons/compass";
    import LoginIcon from "@lucide/svelte/icons/log-in";
    import Button from "./ui/button/button.svelte";
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import { setLocale, getLocale } from "$paraglide/runtime.js";
    import * as m from "$paraglide/messages.js";

    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";

    let { children } = $props();

    function setLang(newLang: "en" | "de") {
        setLocale(newLang);
    }

    function getLang(): string {
        return getLocale();
    }

    const items = [
        {
            title: "Start",
            url: "/",
            icon: CompassIcon,
        },
        {
            title: "Home",
            url: "/home",
            icon: HouseIcon,
        },
        {
            title: "Inbox",
            url: "#",
            icon: InboxIcon,
        },
        {
            title: "Calendar",
            url: "/calender",
            icon: CalendarIcon,
        },
        {
            title: "Search",
            url: "#",
            icon: SearchIcon,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: SettingsIcon,
        },
        {
            title: "Login",
            url: "/login",
            icon: LoginIcon,
        },
    ];
</script>

<Sidebar.Root collapsible="icon">
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each items as item (item.title)}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                    <a href={item.url} {...props}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
        <Sidebar.Group>
            <Sidebar.GroupLabel>Debug</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu class="flex flex-col">
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
                    <div>
                        <Button onclick={() => setLang("en")}>{m.ENGLISH()}</Button>
                        <Button onclick={() => setLang("de")}>{m.GERMAN()}</Button>
                    </div>
                    {getLang()}

                    <br />
                    {@render children?.()}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
        <NavUser />
    </Sidebar.Footer>
    <Sidebar.Rail />
</Sidebar.Root>
