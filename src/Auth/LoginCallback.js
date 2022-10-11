import { useNavigate, useSearchParams  } from "react-router-dom";
import {useEffect} from "react";


const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  localStorage.setItem("dionysus_jwt_token", searchParams.get("token"))

  let navigate = useNavigate()
  useEffect(() =>
      navigate("/selection")
    , [])
}

export default LoginCallback;
