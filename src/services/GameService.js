import { fetchAPI } from "../utils/FetchApi";
import BaseClass from "./BaseClass";
import { sportsApiUrl } from "../utils/configs";

const base = new BaseClass();

class GameService extends BaseClass {
  constructor() {
    super();
  }

  async getAllGames() {
    try {
      const res = await fetchAPI("spribe/getGames", "GET");
      return res?.data;
    } catch (error) {
      throw new Error(error?.message || "Unable to fetch all games");
    }
  }

  async generateGameSession({ game, userId }) {
    try {
      return await fetchAPI(
        "session/createGameSession",
        "POST",
        {
          userId,
          game,
        },
        base.token
      );
    } catch (error) {
      throw new Error(error?.message || "Unable to launch game session");
    }
  }
  async getAllImoonGames() {
    try {
      const res = await fetchAPI("imoon/getGames", "GET");

      return res?.data;
    } catch (error) {
      throw new Error(error?.message || "Unable to fetch Imoon games");
    }
  }

  async launchImoonGame({ gameID }) {
    try {
      const res = await fetchAPI(
        "imoon/launchGame",
        "POST",
        { gameId: gameID, userID: this.userId },
        base?.token
      );

      return res;
    } catch (error) {
      throw new Error(error?.message || "Failed to launch Imoon game");
    }
  }

  async getElbetGames() {
    try {
      const res = await fetchAPI("elbet/GetElbetGames", "GET");

      return res?.games;
    } catch (error) {
      throw new Error(error?.message || "Unable to fetch Imoon games");
    }
  }

  async launchElbetGame({ game, gameID }) {
    const data = { game, gameID };
    try {
      const res = await fetchAPI(
        "elbet/launch",
        "POST",
        {
          ...data,
        },
        this.token
      );

      return res;
    } catch (error) {
      throw new Error(error?.message || "Unable to fetch Elbet games");
    }
  }
  async getTurboGames() {
    try {
      const res = await fetchAPI("turbo/getGames", "GET");
      return res?.data?.games;
    } catch (error) {
      throw new Error(error?.message || "Unable to fetch Turbo games");
    }
  }
  async launchTurboGame({ game }) {
    try {
      const res = await fetchAPI(
        "turbo/launch",
        "POST",
        { game: game },
        this.token
      );

      return res;
    } catch (error) {
      throw new Error(error?.message || "Failed to launch Turbo game");
    }
  }

  async createPlayerToken() {
    try {
      const res = await fetchAPI(
        "session/createPlayerToken",
        "POST",
        { game: "turbosports" },
        this.token
      );

      return res;
    } catch (error) {
      throw new Error(error?.message || "Failed to create turbo token");
    }
  }

  async launchSports({ userId, tenantId }) {
    try {
      // Sports uses a different API base URL
      const headers = { "Content-Type": "application/json" };

      // Get token from user in localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${sportsApiUrl}/sports/launch`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          userId,
          tenantId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || result?.error || "Failed to launch Sports"
        );
      }

      return result;
    } catch (error) {
      console.error("Sports launch error:", error);
      throw new Error(error?.message || "Failed to launch Sports");
    }
  }
}
export default GameService;
