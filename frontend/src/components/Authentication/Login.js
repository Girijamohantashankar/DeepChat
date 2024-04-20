import { useState } from "react";
import axios from "axios";
import { Link, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import "./Login.css";


const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <div className="login_main">
      <div className="panel">
      <div className="state login_content">
        <br />
        <i className="fa fa-unlock-alt"></i>
        <br />
        <h1>Log in</h1>
      </div>
      <div className="form">
        <input placeholder="Email" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="login btn_login" onClick={submitHandler} isLoading={loading}>Login</div>
      </div>
      <div className="fack">
        <a href="#">
          <i className="fa fa-question-circle"></i>Forgot password?
       

        </a>
      </div>
    </div>
    </div> 
  );
};

export default Login;
