<script setup lang="ts">
import {computed, PropType} from "vue";
import {ScoreTotal} from "../../../../../backend/shared/types/Score.ts";
import {useLobbyStore} from "../../../stores/lobbyStore.ts";
import {storeToRefs} from "pinia";
import {User} from "../../../../../backend/src/users/entities/user.entity.ts";

const props = defineProps({
  totalScores: {type: Object as PropType<ScoreTotal>, required: true}
})

const lobbyStore = useLobbyStore();
const {lobby} = storeToRefs(lobbyStore);

const topScores = computed(() => {
  console.log(props.totalScores)
  const keys = Object.keys(props.totalScores)//.slice(0, 2);
  console.log({keys})
  const data = [];
  for (const key of keys) {
    if (!lobby.value || !props.totalScores) {
      continue;
    }
    try {

      //@ts-ignore
      const user: User = lobby.value.players.find((user) => user.socketId === key);
      const score: number = props.totalScores[key];
      data.push({
        user,
        score,
      })
    } catch (e) {
      console.warn(e)
    }
    console.log({data})
    return data;
  }
})

function trophyColor(index) {
  switch (index) {
    case 0: {
      return "warning";
    }
    case 1: {
      return "silver";
    }
    case 2: {
      return "SandyBrown";
    }
  }
}
</script>

<template>
  <d-row>
    {{topScores}}
    <d-card v-for="(top, i) in topScores" :key="top.user.socketId" class="top" width="350px">
      <d-row>
        <d-avatar elevation="n2" :size="100" glowing :color="trophyColor(i)">
          <d-icon name="trophy" :size="80"/>
        </d-avatar>
        <d-column>
          <d-card-title class="username font-size-medium">
            {{ top.user.username }}
          </d-card-title>
          <d-card-subtitle class="score font-size-medium font-weight-bold">
            {{ top.score }}
            <d-card-subtitle class="font-weight-medium">
              Points
            </d-card-subtitle>
          </d-card-subtitle>
        </d-column>
      </d-row>
    </d-card>
  </d-row>
</template>

<style scoped lang="scss">
.top {
  .username {

  }

  .score {
    font-family: Consolas, sans-serif;
  }
}
</style>
