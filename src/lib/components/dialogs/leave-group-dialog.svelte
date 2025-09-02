<script lang="ts">
    import { goto, invalidate, invalidateAll } from "$app/navigation";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as m from "$paraglide/messages.js";
    import { redirect } from "@sveltejs/kit";
    import { superForm } from "sveltekit-superforms";
    import Loader2Icon from "@lucide/svelte/icons/loader-2";

    let { groupData, groupForm, isOpen = $bindable() } = $props();

    const leaveGroupForm = superForm(
        {
            name: groupData?.name ?? "",
            description: groupData?.description ?? "",
            id: groupData?.id ?? "",
        },
        {
            onResult({ result }: { result: any }) {
                console.log("Form result: ", result);
                // Prüfe, ob das Ergebnis erfolgreich war
                if (result.type === "success") {
                    isOpen = false;
                    reloadGroups();
                }
            },
            delayMs: 500,
            timeoutMs: 8000,
        },
    );

    const {
        form: formData,
        enhance,
        form,
        delayed,
        submitting,
    } = leaveGroupForm;

    function closeDialog() {
        isOpen = false;
    }

    async function reloadGroups() {
        // await invalidateAll()
    }
</script>

<Dialog.Root bind:open={isOpen}>
    <!-- <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
    >Edit Profile</Dialog.Trigger
  > -->
    <Dialog.Content class="sm:max-w-[425px]">
        <form
            method="POST"
            action="?/leave"
            use:enhance
            class="grid gap-4 py-4"
        >
            <Dialog.Header>
                <input type="hidden" name="id" value={groupData.id ?? ""} />
                <input type="hidden" name="name" value={groupData.name ?? ""} />
                <input
                    type="hidden"
                    name="description"
                    value={groupData.description ?? ""}
                />

                <Dialog.Title>{m.leave_group()}</Dialog.Title>
                <Dialog.Description>
                    {m.leave_group_description()}
                </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
                <Button
                    type="button"
                    variant="outline"
                    class="cursor-pointer"
                    onclick={closeDialog}>{m.cancel()}</Button
                >
                <Button
                    type="submit"
                    variant="destructive"
                    class="cursor-pointer"
                    disabled={$submitting === true}
                >
                    {#if $delayed === true}
                        <Loader2Icon class="animate-spin" />
                    {:else}
                        {m.leave_group()}
                    {/if}
                </Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
