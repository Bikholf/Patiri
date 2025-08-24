<script lang="ts">
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as m from "$paraglide/messages.js";
    import type { Group } from "$lib/interfaces/group.js";
    import CreateGroupForm from "./create-group-dialog.svelte";
    import { superForm } from "sveltekit-superforms";
    import * as Resizable from "$lib/components/ui/resizable/index.js";

    let { data } = $props();
    console.log("group data: ", data.userGroups);
    console.log("group form: ", data.groupForm);

    let selectedGroup: Group | null = $state(null);

    const createGroupForm = superForm(data.groupForm);

    function setGroup(newSelectedGroup: any) {
        console.log("Selected group: ", newSelectedGroup);
        selectedGroup = newSelectedGroup;
    }
</script>

<Resizable.PaneGroup direction="horizontal" class="w-full flex gap-2">
    <Resizable.Pane defaultSize={50}>
        <Card.Root class="flex-1/2">
            <Card.Header class="flex items-center">
                <Card.Title>
                    {m.groups()}
                </Card.Title>
                <span class="flex-1"></span>

                <CreateGroupForm {data} />
                <!-- <SuperDebug data={$formData} /> -->
            </Card.Header>
            <Card.Content>
                <DataTable
                    data={data.userGroups.map((item: { group: any }) => {
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
                    columns={columns(createGroupForm as any)}
                    {setGroup}
                    {selectedGroup}
                />
            </Card.Content>
        </Card.Root>
    </Resizable.Pane>
    <Resizable.Handle />
    <Resizable.Pane defaultSize={50}>
        <Card.Root class="flex-1/2">
            {#if selectedGroup}
                <Card.Header>
                    <Card.Title>{selectedGroup.name}</Card.Title>
                    <Card.Description>
                        {selectedGroup.description}
                    </Card.Description>
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
    </Resizable.Pane>
</Resizable.PaneGroup>
