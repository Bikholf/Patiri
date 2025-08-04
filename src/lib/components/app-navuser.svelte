<script lang="ts">
    import { page } from "$app/state";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { useSidebar } from "$lib/components/ui/sidebar/index.js";
    import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
    import BellIcon from "@lucide/svelte/icons/bell";
    import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
    import CreditCardIcon from "@lucide/svelte/icons/credit-card";
    import LogOutIcon from "@lucide/svelte/icons/log-out";
    import SparklesIcon from "@lucide/svelte/icons/sparkles";
    import { SignOut } from "@auth/sveltekit/components";
    import { Button } from "$lib/components/ui/button/index.js";
    import { signOut } from "@auth/sveltekit/client";

    const sidebar = useSidebar();
</script>

<Sidebar.Menu>
    <Sidebar.MenuItem>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    {#if page.data.session}
                        <Sidebar.MenuButton
                            size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            {...props}
                        >
                            {#if page.data.session.user?.image}
                                <Avatar.Root class="size-8 rounded-lg">
                                    <Avatar.Image
                                        src={page.data.session.user?.image}
                                        alt="User profile picture"
                                    />
                                    <Avatar.Fallback class="rounded-lg"
                                        >CN</Avatar.Fallback
                                    >
                                </Avatar.Root>
                            {/if}
                            <div
                                class="grid flex-1 text-left text-sm leading-tight"
                            >
                                <span class="truncate font-medium">
                                    {page.data.session.user?.name}
                                </span>
                                <span class="truncate text-xs">
                                    {page.data.session.user?.email}
                                </span>
                            </div>
                            <ChevronsUpDownIcon class="ml-auto size-4" />
                        </Sidebar.MenuButton>
                    {:else}
                        <h3>You are not logged in!</h3>
                    {/if}
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
                side={sidebar.isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenu.Label class="p-0 font-normal">
                    {#if page.data.session}
                        <div
                            class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                        >
                            {#if page.data.session.user?.image}
                                <Avatar.Root class="size-8 rounded-lg">
                                    <Avatar.Image
                                        src={page.data.session.user?.image}
                                        alt="User profile picture"
                                    />
                                    <Avatar.Fallback class="rounded-lg"
                                        >CN</Avatar.Fallback
                                    >
                                </Avatar.Root>
                            {/if}
                            <div
                                class="grid flex-1 text-left text-sm leading-tight"
                            >
                                <span class="truncate font-medium"
                                    >{page.data.session.user?.name}</span
                                >
                                <span class="truncate text-xs"
                                    >{page.data.session.user?.email}</span
                                >
                            </div>
                        </div>
                    {:else}
                        <h3>You are not logged in!</h3>
                    {/if}
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                    <DropdownMenu.Item>
                        <SparklesIcon />
                        Upgrade to Pro
                    </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                    <DropdownMenu.Item>
                        <BadgeCheckIcon />
                        Account
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        <CreditCardIcon />
                        Billing
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        <BellIcon />
                        Notifications
                    </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onclick={() => signOut()}>
                    <LogOutIcon />
                    <span>Log out</span>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Sidebar.MenuItem>
</Sidebar.Menu>
