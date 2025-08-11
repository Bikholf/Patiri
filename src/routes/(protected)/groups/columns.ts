import type { ColumnDef } from "@tanstack/table-core";

export type Group = {
 id: string;
 name: string,
 slug: string,
 description: string,
 maxMembers: number,
 createdBy: string,
 createdAt: string,
 updatedAt: string
};
 
export const columns: ColumnDef<Group>[] = [
 {
  accessorKey: "name",
  header: "Name",
 },
 {
  accessorKey: "createdBy",
  header: "Created By",
 },
 {
  accessorKey: "createdAt",
  header: "Created At",
 },
];