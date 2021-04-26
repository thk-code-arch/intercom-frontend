<template>
  <div class="container p-6 sm:px-8 flex flex-row">
    <change-profile-image />
    <update-profile />
    <change-password />
  </div>
</template>

<script>
import ChangePassword from "../components/profile/ChangePassword";
import UpdateProfile from "../components/profile/UpdateProfile";
import ChangeProfileImage from "../components/profile/ChangeProfileImage";
export default {
  name: "Profile",
  components: { ChangePassword, UpdateProfile, ChangeProfileImage },
};
</script>
