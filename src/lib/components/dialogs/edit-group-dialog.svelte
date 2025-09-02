<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { superForm, type SuperForm } from "sveltekit-superforms";
    import * as m from "$paraglide/messages.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import AddIcon from "@lucide/svelte/icons/plus";
    import { getLocale } from "$paraglide/runtime.js";
    import SquarePenIcon from "@lucide/svelte/icons/square-pen";
import type { Group } from "$lib/interfaces/group.js";
    import { is } from "drizzle-orm";
    import Loader2Icon from "@lucide/svelte/icons/loader-2";

    // Empfange das superForm-Objekt und die Daten der Gruppe

    // Erstelle ein neues Formular aus den übergebenen Daten
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
            }
        },
        delayMs: 500,
        timeoutMs: 8000
    });

    const { form: formData, enhance, form, delayed, submitting } = editGroupForm;

    // Initialisiere die superForm-Daten
    $effect(() => {
        if (isOpen && groupData) {
            $formData.id = groupData.id ?? "";
            $formData.name = groupData.name ?? "";
            $formData.description = groupData.description ?? "";
        }
    });


    let currentLang = $state(getLocale());
</script>

<Dialog.Root bind:open={isOpen}>
    <!-- <Dialog.Trigger class="cursor-pointer">
        <SquarePenIcon />{m.edit()}
    </Dialog.Trigger> -->
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>{m.edit_group()}</Dialog.Title>
            <Dialog.Description>
                {m.edit_group_description()}
            </Dialog.Description>
        </Dialog.Header>
        <form
            method="POST"
            action="?/update"
            use:enhance
            class="grid gap-4 py-4"
        >
            <input type="hidden" name="id" value={$formData.id ?? ""} />
            <Form.Field form={editGroupForm} name="name">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label for="name">{m.name()}</Form.Label>
                        <Input
                            bind:value={$formData.name}
                            class="col-span-3"
                            type="text"
                            {...props}
                            placeholder={m["group_creation.name.placeholder"]()}
                        />
                    {/snippet}
                </Form.Control>
                <Form.Description>
                    {m.required_field()}
                    {m.min_x_characters({ x: 3 })}
                    {m.max_x_characters({ x: 100 })}
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field form={editGroupForm} name="description">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>{m.description()}</Form.Label>
                        <Textarea
                            bind:value={$formData.description}
                            class="col-span-3"
                            {...props}
                            placeholder={m[
                                "group_creation.description.placeholder"
                            ]()}
                        />
                    {/snippet}
                </Form.Control>
                <Form.Description>
                    {m.optional_field()}
                    {m.max_x_characters({ x: 500 })}
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Dialog.Footer>
                <Form.Button
                    class="cursor-pointer"
                    type="submit"
                    variant="outline"
                    disabled={$submitting === true}
                >
                    {#if $delayed === true}
                         <Loader2Icon class="animate-spin" />
                    {:else}
                        {m.save_changes()}
                    {/if}
                </Form.Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
