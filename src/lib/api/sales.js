export async function fetchSalesData(queries) {
  const {
    startDate,
    endDate,
    minPrice = 0,
    email = "",
    phone = "",
    sortBy = "date",
    sortOrder = "asc",
    after = "",
    before = "",
    token,
    isTotalSales,
  } = queries;
  // console.log(queries);

  // this 'if block' is for total sales chart because filters, sorting and pagination will effect on only table not on chart.
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
    if (!res.ok) throw new Error("Failed to fetch sales data");
    const data = await res.json();
    return data.results.TotalSales;
  }

  const searchQueries = `startDate=${startDate}&endDate=${endDate}&priceMin=${minPrice}&email=${email}&phone=${phone}&sortBy=${sortBy}&sortOrder=${sortOrder}&after=${after}&before=${before}`;

  const res = await fetch(
    `https://autobizz-425913.uc.r.appspot.com/sales?${searchQueries}`,
    {
      method: "GET",
      headers: {
        "X-AUTOBIZZ-TOKEN": token,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch sales data");

  const data = await res.json();
  // console.log(data.pagination);

  return {
    paginationTokens: data.pagination,
    salesData: data.results.Sales,
  };
}
