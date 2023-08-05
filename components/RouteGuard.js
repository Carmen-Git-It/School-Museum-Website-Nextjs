import { favouritesAtom, searchHistoryAtom } from "@/store";
import {useAtom} from 'jotai';
import { getFavourites, getHistory } from "@/lib/userData";
import {useRouter} from 'next/router';
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ['/register', '/login', '/'];

export default function RouteGuard(props) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()){
      updateAtoms();
    }

    authCheck(router.pathname);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  async function updateAtoms(){
    setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
  }

  function authCheck(url){
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)){
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>
}