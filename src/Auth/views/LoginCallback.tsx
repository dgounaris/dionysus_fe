import { useNavigate, useSearchParams  } from "react-router-dom";
import {useEffect} from "react";
import {backendClient} from "../../common/clients/http/BackendClient";


const LoginCallback = () => {
    const [searchParams] = useSearchParams();
    backendClient.setJwtToken(searchParams.get("token"));

    let navigate = useNavigate()
    useEffect(() =>
            navigate("/selection")
        , [])
}

export default LoginCallback;
