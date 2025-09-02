<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as m from "$paraglide/messages.js";
    import ShareIcon from "@lucide/svelte/icons/share-2";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { superForm } from "sveltekit-superforms";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import {
        DateFormatter,
        type DateValue,
        getLocalTimeZone,
        today,
    } from "@internationalized/date";
    import * as Select from "$lib/components/ui/select/index.js";
    import Loader2Icon from "@lucide/svelte/icons/loader-2";

    let { data, group } = $props();

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    // Standardwert für 7 Tage in Millisekunden
    const defaultExpirationValue = String(sevenDaysInMs);

    // Initialisierung des Svelte-State-Feldes mit dem Standardwert

    const form = superForm(data.invitationLinkForm, {
        onSubmit({ formData }) {
            if (noMaxUsesLimit == false) {
                formData.set("maxUses", maxUsesValue);
            } else {
                formData.set("maxUses", "0");
            }
            formData.set("expiresAt", selectedExpiration);
            console.log(formData);
        },
        onResult({ result }) {
            console.log("Form result: ", result);
            // Prüfe, ob das Ergebnis erfolgreich war
            if (result.type === "success") {
                isOpen = false;
            }
        },
        delayMs: 500,
        timeoutMs: 8000,
    });

    const { form: formData, enhance, delayed, submitting } = form;

    // Initialisiere selectedExpiration basierend auf dem aktuellen Wert in formData oder dem Standardwert
    let selectedExpiration = $state(
        $formData.expiresAt
            ? String(($formData.expiresAt as Date).getTime() - Date.now())
            : String(sevenDaysInMs),
    );

    let isOpen = $state(false);
    let noMaxUsesLimit = $state(true);
    let maxUsesValue = $state($formData.maxUses ?? 1);

    function handleCheckboxChange() {
        if (noMaxUsesLimit) {
            noMaxUsesLimit = false;
            $formData.maxUses = maxUsesValue;
        } else {
            noMaxUsesLimit = true;
            $formData.maxUses = 0;
        }
    }

    // Setze den Standardwert von expiresAt NUR WENN er noch nicht existiert.
    if (!$formData.expiresAt) {
        $formData.expiresAt = new Date(Date.now() + sevenDaysInMs);
    }

    const expirationOptions = [
        { label: `${m["30_min"]()}`, value: "1800000" },
        { label: `${m["1_hour"]()}`, value: "3600000" },
        { label: `${m["6_hours"]()}`, value: "21600000" },
        { label: `${m["12_hours"]()}`, value: "43200000" },
        { label: `${m["1_day"]()}`, value: "86400000" },
        { label: `${m["7_days"]()}`, value: String(sevenDaysInMs) },
        { label: `${m["never"]()}`, value: "" }, // Verwende einen leeren String für "nie"
    ];

    function handleExpirationChange(val: string | null) {
        console.log("Expiration changed to: ", val);
        if (val === null) {
            $formData.expiresAt = null;
        } else {
            const duration = Number(val);
            $formData.expiresAt = new Date(Date.now() + duration);
        }
    }
</script>

<Dialog.Root bind:open={isOpen}>
    <Dialog.Trigger
        class={[
            buttonVariants({ variant: "outline", size: "sm" }),
            "cursor-pointer",
        ]}
    >
        <ShareIcon />
        {m.invite_people()}
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>{m.customize_invite_link()}</Dialog.Title>
        </Dialog.Header>
        <form method="POST" action="?/invite" use:enhance>
            <div class="flex flex-col gap-2 items-start">
                <h3>{m.max_number_of_uses()}</h3>
                <Form.Field {form} name="maxUses" class="w-full">
                    <Form.Control>
                        {#snippet children()}
                            <Form.Label class="flex items-center gap-2 mt-2">
                                <Checkbox
                                    checked={noMaxUsesLimit}
                                    onCheckedChange={handleCheckboxChange}
                                />
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {m.set_no_limit()}
                                </label>
                            </Form.Label>
                            <div class="flex items-center gap-2">
                                <Slider
                                    class="flex-grow"
                                    disabled={noMaxUsesLimit}
                                    bind:value={maxUsesValue}
                                    max={100}
                                    min={1}
                                    step={1}
                                    type="single"
                                />
                                <Input
                                    class="w-[100px]"
                                    bind:value={maxUsesValue}
                                    disabled={noMaxUsesLimit}
                                    type="number"
                                    min={1}
                                />
                            </div>
                        {/snippet}
                    </Form.Control>
                    <Form.Description></Form.Description>
                    <Form.FieldErrors />
                </Form.Field>
                <h3>{m.expires_after()}</h3>
                <Form.Field
                    {form}
                    name="expiresAt"
                    class="flex flex-col w-full"
                >
                    <Form.Control>
                        {#snippet children({ props })}
                            <Select.Root
                                type="single"
                                onValueChange={(val) => {
                                    handleExpirationChange(val);
                                    selectedExpiration = val;
                                }}
                                bind:value={selectedExpiration}
                            >
                                <Select.Trigger
                                    {...props}
                                    class="border rounded p-2 w-full"
                                >
                                    {#if expirationOptions.find((opt) => String(opt.value) === selectedExpiration)}
                                        {expirationOptions.find(
                                            (opt) =>
                                                String(opt.value) ===
                                                selectedExpiration,
                                        )?.label}
                                    {/if}
                                </Select.Trigger>
                                <Select.Content>
                                    {#each expirationOptions as opt}
                                        <Select.Item
                                            value={String(opt.value)}
                                            label={opt.label}
                                        ></Select.Item>
                                    {/each}
                                </Select.Content>
                            </Select.Root>
                            <Form.FieldErrors />
                            <input
                                hidden
                                value={$formData.expiresAt}
                                name={props.name}
                            />
                        {/snippet}
                    </Form.Control>
                </Form.Field>
            </div>
            <Dialog.Footer>
                <Button
                    type="submit"
                    variant="outline"
                    class="cursor-pointer"
                    disabled={$submitting === true}
                >
                    {#if $delayed === true}
                        <Loader2Icon class="animate-spin" />
                    {:else}
                        {m.create_invitation_link()}
                    {/if}
                </Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
