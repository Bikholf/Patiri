<script lang="ts">

    let { data } = $props();
    import { page } from "$app/state";

    console.log("group data: ", data.userGroups)
</script>

<h1>Groups list</h1>
<ul>
	{#each data.userGroups as group}
		<li>{group.group.name}</li>
	{/each}
</ul>