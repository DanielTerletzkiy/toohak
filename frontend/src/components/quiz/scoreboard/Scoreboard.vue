<script setup lang="ts">
import { useGlobalStore } from "../../../stores/globalStore.ts";
import { storeToRefs } from "pinia";
import { useLobbyStore } from "../../../stores/lobbyStore.ts";
import TopScore from "./TopScore.vue";
import { computed } from "vue";
import { User } from "../../../../../backend/src/users/entities/user.entity.ts";
import DGrid from "vuelize/src/components/flex/DGrid.vue";
import { ScoreRound } from "../../../../../backend/shared/types/Score.ts";
import { useQuestionStore } from "../../../stores/questionStore.ts";
import { LobbyState } from "../../../../../backend/shared/enums/Lobby.ts";

const globalStore = useGlobalStore();
const { socketId } = storeToRefs(globalStore);

const lobbyStore = useLobbyStore();
const { lobby, scoreboard } = storeToRefs(lobbyStore);

const questionStore = useQuestionStore();
const { progress } = storeToRefs(questionStore);

const scores = computed(() => {
  if (!scoreboard.value) {
    return;
  }
  const keys = Object.keys(scoreboard.value.score);
  const data = [];
  for (const key of keys) {
    if (!lobby.value || !scoreboard.value) {
      continue;
    }
    try {
      //@ts-ignore
      const user: User = lobby.value.players.find(
        (user) => user.socketId === key
      );
      const scores: ScoreRound[] = scoreboard.value.score[key];
      const sum = scores.reduce((a, b) => a + b.score, 0);
      data.push({
        user,
        scores,
        sum,
      });
    } catch (e) {
      console.warn(e);
    }
  }
  return data;
});
</script>

<template>
  <d-column v-if="scoreboard && scores" no-padding gap>
    <TopScore :total-scores="scoreboard.totalScore" />
    <d-card class="table">
      <d-row v-for="score in scores">
        <d-card-subtitle width="200px" class="font-size-medium">
          {{ score.user.username }}
        </d-card-subtitle>
        <d-grid
          v-if="score && progress && lobby"
          :columns="score.scores.length + 1"
          gap="4"
        >
          <d-card-subtitle
            v-for="(scoreData, i) in score.scores"
            :glowing="
              lobby.state !== LobbyState.Completed && progress.current === i
            "
            elevation="1"
            width="100px"
            class="score font-size-medium"
          >
            {{ scoreData.score }}
          </d-card-subtitle>
          <d-card-subtitle
            elevation="4"
            width="100px"
            class="score font-size-medium font-weight-bold"
          >
            <d-icon name="abacus" />
            {{ score.sum }}
          </d-card-subtitle>
        </d-grid>
      </d-row>
    </d-card>
  </d-column>
</template>

<style scoped lang="scss">
.table {
  .score {
    font-family: Consolas, sans-serif;
  }
}
</style>
