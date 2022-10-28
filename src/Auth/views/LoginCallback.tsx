import { useNavigate, useSearchParams  } from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "../hooks/AuthHooks";


const LoginCallback = () => {
    const [searchParams] = useSearchParams();
    const auth = useAuth()
    auth.login(
        searchParams.get("token"),
        searchParams.get("refresh")
    )

    let navigate = useNavigate()
    useEffect(() =>
            navigate("/")
        , [])
}

export default LoginCallback;
