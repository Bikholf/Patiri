<script lang="ts">
    import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { m } from "../../../paraglide/messages.js";
    import DeleteIcon from "@lucide/svelte/icons/trash-2";
    import EyeIcon from "@lucide/svelte/icons/eye";
    import LogOutIcon from "@lucide/svelte/icons/log-out";
    import SquarePenIcon from "@lucide/svelte/icons/square-pen";
    import EditGroupDialog from "../../../lib/components/dialogs/edit-group-dialog.svelte";
    import DeleteGroupDialog from "../../../lib/components/dialogs/delete-group-dialog.svelte";
    import LeaveGroupDialog from "../../../lib/components/dialogs/leave-group-dialog.svelte";

    let { groupData, groupForm } = $props();

    // The state for opening and closing the dialog
    let isEditOpen = $state(false);
    let isDeleteOpen = $state(false);
    let isLeaveOpen = $state(false);

    function openEditDialog() {
        isEditOpen = true;
    }

    function openDeleteDialog() {
        isDeleteOpen = true;
    }

    function openLeaveDialog() {
        isLeaveOpen = true;
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <div class="flex">
                <div class="flex-1"></div>
                <Button
                    {...props}
                    variant="ghost"
                    size="icon"
                    class="relative size-8 p-0 cursor-pointer text-right"
                >
                    <span class="sr-only">Open menu</span>
                    <EllipsisIcon />
                </Button>
                <!-- <div class="flex-1"></div> -->
            </div>
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
            <DeleteIcon color="var(--destructive)" />
            <span class="text-[var(--destructive)]">{m.delete()}</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item class="text-[var(--destructive)]" onclick={openLeaveDialog}>
            <LogOutIcon color="var(--destructive)" />
            <span class="text-[var(--destructive)]">{m.leave_group()}</span>
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>

<EditGroupDialog {groupData} {groupForm} bind:isOpen={isEditOpen} />

<DeleteGroupDialog {groupData} {groupForm} bind:isOpen={isDeleteOpen} />

<LeaveGroupDialog {groupData} {groupForm} bind:isOpen={isLeaveOpen} />