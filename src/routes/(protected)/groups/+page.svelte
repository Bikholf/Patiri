<script lang="ts">

    let { data } = $props();
    import { page } from "$app/state";

    console.log("group data: ", data.userGroups)
</script>

<h1>{data.userGroups[0].group.name}</h1>
