import Item from "../item";
import { usePathname } from "next/navigation";
const Menu: React.FC = () => {
  const path = usePathname();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      <Item
        href={`${path}/invoices`}
        description="See all your Invoices or create a new one"
      >
        Invoices
      </Item>
      <Item
        href={`${path}/payments`}
        description="Check your confirmed payments"
      >
        Payments
      </Item>
      <Item href={`${path}/customers`} description="Manage your customer base">
        Manage Customers
      </Item>
      <Item href={`${path}/users`} description="Manage All Users">
        Manage Users
      </Item>
    </div>
  );
};

export default Menu;
