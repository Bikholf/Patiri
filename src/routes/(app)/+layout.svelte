<script lang="ts">
    import { page } from '$app/stores';
    
    // Session data is available via page.data if needed
    $: user = $page.data?.user;
</script>

<div class="protected-app">
    <header class="app-header">
        <nav>
            <h1>Protected App Area</h1>
            {#if user}
                <div class="user-info">
                    <span>Welcome, {user.name || user.email}!</span>
                    <form method="POST" action="/signout" style="display: inline;">
                        <button type="submit" class="signout-btn">Sign Out</button>
                    </form>
                </div>
            {/if}
        </nav>
    </header>
    
    <main class="app-main">
        <slot />
    </main>
</div>

<style>
    .protected-app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    
    .app-header {
        background: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
        padding: 1rem 2rem;
    }
    
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    h1 {
        margin: 0;
        color: #333;
        font-size: 1.5rem;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .signout-btn {
        background: #dc3545;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    }
    
    .signout-btn:hover {
        background: #c82333;
    }
    
    .app-main {
        flex: 1;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
    }
</style>
