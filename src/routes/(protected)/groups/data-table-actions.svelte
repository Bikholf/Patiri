<script lang="ts">
    import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { m } from "../../../paraglide/messages.js";
    import DeleteIcon from "@lucide/svelte/icons/trash-2";
    import EyeIcon from "@lucide/svelte/icons/eye";
    import LogOutIcon from "@lucide/svelte/icons/log-out";
    

    let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <Button
                {...props}
                variant="ghost"
                size="icon"
                class="relative size-8 p-0"
            >
                <span class="sr-only">Open menu</span>
                <EllipsisIcon />
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.Label>{m.actions()}</DropdownMenu.Label>
            <DropdownMenu.Item><EyeIcon />{m.view()}</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item class="text-[var(--destructive)]">
            <DeleteIcon color="var(--destructive)"/>{m.delete()}</DropdownMenu.Item>
        <DropdownMenu.Item class="text-[var(--destructive)]">
            <LogOutIcon color="var(--destructive)"/>{m.leave_group()}</DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
