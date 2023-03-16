import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { ConnectButton, NavItem } from "@components";
import { ChatModal } from "@components/modal";
import { Notifications } from "@mui/icons-material";
import { Badge, Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

import { StyledHeader, StyledNavContainer } from "./header.styles";

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {} = props;
  const { isConnected } = useAccount();

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    setScrollPosition((typeof window !== "undefined" && window.scrollY) || 0);
  }, []);

  const onScroll = useCallback(() => {
    if (window.scrollY >= 0 && window.scrollY <= 500) {
      requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll.bind(this));
    return () => {
      window.removeEventListener("scroll", onScroll.bind(this));
    };
  }, [onScroll]);

  const detached = useMemo(() => {
    return scrollPosition > 0 ? 4 : 0;
  }, [scrollPosition]);

  return (
    <Fragment>
      <StyledHeader elevation={detached}>
        <StyledNavContainer>
          <StyledNavContainer>
            <Image src="/logoSvg.svg" height={40} width={40} alt="logo" />

            <Link href="/">
              <Typography
                variant="h5"
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
              >
                Straps
              </Typography>
            </Link>
          </StyledNavContainer>
          <StyledNavContainer>
            {!isConnected && (
              <>
                <NavItem href="/" target="">
                  Home
                </NavItem>

                <NavItem href="/create" target="">
                  CREATE
                </NavItem>

                <NavItem href="#">Road Map</NavItem>
              </>
            )}
            {isConnected ? (
              <Box
                sx={{
                  mr: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <ChatModal />

                <Badge color="secondary" badgeContent={2} showZero>
                  <Notifications />
                </Badge>
              </Box>
            ) : (
              ""
            )}
            <ConnectButton />
          </StyledNavContainer>
        </StyledNavContainer>
      </StyledHeader>
    </Fragment>
  );
};

interface HeaderProps {}
