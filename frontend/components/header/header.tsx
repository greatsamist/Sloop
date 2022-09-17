import { FC, Fragment } from "react";
import { ConnectButton, NavItem } from "@components";
import { Icon, Typography } from "@mui/material";
import { StyledHeader, StyledNavContainer } from "./header.styles";

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {} = props;

  return (
    <Fragment>
      <StyledHeader>
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
              <Typography variant="h6">Home</Typography>
            </NavItem>
            <NavItem href="#" target="">
              <Typography variant="h6">FAQ</Typography>
            </NavItem>

            <NavItem href="#">
              <Typography variant="h6">Road Map</Typography>
            </NavItem>
            <ConnectButton />
          </StyledNavContainer>
        </StyledNavContainer>
      </StyledHeader>
    </Fragment>
  );
};

interface HeaderProps {}
