<script lang="ts">
    import { m } from "../paraglide/messages.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { setLocale, getLocale } from "../paraglide/runtime.js";
    import { SignIn, SignOut } from "@auth/sveltekit/components";
    import { page } from "$app/state";

    console.log(page.data.session)

    function setLang(newLang: "en" | "de") {
        setLocale(newLang);
    }


</script>

<h1>Welcome to your library project</h1>
<p>
    Create your package using @sveltejs/package and preview/showcase your work
    with SvelteKit
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>

<span>{m.HELLO()}</span>

<Button onclick={() => setLang("en")}>{m.ENGLISH()}</Button>
<Button onclick={() => setLang("de")}>{m.GERMAN()}</Button>
<p>Current locale: {getLocale()}</p>
<SignIn provider="github" signInPage="signin" />
<SignOut>
    <span slot="submitButton">Signout</span>
</SignOut>
