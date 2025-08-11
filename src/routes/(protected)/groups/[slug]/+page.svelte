<script lang="ts">
	import type { PageData } from './$types.js';

	export let data: PageData;
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>