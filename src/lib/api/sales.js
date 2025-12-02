export async function fetchSalesData(queries) {
  const {
    startDate,
    endDate,
    priceMin = "",
    email = "",
    phone = "",
    sortBy = "date",
    sortOrder = "asc",
    after = "",
    before = "",
    token,
    isTotalSales,
  } = queries;
  console.log(queries);

  const searchQueries = `startDate=${startDate}&endDate=${endDate}&priceMin=${priceMin}&email=${email}&phone=${phone}&sortBy=${sortBy}&sortOrder=${sortOrder}&after=${after}&before=${before}`;

  if (isTotalSales) {
    const res = await fetch(
      "https://autobizz-425913.uc.r.appspot.com/sales?startDate=2025-01-01&endDate=2025-01-31&priceMin=10&email=&phone=&sortBy=date&sortOrder=asc&after=&before=",
      {
        method: "GET",
        headers: {
          "X-AUTOBIZZ-TOKEN": token,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch token");

    const data = await res.json();
    console.log(data);

    return data.results.TotalSales;
  }
  const res = await fetch(
    `https://autobizz-425913.uc.r.appspot.com/sales?${searchQueries}`,
    {
      method: "GET",
      headers: {
        "X-AUTOBIZZ-TOKEN": token,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch token");

  const data = await res.json();
  console.log(res, data);

  return data.results;
}
