import * as React from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import DashboardIcon from "@mui/icons-material/Dashboard";

import type { Navigation } from "@toolpad/core/AppProvider";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { auth } from "../auth";
import theme from "../theme";
import { ArticleOutlined, EditRoad, LocalShipping } from "@mui/icons-material";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "deliveries",
    title: "Deliveries",
    icon: <EditRoad />,
  },
  {
    segment: "traks",
    title: "Traks",
    icon: <LocalShipping />,
  },
  {
    segment: "raport",
    title: "Raports",
    icon: <ArticleOutlined />,
  },
];

const BRANDING = {
  title: "My Driver App",
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              session={session}
              authentication={AUTHENTICATION}
              theme={theme}
            >
              {props.children}
            </NextAppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
