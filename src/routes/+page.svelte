<script lang="ts">
    import { m } from "../paraglide/messages.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { setLocale, getLocale } from "../paraglide/runtime.js";
    import { SignIn, SignOut } from "@auth/sveltekit/components";
    import { page } from "$app/state";
    import { signIn } from "@auth/sveltekit/client";

    console.log(page.data.session)

    function setLang(newLang: "en" | "de") {
        setLocale(newLang);
    }


    async function triggerGithubSignIn() {
        try {
            // this will redirect the user to GitHub's OAuth flow
            await signIn("github", {
                // optional: where to send the user after sign-in
                callbackUrl: window.location.origin
            });
        } catch (error) {
            console.error("GitHub sign-in failed", error);
        }
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
<SignIn provider="github" signInPage="signin">
    <Button slot="submitButton" onclick={triggerGithubSignIn}>
        Sign in with GitHub
    </Button>
</SignIn>
<SignOut>
    <span slot="submitButton">Signout</span>
</SignOut>
