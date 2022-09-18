import { FC, Fragment, useState, useEffect, useCallback, useMemo } from "react";
import { ConnectButton, NavItem } from "@components";
import { Icon, Typography } from "@mui/material";
import { StyledHeader, StyledNavContainer } from "./header.styles";

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {} = props;

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
            <Icon>
              <img
                src="./logoSvg.svg"
                height={30}
                width={30}
                style={{ objectFit: "cover" }}
              />
            </Icon>
            <Typography
              variant="h5"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Straps
            </Typography>
          </StyledNavContainer>

          <StyledNavContainer>
            <NavItem href="#" target="">
              Home
            </NavItem>
            <NavItem href="#" target="">
              FAQ
            </NavItem>

            <NavItem href="#">Road Map</NavItem>
            <ConnectButton />
          </StyledNavContainer>
        </StyledNavContainer>
      </StyledHeader>
    </Fragment>
  );
};

interface HeaderProps {}
