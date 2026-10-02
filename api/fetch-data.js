export default async function fetchData(request, response) {
  const secret = process.env.REACT_APP_API_KEY;
  const { color, scheme, variation } = request.query;
  try {
    const apiResponse = await fetch(
        `https://api.apiverve.com/v1/colorpalette?color=${color}&scheme=${scheme}&variation=${variation}`,
        {
          method: "GET",
          headers: {
            "x-api-key": secret,
          },
        },
      );
    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: "Failed to fetch third party API" });
    }
    const data = await apiResponse.json();
    return response.status(200).json(data);
    } catch(error) {
      return response.status(401).json({ error: error.message });
    }
}