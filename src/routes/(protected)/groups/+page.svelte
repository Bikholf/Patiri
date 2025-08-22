<script lang="ts">
    import { page } from "$app/state";
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as m from "$paraglide/messages.js";
    import type { Group } from "$lib/types.ts";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import AddIcon from "@lucide/svelte/icons/plus";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { superForm } from 'sveltekit-superforms';

    let { data } = $props();
    console.log("group data: ", data.userGroups);
    console.log("group form: ", data.groupForm);

    let selectedGroup: Group | null = null;
    const { form } = superForm(data.groupForm);
</script>

<div class="w-full flex gap-2">
    <Card.Root class="flex-1/2">
        <Card.Header class="flex items-center">
            <Card.Title>
                {m.groups()}
            </Card.Title>
            <span class="flex-1"></span>

            <Dialog.Root>
                <Dialog.Trigger class={buttonVariants({ variant: "secondary", size: "sm" })}
                    ><AddIcon />{m.create_group()}</Dialog.Trigger
                >
                <Dialog.Content class="sm:max-w-[425px]">
                    <Dialog.Header>
                        <Dialog.Title>{m.create_group()}</Dialog.Title>
                        <Dialog.Description>
                            {m.create_group_desc()}
                        </Dialog.Description>
                    </Dialog.Header>
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name" class="text-right">Name</Label>
                            <Input
                                id="name"
                                bind:value={$form.groupName}
                                class="col-span-3"
                            />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="username" class="text-right"
                                >Username</Label
                            >
                            <Input
                                id="username"
                                bind:value={$form.groupDescription}
                                class="col-span-3"
                            />
                        </div>
                    </div>
                    <Dialog.Footer>
                        <Button type="submit">Save changes</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>

        </Card.Header>
        <Card.Content>
            <DataTable
                data={data.userGroups.map((item) => {
                    const { group } = item;
                    return {
                        ...group,
                        actions: [],
                        slug: group.slug ?? "",
                        description: group.description ?? "",
                        maxMembers: group.maxMembers ?? 0,
                        createdAt:
                            group.createdAt instanceof Date
                                ? group.createdAt.toISOString()
                                : group.createdAt,
                        updatedAt:
                            group.updatedAt instanceof Date
                                ? group.updatedAt.toISOString()
                                : group.updatedAt,
                    };
                })}
                {columns}
            />
        </Card.Content>
    </Card.Root>
    <Card.Root class="flex-1/2">
        {#if selectedGroup}
            <Card.Header>
                <Card.Title>{m.groups()}</Card.Title>
            </Card.Header>
            <Card.Content></Card.Content>
        {:else}
            <div
                class="flex w-full h-full items-center justify-center text-(--muted-foreground)"
            >
                <h1>{m.no_group_chosen()}</h1>
            </div>
        {/if}
    </Card.Root>
</div>
