<template>
  <div class="container p-6 sm:px-8 flex flex-row">
    <change-password />
    <update-profile />
  </div>
</template>

<script>
import ChangePassword from "../components/profile/ChangePassword";
import UpdateProfile from "../components/profile/UpdateProfile";
export default {
  name: "Profile",
  components: { ChangePassword, UpdateProfile },
};
</script>
