<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as m from "$paraglide/messages.js";
    import { superForm } from "sveltekit-superforms";
    import { invalidate } from '$app/navigation';

  let { groupData, groupForm, isOpen = $bindable() } = $props();

    const editGroupForm = superForm({
        name: groupData?.name ?? "",
        description: groupData?.description ?? "",
        id: groupData?.id ?? "",
    },
    {
        onResult({ result }: { result: any }) {
            console.log("Form result: ", result);
            // Prüfe, ob das Ergebnis erfolgreich war
            if (result.type === 'success') {
                isOpen = false;
                reloadGroups();
            }
        },
        delayMs: 500,
        timeoutMs: 8000
    });

    const { form: formData, enhance, form, delayed, submitting } = editGroupForm;

  function closeDialog() {
    isOpen = false;
  }

  async function reloadGroups() {
    // await invalidate('/groups');
  }
</script>
 
<Dialog.Root bind:open={isOpen}>
  <!-- <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
    >Edit Profile</Dialog.Trigger
  > -->
  <Dialog.Content class="sm:max-w-[425px]">
    <form
        method="POST"
        action="?/delete"
        use:enhance
        class="grid gap-4 py-4"
    >
        <Dialog.Header>
            <input type="hidden" name="id" value={groupData.id ?? ""} />
            <input type="hidden" name="name" value={groupData.name ?? ""} />
            <input type="hidden" name="description" value={groupData.description ?? ""} />
            
            <Dialog.Title>{m.delete_group()}</Dialog.Title>
            <Dialog.Description>
                {m.delete_group_description()}
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
            <Button type="button" variant="outline" onclick={closeDialog}>{m.cancel()}</Button>
            <Button type="submit" variant="destructive">{m.delete()}</Button>
        </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>