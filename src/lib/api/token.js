export async function fetchAuthToken() {
  const res = await fetch(
    "https://autobizz-425913.uc.r.appspot.com/getAuthorize",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenType: "frontEndTest" }),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch token");

  const data = await res.json();
  return data.token;
}
