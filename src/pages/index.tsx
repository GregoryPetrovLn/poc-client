import Button from "@/components/Button";
import CustomLink from "@/components/CustomLink";
import { HAS_VISITED_BEFORE } from "@/service/localStorageItems";
import { setItemToLocalStorage } from "@/service/utils";
import { useRouter } from "next/router";

interface NavLink {
  href: string;
  title: string;
}
const navLinks: NavLink[] = [
  {
    href: "https://github.com/gregory-pet-projects",
    title: "GitHub",
  },
  {
    href: "https://github.com/GregoryPetrovLn/poc-client",
    title: "Project Repository",
  },
  {
    href: "https://www.linkedin.com/in/gregory-petrov/",
    title: "LinkedIn",
  },
];
const Home = () => {
  const router = useRouter();

  const goToProjectHandler = () => {
    //FIXME - dont forget to change it
    router.push("/products");
    setItemToLocalStorage(HAS_VISITED_BEFORE, true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-black text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to test project for{" "}
        <CustomLink
          href={"https://poc-system.com/"}
          title={"POC System"}
          className="text-teal-600 hover:text-teal-700"
        />{" "}
        company!
      </h1>
      <p className="text-xl text-center mb-8 px-10">
        Hey there!
        <br /> Thank you for visiting my project. I hope you will enjoy it!
      </p>
      <Button text="Go to Project" onClick={goToProjectHandler} />
      <div className="mt-8 gap-4 flex">
        {navLinks.map(({ href, title }, idx) => (
          <CustomLink key={idx} href={href} title={title} />
        ))}
      </div>
    </div>
  );
};

export default Home;
