import { Button } from "../ui/button";
import Link from "next/link";
const CreateCustomerButton: React.FC = () => {
  return (
    <Link href={"./customers/newCustomer"}>
      <Button>Create a new customer</Button>
    </Link>
  );
};

export default CreateCustomerButton;
