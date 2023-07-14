<script setup lang="ts">
import {useGlobalStore} from "../stores/globalStore.ts";
import {useLobbyStore} from "../stores/lobbyStore.ts";
import {inject, onBeforeMount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {State} from "vuelize/src/types/Vuelize.ts";
import {storeToRefs} from "pinia";

const route = useRoute();

const vuelize = inject("vuelize") as Vuelize

const globalStore = useGlobalStore();
const { canHost, isMobile, user } = storeToRefs(globalStore);
const {fetchCurrentUser} = globalStore;

const lobbyStore = useLobbyStore();
const { join: joinLobby, create: createLobby } = lobbyStore;

const lobbyId = ref("");
const username = ref("");

const questionAmount = ref(10);
const questionDuration = ref(30);

function onJoin() {
  joinLobby(lobbyId.value, username.value);
}

function onCreate() {
  createLobby(questionAmount.value, questionDuration.value * 1000);
}

onBeforeMount(async ()=> {
  await fetchCurrentUser();
  if(!user.value){
    return;
  }
  username.value = user.value.username;
})

onMounted(()=>{
  const lobby = route.query.lobby as string;
  if(!lobby){
    return;
  }
  lobbyId.value = lobby;
  vuelize.notify("Injected","Prefilled lobby ID", State.Info);
})
</script>

<template>
  <d-column block gap>
    <d-card-subtitle class="pb-0"> Welcome to</d-card-subtitle>
    <d-card-title color="primary" class="pt-0"> !toohaK</d-card-title>
    <d-row justify="center">
      <d-image src="/logo.png" v-if="!isMobile" height="350px" width="500px"/>
    </d-row>
    <d-row justify="center">
      <d-column gap class="choice-container" block>
        <d-column elevation="2" block>
          <d-card-subtitle class="font-size-medium font-weight-bold">
            Be the Player!
          </d-card-subtitle>
          <d-column no-padding gap class="ma-2">
            <d-textfield
                v-model="username"
                color="primary"
                full-width
                filled
                placeholder="Username (Optional)"
                solo
                elevation="4"
                type="name"
            >
            </d-textfield>
            <d-textfield
                v-model="lobbyId"
                color="primary"
                full-width
                filled
                placeholder="Lobby ID"
                solo
                @enter="onJoin"
                elevation="4"
                type="id"
            >
              <template v-slot:suffix>
                <d-icon-button
                    :size="30"
                    active
                    color="primary"
                    name="arrow-right"
                    @click="onJoin"
                />
              </template>
            </d-textfield>
          </d-column>
        </d-column>
        <d-column v-if="canHost" elevation="2" block>
          <d-card-subtitle class="font-size-medium font-weight-bold">
            Be the Host!
          </d-card-subtitle>
          <d-column elevation>
            <d-button class="ma-2" color="primary" glow @click="onCreate">
              create lobby
            </d-button>
            <d-row class="pa-2" gap>
              <d-textfield
                v-model="questionAmount"
                color="primary"
                filled
                outlined
                label="Amount"
                type="number"
                elevation="4"
              >
                <template v-slot:suffix> questions</template>
              </d-textfield>
              <d-textfield
                v-model="questionDuration"
                color="primary"
                filled
                outlined
                label="Duration"
                type="number"
                elevation="4"
              >
                <template v-slot:suffix> seconds</template>
              </d-textfield>
            </d-row>
          </d-column>
        </d-column>
      </d-column>
    </d-row>
    <d-spacer />
  </d-column>
</template>

<style scoped lang="scss">
.choice-container {
  max-width: 600px;
}
</style>
