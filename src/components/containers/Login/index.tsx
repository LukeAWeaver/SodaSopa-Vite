import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleOneTapLogin } from "@react-oauth/google";

import { UPDATE_USER_BY_TOKEN } from "@/graphql/mutations/updateUserSession";
import { useMutation } from "@apollo/client";

import { setInventory } from "@/store/itemSlice";
import { setUser } from "@/store/userSlice";
import { User } from "@/types/user";
import { createMasterKey, createCoinBag } from "@/utils/items";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserByTokenMutation] = useMutation(UPDATE_USER_BY_TOKEN);

  useGoogleOneTapLogin({
    cancel_on_tap_outside: false,
    onSuccess: async (credentialResponse) => {
      const user: User = {
        googleIdToken: credentialResponse.credential ?? "",
      };
      dispatch(setUser(user));
      const { data } = await updateUserByTokenMutation({
        variables: {
          input: { googleIdToken: credentialResponse.credential },
        },
      });
      const { updateUserByToken } = data;
      const masterKey = createMasterKey(updateUserByToken?.masterKeys ?? 0);
      const coinBag = createCoinBag(updateUserByToken?.coins ?? 0);
      dispatch(
        setInventory([
          { key: "masterKey", value: masterKey },
          { key: "coinBag", value: coinBag },
        ]),
      );

      navigate("./ItemSelection");
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return <></>;
};

export default Login;
