<script lang="ts" generics="TData extends { id: any }, TValue">
    import { type ColumnDef, getCoreRowModel } from "@tanstack/table-core";
    import {
        createSvelteTable,
        FlexRender,
    } from "$lib/components/ui/data-table/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import type { Group } from "$lib/interfaces/group.js";

    type DataTableProps<TData, TValue> = {
        columns: ColumnDef<TData, TValue>[];
        data: TData[];
        setGroup: (group: TData) => void; // <-- Typisiert
        selectedGroup?: TData;
    };

    let {
        data,
        columns,
        setGroup,
        selectedGroup,
    }: DataTableProps<TData, TValue> = $props();

    const table = createSvelteTable({
        get data() {
            return data;
        },
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
</script>

<div class="rounded-md border">
    <Table.Root>
        <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                <Table.Row>
                    {#each headerGroup.headers as header (header.id)}
                        <Table.Head colspan={header.colSpan}>
                            {#if !header.isPlaceholder}
                                <FlexRender
                                    content={header.column.columnDef.header}
                                    context={header.getContext()}
                                />
                            {/if}
                        </Table.Head>
                    {/each}
                </Table.Row>
            {/each}
        </Table.Header>
        <Table.Body>
            {#each table.getRowModel().rows as row (row.id)}
                <Table.Row
                    data-state={row.getIsSelected() && "selected"}
                    onclick={() => setGroup(row.original)}
                        class={`cursor-pointer transition-colors
        ${selectedGroup && selectedGroup.id === row.original.id 
            ? 'bg-[var(--color-neutral-800)]' 
            : 'hover:bg-[var(--color-neutral-900)]'
        }`}
                >
                    {#each row.getVisibleCells() as cell (cell.id)}
                        <Table.Cell>
                            <FlexRender
                                content={cell.column.columnDef.cell}
                                context={cell.getContext()}
                            />
                        </Table.Cell>
                    {/each}
                </Table.Row>
            {:else}
                <Table.Row>
                    <Table.Cell
                        colspan={columns.length}
                        class="h-24 text-center"
                    >
                        No results.
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>

<style>
    /* Standard Hintergrund */
    .table-row {
        transition: background 0.15s ease-in-out;
    }

    /* Hover-Effekt */
    .table-row:hover {
        background-color: var(--accent, #f5f5f5);
        cursor: pointer;
    }

    /* Ausgewählte Row */
    .table-row.selected {
        background-color: var(--muted, #e5e7eb); /* oder Tailwind-Klasse bg-gray-200 */
    }
</style>
