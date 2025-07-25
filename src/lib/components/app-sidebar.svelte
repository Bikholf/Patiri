<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import SearchIcon from "@lucide/svelte/icons/search";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import NavUser from "./app-navuser.svelte";

  const items = [
    {
      title: "Home",
      url: "#",
      icon: HouseIcon,
    },
    {
      title: "Inbox",
      url: "#",
      icon: InboxIcon,
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ];

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://raw.githubusercontent.com/Bikholf/LinkPage/refs/heads/main/public/profile.jpg"
  };
</script>

<Sidebar.Root collapsible="icon">
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
   <Sidebar.Footer>
    <NavUser user={user} />
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>