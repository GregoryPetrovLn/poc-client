import { HAS_VISITED_BEFORE } from "@/service/localStorageItems";
import { getItemFromLocalStorage } from "@/service/utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}
const InitAppWrapper = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const hasVisitedBefore = getItemFromLocalStorage(HAS_VISITED_BEFORE);

    if (hasVisitedBefore) {
      if (router.asPath === "/") {
        router.push("/products");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default InitAppWrapper;
