import type { LinksFunction } from "@remix-run/node";
import Header from "~/components/Header";
import SearchInput from "~/components/SearchInput";
import headerUrl from "~/styles/header.css";
import inputUrl from "~/styles/search_input.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: headerUrl },
    { rel: "stylesheet", href: inputUrl },
  ];
};

export default function Index() {
  return (
    <>
      <Header />;
      <SearchInput />
    </>
  );
}
