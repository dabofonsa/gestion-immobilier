import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import { immobilier } from  '../assets';

import * as React from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemedTitleV2 } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";


export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>({
    v3LegacyAuthProviderCompatible: true,
  });

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box component="div" sx={{ backgroundcolor: "#FCFCFC" }} >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display:"flex",
            gap:"36px",
            justifyContent:"center",
            flexDirection:"column",
          }}  
        >

           <div>
            <img src={immobilier} alt="Immobilier" height="350px"/>
            <p>
              <h3>Bienvenue sur notre plateforme immobilière.<br/></h3>
              <h5>Connectez vous avec votre compte google pour commencer.</h5>
            </p>
          </div>
          <Box mt={4} sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <GoogleButton />
          </Box>

          {/* <ThemedTitleV2
            collapsed={false}
            wrapperStyles={{
              fontSize: "22px",
              justifyContent: "center",
            }} />

          <GoogleButton /> */}

          <Typography align="center" color={"text.secondary"} fontSize="15px">
            Powered by @Fonsa
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
