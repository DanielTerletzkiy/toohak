<script setup lang="ts">
import {useGlobalStore} from "../../stores/globalStore";
import {useQuestionStore} from "../../stores/questionStore";
import {storeToRefs} from "pinia";
import TextGrid from "../../components/quiz/choices/text/TextGrid.vue";

const globalStore = useGlobalStore()
const {} = storeToRefs(globalStore)

const questionStore = useQuestionStore()
const {text, answers} = storeToRefs(questionStore)</script>

<template>
<TextGrid :answers="answers"/>
</template>

<style scoped>

</style>
