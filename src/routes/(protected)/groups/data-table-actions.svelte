<script lang="ts">
    import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { m } from "../../../paraglide/messages.js";
    import DeleteIcon from "@lucide/svelte/icons/trash-2";
    import EyeIcon from "@lucide/svelte/icons/eye";
    import LogOutIcon from "@lucide/svelte/icons/log-out";
    import EditGroupForm from "./edit-group-dialog.svelte";
    import SquarePenIcon from "@lucide/svelte/icons/square-pen";
    import DeleteGroupDialog from "./delete-group-dialog.svelte";

    let { groupData, groupForm } = $props();

    // The state for opening and closing the dialog
    let isEditOpen = $state(false);
    let isDeleteOpen = $state(false);

    function openEditDialog() {
        isEditOpen = true;
    }

    function openDeleteDialog() {
        isDeleteOpen = true;
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class="w-[32px]">
        {#snippet child({ props })}
            <Button
                {...props}
                variant="ghost"
                size="icon"
                class="relative size-8 p-0 cursor-pointer"
            >
                <span class="sr-only">Open menu</span>
                <EllipsisIcon />
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.Label>{m.actions()}</DropdownMenu.Label>
            <DropdownMenu.Item>
                <EyeIcon />{m.view()}
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={openEditDialog}>
                <SquarePenIcon />{m.edit()}
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item class="text-[var(--destructive)]" onclick={openDeleteDialog}>
            <DeleteIcon color="var(--destructive)" />{m.delete()}
        </DropdownMenu.Item>
        <DropdownMenu.Item class="text-[var(--destructive)]">
            <LogOutIcon color="var(--destructive)" />{m.leave_group()}
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>

<EditGroupForm {groupData} {groupForm} bind:isOpen={isEditOpen} />

<DeleteGroupDialog {groupData} {groupForm} bind:isOpen={isDeleteOpen} />