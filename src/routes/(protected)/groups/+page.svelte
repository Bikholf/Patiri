<script lang="ts">
    import { page } from "$app/state";
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { m } from "../../../paraglide/messages.js";

    let { data } = $props();
    console.log("group data: ", data.userGroups);
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>{m.groups()}</Card.Title>
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
