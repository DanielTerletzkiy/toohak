import { Lobby } from "../../../backend/src/lobbies/entities/lobby.entity.ts";
import ApiFetchService, { Method } from "../services/ApiFetch.ts";

export function joinLobby(id: Lobby["id"]) {
  return ApiFetchService.fetch(Method.Post, `/lobbies/join/${id}`);
}
