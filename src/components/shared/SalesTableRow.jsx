import { TableCell, TableRow } from "@/components/ui/table";

function SalesTableRow({ item }) {
  const { id, date, price, customerEmail, customerPhone } = item;
  return (
    <TableRow key={id}>
      <TableCell className=" text-gray-600 ">{date.split("T")[0]}</TableCell>
      <TableCell className=" text-gray-600">
        ${price.toLocaleString()}
      </TableCell>
      <TableCell className=" text-sm text-gray-600">{customerEmail}</TableCell>
      <TableCell className=" text-sm text-gray-600">{customerPhone}</TableCell>
    </TableRow>
  );
}

export default SalesTableRow;
