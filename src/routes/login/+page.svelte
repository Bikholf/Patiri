<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as m from "$paraglide/messages.js";
    import { signIn } from "@auth/sveltekit/client";
    import type { PageProps } from "./$types.js";
    import { page } from "$app/state";
    import { ModeWatcher } from "mode-watcher";

    let { data }: PageProps = $props();

    let isAuthenticated = data.session?.user;

    // Get return URL from page data or URL params
    let returnUrl = data.returnUrl || page.url.searchParams.get("returnUrl");

    async function handleGithubLogin() {
        try {
            const options = returnUrl
                ? { redirectTo: decodeURIComponent(returnUrl) }
                : {};
            // this will redirect the user to GitHub's OAuth flow
            await signIn("github", options);
        } catch (error) {
            console.error("GitHub sign-in failed", error);
        }
    }

    async function handleGoogleLogin() {
        try {
            const options = returnUrl
                ? { redirectTo: decodeURIComponent(returnUrl) }
                : {};
            // this will redirect the user to Google's OAuth flow
            await signIn("google", options);
        } catch (error) {
            console.error("Google sign-in failed", error);
        }
    }

    async function handleDiscordLogin() {
        try {
            const options = returnUrl
                ? { redirectTo: decodeURIComponent(returnUrl) }
                : {};
            // this will redirect the user to Discord's OAuth flow
            await signIn("discord", options);
        } catch (error) {
            console.error("Discord sign-in failed", error);
        }
    }

    // async function handleRedditLogin() {
    //     try {
    //         const options = returnUrl
    //             ? { redirectTo: decodeURIComponent(returnUrl) }
    //             : {};
    //         // this will redirect the user to Reddit's OAuth flow
    //         await signIn("reddit", options);
    //     } catch (error) {
    //         console.error("Reddit sign-in failed", error);
    //     }
    // }

    // async function handlePasskeyLogin() {
    //     try {
    //         console.log("Attempting passkey login...");
    //         const options = returnUrl
    //             ? { redirectTo: decodeURIComponent(returnUrl) }
    //             : {};
    //         // Sign in with existing passkey
    //         await signIn("passkey", options);
    //     } catch (error) {
    //         console.error("Passkey sign-in failed", error);
    //     }
    // }

    // async function handlePasskeyRegister() {
    //     try {
    //         console.log("Attempting passkey registration...");
    //         const options = {
    //             action: "register",
    //             ...(returnUrl
    //                 ? { redirectTo: decodeURIComponent(returnUrl) }
    //                 : {}),
    //         };
    //         // Register new passkey
    //         await signIn("passkey", options);
    //     } catch (error) {
    //         console.error("Passkey registration failed", error);
    //     }
    // }
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
    <ModeWatcher />
    <Card.Root class="mx-auto w-full max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl">{m.login_title()}</Card.Title>
            <Card.Description>{m.login_desc()}</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-4">
                <Button
                    variant="outline"
                    class="w-full"
                    onclick={handleGoogleLogin}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                        />
                    </svg>
                    {m.login_with({ provider: "Google" })}
                </Button>
                <Button
                    variant="outline"
                    class="w-full"
                    onclick={handleGithubLogin}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            fill="currentColor"
                        />
                    </svg>
                    {m.login_with({ provider: "GitHub" })}
                </Button>
                <Button
                    variant="outline"
                    class="w-full"
                    onclick={handleDiscordLogin}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                            fill="currentColor"
                        />
                    </svg>
                    {m.login_with({ provider: "Discord" })}
                </Button>
                <!-- <Button
                    variant="outline"
                    class="w-full"
                    onclick={handleRedditLogin}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="m25.418 12v.03c0 .543-.156 1.05-.425 1.479l.007-.012c-.274.442-.657.792-1.112 1.021l-.016.007c.108.403.17.865.17 1.343v.018-.001c-.01 1.558-.58 2.981-1.518 4.08l.007-.009c-1.088 1.296-2.473 2.308-4.052 2.936l-.069.024c-1.635.686-3.535 1.085-5.529 1.085-.051 0-.102 0-.153-.001h.008c-.043 0-.095.001-.146.001-1.991 0-3.888-.399-5.617-1.121l.096.036c-1.645-.654-3.027-1.665-4.101-2.944l-.013-.016c-.931-1.09-1.5-2.513-1.51-4.069v-.002c0-.001 0-.003 0-.005 0-.47.056-.928.161-1.366l-.008.04c-.483-.238-.878-.593-1.156-1.029l-.007-.011c-.276-.428-.44-.951-.44-1.512 0-.777.314-1.481.823-1.991.494-.512 1.186-.83 1.952-.83h.05-.003.039c.799 0 1.519.343 2.019.889l.002.002c2.047-1.41 4.572-2.265 7.296-2.298h.008l1.646-7.39c.03-.126.107-.231.211-.296l.002-.001c.074-.052.166-.083.265-.083.037 0 .073.004.107.012l-.003-.001 5.234 1.149c.174-.353.435-.639.757-.838l.009-.005c.319-.2.707-.319 1.123-.319.585 0 1.116.235 1.501.617.385.369.624.888.624 1.463v.036-.002.03c0 .578-.239 1.1-.624 1.472l-.001.001c-.384.386-.916.624-1.504.624-.584 0-1.113-.236-1.497-.617-.381-.371-.617-.888-.617-1.461 0-.013 0-.025 0-.038v.002l-4.738-1.05-1.475 6.694c2.747.02 5.293.865 7.407 2.3l-.047-.03c.513-.534 1.234-.865 2.031-.865.78 0 1.486.317 1.997.83.509.496.825 1.189.825 1.955v.039-.002zm-19.489 2.822v.032c0 .576.236 1.097.617 1.471.369.385.888.624 1.463.624h.036-.002c1.175-.002 2.126-.953 2.128-2.128 0-.01 0-.022 0-.034 0-.575-.239-1.094-.624-1.462l-.001-.001c-.374-.381-.895-.617-1.471-.617-.011 0-.023 0-.034 0h.002c-1.163.01-2.104.95-2.114 2.113v.001zm11.489 5.036c.096-.093.156-.224.156-.369s-.06-.275-.156-.369c-.087-.088-.207-.142-.341-.142-.005 0-.01 0-.014 0h.001c-.002 0-.005 0-.008 0-.14 0-.266.054-.361.142-.464.432-1.047.742-1.694.876l-.023.004c-.681.18-1.463.284-2.27.284s-1.588-.104-2.334-.298l.064.014c-.671-.137-1.255-.448-1.721-.882l.002.002c-.094-.088-.221-.142-.361-.142-.003 0-.006 0-.008 0-.003 0-.007 0-.011 0-.133 0-.254.054-.341.142-.098.086-.16.212-.16.352v.01.004c0 .146.061.278.16.372.462.435 1.025.767 1.65.957l.03.008c.501.186 1.087.332 1.695.414l.043.005q.666.064 1.29.064t1.29-.064c.65-.086 1.237-.233 1.796-.437l-.058.019c.656-.198 1.22-.529 1.685-.966l-.002.002zm-.042-2.908h.034c.575 0 1.094-.239 1.462-.624l.001-.001c.381-.374.617-.895.617-1.471 0-.011 0-.023 0-.034v.002c-.01-1.163-.95-2.104-2.113-2.114h-.001c-.01 0-.021 0-.032 0-.576 0-1.097.236-1.471.617-.385.369-.624.888-.624 1.463v.036-.002c.002 1.175.953 2.126 2.128 2.128z"
                            fill="currentColor"
                        />
                    </svg>
                    {m.login_with({ provider: "Reddit" })}
                </Button> -->
                <!-- {#if !isAuthenticated} -->
                    <!-- User is logged in, show register button -->
                    <!-- <Button
                        variant="outline"
                        class="w-full"
                        onclick={handlePasskeyRegister}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class="w-4 h-4 mr-2"
                        >
                            <path
                                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
                                fill="currentColor"
                            />
                        </svg>
                        Register new Passkey
                    </Button>
                {:else} -->
                    <!-- User is not logged in, show login button -->
                    <!-- <Button
                        variant="outline"
                        class="w-full"
                        onclick={handlePasskeyLogin}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class="w-4 h-4 mr-2"
                        >
                            <path
                                d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                                fill="currentColor"
                            />
                        </svg>
                        Sign in with Passkey
                    </Button>
                {/if} -->
            </div>
            <div class="mt-4 text-center text-sm">
                {m.dont_have_an_account()}
                <a href="##" class="underline"> {m.sign_up()} </a>
            </div>
        </Card.Content>
    </Card.Root>
</div>
