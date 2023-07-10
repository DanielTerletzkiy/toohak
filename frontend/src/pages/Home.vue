<script setup lang="ts">
import { useGlobalStore } from "../stores/globalStore.ts";
import { useLobbyStore } from "../stores/lobbyStore.ts";
import { ref } from "vue";

const globalStore = useGlobalStore();
const { canHost } = globalStore;

const lobbyStore = useLobbyStore();
const { join: joinLobby } = lobbyStore;

const lobbyId = ref("");

function onJoin() {
  joinLobby(lobbyId.value);
}
</script>

<template>
  <d-column block gap>
    <d-card-subtitle class="pb-0"> Welcome to</d-card-subtitle>
    <d-card-title color="primary" class="pt-0"> Toohak!</d-card-title>
    <d-spacer />
    <d-column elevation="2">
      <d-card-subtitle class="font-size-medium">
        Be the Player!
      </d-card-subtitle>
      <d-textfield
        v-model="lobbyId"
        color="primary"
        full-width
        filled
        outlined
        label="Lobby ID"
        @enter="onJoin"
      >
        <template v-slot:suffix>
          <d-icon-button :size="40" name="arrow-right" @click="onJoin" />
        </template>
      </d-textfield>
    </d-column>
    <d-column v-if="canHost" elevation="2">
      <d-card-subtitle class="font-size-medium"> Be the Host!</d-card-subtitle>
      <d-button color="primary" glow> create lobby</d-button>
    </d-column>
    <d-spacer />
  </d-column>
</template>

<style scoped></style>
