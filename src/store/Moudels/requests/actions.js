export default {
  async addRequest(context, payload) {
    const data = {
      email: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://coach-founder-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();

    data.id = responseData.name;
    data.coachId = payload.coachId;
    if (!response.ok) {
      const error = new Error(responseData.message || "Faild to send data!");
      throw error;
    }
    context.commit("addRequest", data);
  },
  async setRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://coach-founder-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Faild to fetch data!");
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
