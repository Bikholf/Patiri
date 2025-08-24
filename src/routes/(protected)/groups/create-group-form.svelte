<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { superForm } from "sveltekit-superforms";
    import * as m from "$paraglide/messages.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import AddIcon from "@lucide/svelte/icons/plus";
    import { getLocale } from "$paraglide/runtime.js";

    let { data } = $props();

    const form = superForm(data.groupForm, {
        onResult({ result }) {
            console.log("Form result: ", result);
            // Prüfe, ob das Ergebnis erfolgreich war
            if (result.type === 'success') {
                isOpen = false;
            }
        }
    });

    const { form: formData, enhance } = form;

    let isOpen = $state(false);

    let currentLang = $state(getLocale());
</script>

<Dialog.Root bind:open={isOpen}>
    <Dialog.Trigger class={[buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer"]}>
        <AddIcon />{m.create_group()}
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>{m.create_group()}</Dialog.Title>
            <Dialog.Description>
                {m.create_group_desc()}
            </Dialog.Description>
        </Dialog.Header>
        <form method="POST" action="?/create" use:enhance class="grid gap-4 py-4">
            <input type="hidden" name="lang" value={currentLang} />
            <Form.Field {form} name="name">
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
                    {m.min_x_characters({ x: 2 })}
                    {m.max_x_characters({ x: 100 })}
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="description">
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
                >
                    {m.create_group()}
                </Form.Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
