import { useCallback, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState<object>({});
  const [load, setLoad] = useState<boolean>(false);
  const [erro, setErro] = useState<boolean | string>(false);

  interface Data {
    status: 'ok',
    ErroMsg: string,
    token: string,
    userData: {
      email: string,
      id: number,
      name: string,
    }
    boards: object[],
  }

  type returnF<T> = {
    response: Promise<Response>,
    json: T,
  }

  const request = useCallback(async (url: string, options: object): Promise<returnF<Data>> => {
    let response: Response | undefined;
    let json: Data | undefined;

    try {
      setErro(false);
      setLoad(true);

      response = await fetch(url, options);
      json = await response.json();

      if (response.ok === false) {
        if (json && json.ErroMsg) {
          setErro(json.ErroMsg)
        }
      }
    } catch (err) {
      json = undefined;
      setErro(err.message);
    } finally {
      setData(json ? json : {});
      setLoad(false);

      return { response, json };
    }
  }, []);

  return {
    data,
    load,
    erro,
    request
  }
};

export default useFetch;
