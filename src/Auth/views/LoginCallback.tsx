import { useNavigate, useSearchParams  } from "react-router-dom";
import {useEffect} from "react";
import {backendClient} from "../../common/clients/http/BackendClient";
import {useAuth} from "../hooks/AuthHooks";


const LoginCallback = () => {
    const [searchParams] = useSearchParams();
    backendClient.setJwtToken(searchParams.get("token"));

    let navigate = useNavigate()
    useEffect(() =>
            navigate("/")
        , [])
}

export default LoginCallback;
