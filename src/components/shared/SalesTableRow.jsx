import { TableCell, TableRow } from "@/components/ui/table";

function SalesTableRow({ item }) {
  const { id, date, price, email, phone } = item;
  return (
    <TableRow key={id}>
      <TableCell className="font-medium">{date}</TableCell>
      <TableCell>${price.toLocaleString()}</TableCell>
      <TableCell className="text-sm text-muted-foreground">{email}</TableCell>
      <TableCell className="text-sm text-muted-foreground">{phone}</TableCell>
    </TableRow>
  );
}

export default SalesTableRow;
