export default {
  async addCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const data = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.des,
      hourlyRate: payload.rate,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://coach-founder-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Faild to fetch!");
      throw error;
    }
    context.commit("addCoach", {
      ...data,
      id: userId,
    });
  },

  async loadChoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `https://coach-founder-default-rtdb.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Faild i fetching data!");
      throw error;
    }

    const choaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      choaches.push(coach);
    }
    context.commit("setCoaches", choaches);
    context.commit("setFetchTimestamp");
  },
};
