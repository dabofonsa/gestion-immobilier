import React from "react";
import { useGetIdentity } from "@refinedev/core";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header: React.FC = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const showUserInfo = user && (user.name || user.avatar);

    return (
        <AppBar
            color="default"
            position="sticky"
            elevation={0}
            sx={{ background: "#fcfcf" }}
        >
            <Toolbar>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    {showUserInfo && (
                        <Stack direction="row" gap="16px" alignItems="center">
                            {user.avatar && (
                                <Avatar src={user?.avatar} alt={user?.name} />
                            )}
                            {user.name && (
                                <Typography variant="subtitle2">
                                    {user?.name}
                                </Typography>
                            )}
                        </Stack>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};







// import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
// import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
// import AppBar from "@mui/material/AppBar";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { useGetIdentity } from "@refinedev/core";
// import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
// import React, { useContext } from "react";
// import { ColorModeContext } from "../../../contexts/color-mode";

// type IUser = {
//   id: number;
//   name: string;
//   avatar: string;
// };

// export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
//   isSticky = true,
// }) => {
//   const { mode, setMode } = useContext(ColorModeContext);

//   const { data: user } = useGetIdentity<IUser>();

//   return (
//     <AppBar position={isSticky ? "sticky" : "relative"}>
//       <Toolbar>
//         <Stack
//           direction="row"
//           width="100%"
//           justifyContent="flex-end"
//           alignItems="center"
//         >
//           <HamburgerMenu />
//           <Stack
//             direction="row"
//             width="100%"
//             justifyContent="flex-end"
//             alignItems="center"
//           >
//             <IconButton
//               color="inherit"
//               onClick={() => {
//                 setMode();
//               }}
//             >
//               {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
//             </IconButton>

//             {(user?.avatar || user?.name) && (
//               <Stack
//                 direction="row"
//                 gap="16px"
//                 alignItems="center"
//                 justifyContent="center"
//               >
//                 {user?.name && (
//                   <Typography
//                     sx={{
//                       display: {
//                         xs: "none",
//                         sm: "inline-block",
//                       },
//                     }}
//                     variant="subtitle2"
//                   >
//                     {user?.name}
//                   </Typography>
//                 )}
//                 <Avatar src={user?.avatar} alt={user?.name} />
//               </Stack>
//             )}
//           </Stack>
//         </Stack>
//       </Toolbar>
//     </AppBar>
//   );
// };
