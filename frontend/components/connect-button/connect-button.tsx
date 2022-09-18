import { Wallet } from "@mui/icons-material";
import { useMediaQuery } from "@hooks";
import { Button } from "@mui/material";
import { ConnectButton as RainbowButton } from "@rainbow-me/rainbowkit";
import { FC, Fragment } from "react";

export const ConnectButton: FC<ConnectButtonProps> = (
  props: ConnectButtonProps
) => {
  const {} = props;

  const isMobile = useMediaQuery(800);

  return (
    <Fragment>
      <RainbowButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <Button
                      variant="outlined"
                      endIcon={<Wallet />}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                      }}
                      onClick={openConnectModal}
                    >
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button
                      variant="outlined"
                      endIcon={<Wallet />}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                      }}
                      onClick={openChainModal}
                    >
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <Button
                      variant="outlined"
                      endIcon={<Wallet />}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                      }}
                      onClick={openChainModal}
                    >
                      {!isMobile && chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 24, height: 24 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>

                    <Button
                      variant="outlined"
                      endIcon={<Wallet />}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                      }}
                      onClick={openAccountModal}
                    >
                      {account.displayName}
                      {/* {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""} */}
                    </Button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </RainbowButton.Custom>
    </Fragment>
  );
};

interface ConnectButtonProps {}
