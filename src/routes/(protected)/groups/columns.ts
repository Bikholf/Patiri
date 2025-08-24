import { renderComponent, renderSnippet } from "$lib/components/ui/data-table/index.js";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { getLocale } from "$paraglide/runtime.js";
import DataTableActions from "./data-table-actions.svelte";
import * as m from "$paraglide/messages.js";
import type { SuperForm } from "sveltekit-superforms";
import type { GroupSchema, groupSchema } from "$db/form-schemas.js";
import type { InferInput } from "valibot";
import type { Group } from "$lib/interfaces/group.js";

// Mache columns zu einer Funktion, die das Formular-Objekt akzeptiert
export const columns = (groupForm: SuperForm<Group>): ColumnDef<Group>[] => [
    {
        accessorKey: "name",
        header: () => {
            const localizedName = m.name()
            const amountHeaderSnippet = createRawSnippet(() => ({
                render: () => `<div class="pl-2">${localizedName}</div>`,
            }));
            return renderSnippet(amountHeaderSnippet, "");
        },
        cell: ({ row }) => {
            const amountCellSnippet = createRawSnippet<[string]>(() => {
                const nameValue = row.getValue("name")
                return {
                    render: () => `<div class="pl-2">${nameValue}</div>`,
                };
            });
            return renderSnippet(amountCellSnippet, "");
        }
    },
    {
        accessorKey: "description",
        header: () => {
            const localizedName = m.description()
            const amountHeaderSnippet = createRawSnippet(() => ({
                render: () => `<div>${localizedName}</div>`,
            }));
            return renderSnippet(amountHeaderSnippet, "");
        },
    },
    {
        accessorKey: "creator.name",
        header: () => {
            const localizedName = m.created_by()
            const amountHeaderSnippet = createRawSnippet(() => ({
                render: () => `<div>${localizedName}</div>`,
            }));
            return renderSnippet(amountHeaderSnippet, "");
        },
    },
    {
        accessorKey: "createdAt",
        header: () => {
            const localizedName = m.created_at()
            const dateHeaderSnippet = createRawSnippet(() => ({
                render: () => `<div class="text-right">${localizedName}</div>`,
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
            // Übergib sowohl die Zeilendaten als auch das Formular-Objekt
            return renderComponent(DataTableActions, { groupData: row.original, groupForm });
        },
    }
];