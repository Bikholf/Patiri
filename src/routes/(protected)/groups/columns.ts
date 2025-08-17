import { renderComponent, renderSnippet } from "$lib/components/ui/data-table/index.js";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { getLocale } from "$paraglide/runtime.js";
import DataTableActions from "./data-table-actions.svelte";
import { m } from "../../../paraglide/messages.js";

export type Group = {
    id: string;
    name: string,
    slug: string,
    description: string,
    maxMembers: number,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
    actions: any
};

export const columns: ColumnDef<Group>[] = [
    {
        accessorKey: "name",
        header: () => {
            const amountHeaderSnippet = createRawSnippet(() => ({
                render: () => `<div>Name</div>`,
            }));
            return renderSnippet(amountHeaderSnippet, "");
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "creator.name",
        header: "Created By",
    },
    {
        accessorKey: "createdAt",
        header: () => {
            const dateHeaderSnippet = createRawSnippet(() => ({
                render: () => `<div class="text-right">Created At</div>`,
            }));
            return renderSnippet(dateHeaderSnippet, "");
        },
        cell: ({ row }) => {
            const localeFormat = getLocale() == 'de' ? 'de-DE' : 'en-US'

            const formatter = new Intl.DateTimeFormat(localeFormat, {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "2-digit"
            });

            const amountCellSnippet = createRawSnippet<[string]>((getFormatted) => {
                const formattedDate = getFormatted();
                return {
                    render: () => `<div class="font-medium text-right">${formattedDate}</div>`,
                };
            });

            return renderSnippet(
                amountCellSnippet,
                formatter.format(new Date(row.getValue("createdAt")))
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // You can pass whatever you need from `row.original` to the component
            return renderComponent(DataTableActions, { id: row.original.id });
        },
    }
];