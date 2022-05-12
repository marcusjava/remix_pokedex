import { Form } from "@remix-run/react";

export default function SearchInput() {
  return (
    <Form method="post">
      <input type="text" name="search" required />
      <button type="submit">Ir</button>
    </Form>
  );
}
