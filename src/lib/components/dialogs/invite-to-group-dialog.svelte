<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as m from "$paraglide/messages.js";
    import ShareIcon from "@lucide/svelte/icons/share-2";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { superForm } from "sveltekit-superforms";

    let { data, group } = $props();
    
    const form = superForm(data.form, {
        onResult({ result }) {
            console.log("Form result: ", result);
            // Prüfe, ob das Ergebnis erfolgreich war
            if (result.type === 'success') {
                isOpen = false;
            }
        },
        delayMs: 500,
        timeoutMs: 8000
    });
    
    const { form: formData, enhance, delayed, submitting } = form;

    let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
    <Dialog.Trigger class={[buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer"]}>
        <ShareIcon />
        {m.invite_people()}
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>{m.customize_invite_link()}</Dialog.Title>
        </Dialog.Header>
        <form method="POST" use:enhance>
            <Form.Field {form} name="maxUses">

            </Form.Field>
            <Dialog.Footer>
                <Button type="submit">{m.create_invitation_link()}</Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
