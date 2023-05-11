import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { UPDATE_USER_BY_TOKEN } from "@/graphql/mutations/updateUserSession";
import { useMutation } from "@apollo/client";
import { setInventory } from "@/store/itemSlice";
import { setUser } from "@/store/userSlice";
import { User } from "@/types/user";
import { createMasterKey, createCoinBag } from "@/utils/items";
import { CircularProgress, useTheme } from "@mui/material";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserByTokenMutation] = useMutation(UPDATE_USER_BY_TOKEN);
  const theme = useTheme();

  useGoogleOneTapLogin({
    cancel_on_tap_outside: false,
    onSuccess: async (credentialResponse) => {
      setLoading(true);
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

      setLoading(false);
      navigate("./ItemSelection");
    },
    onError: () => {
      setLoading(false);
      console.log("Login Failed");
    },
  });

  return <>{!loading && <CircularProgress />}</>;
};

export default Login;
