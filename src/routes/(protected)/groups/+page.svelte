<script lang="ts">
    import { page } from "$app/state";
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    
    let { data } = $props();
    console.log("group data: ", data.userGroups)
</script>

<h1>Groups list</h1>
<DataTable data={data.userGroups.map(item => {
    const { group } = item;
    return {
        ...group,
        slug: group.slug ?? '',
        description: group.description ?? '',
        maxMembers: group.maxMembers ?? 0,
        createdAt: group.createdAt instanceof Date ? group.createdAt.toISOString() : group.createdAt,
        updatedAt: group.updatedAt instanceof Date ? group.updatedAt.toISOString() : group.updatedAt
    };
})} {columns} />