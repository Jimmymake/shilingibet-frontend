import { useMutation, useQuery } from "@tanstack/react-query";
import GameService from "../services/GameService";
const gameService = new GameService();
export function useGames() {
  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: gameService.getAllGames.bind(gameService),
  });

  return { games, isLoading, error };
}
export function useGameSession() {
  const {
    mutate: launchGame,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: gameService.generateGameSession.bind(gameService),
  });

  return { launchGame, isLoading, error };
}
export function useImoonGames() {
  const {
    data: imoonGames,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["imoonGames"],
    queryFn: gameService.getAllImoonGames.bind(gameService),
  });

  return { imoonGames, isLoading, error };
}
export function useLaunchImoonGame() {
  const {
    mutate: launchImoonGames,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: gameService.launchImoonGame.bind(gameService),
  });

  return { launchImoonGames, isLoading, error };
}

export function useElbetGames() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["elbet-games"],
    queryFn: gameService.getElbetGames.bind(gameService),
  });

  return { elbetGames: data, isLoading, isError, error };
}

export function useLaunchElbetGame() {
  const {
    mutate: launchElbetGame,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: gameService.launchElbetGame.bind(gameService),
  });

  return { launchElbetGame, isLoading, error };
}
export function useGetTurboGames() {
  const {
    data: turboGames,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["turboGames"],
    queryFn: gameService.getTurboGames.bind(gameService),
  });

  return { turboGames, isLoading, error };
}
export function useLaunchTurboGame() {
  const {
    mutate: launchTurbo,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: gameService.launchTurboGame.bind(gameService),
  });

  return { launchTurbo, isLoading, error };
}

export function useLaunchSports() {
  const {
    mutate: launchSports,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: gameService.launchSports.bind(gameService),
  });

  return { launchSports, isLoading, error };
}
