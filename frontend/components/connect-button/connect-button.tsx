import { FC, Fragment, useEffect } from "react";
import { useMediaQuery } from "@hooks";
import { Wallet } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ConnectButton as RainbowButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export const ConnectButton: FC<ConnectButtonProps> = (
  props: ConnectButtonProps
) => {
  const {} = props;

  const isMobile = useMediaQuery(1020);

  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

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
                    {isMobile ? null : (
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
                              <Image
                                width={24}
                                height={24}
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      endIcon={<Wallet />}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                        backgroundColor: "#FFA1A7",
                        "&:hover": {
                          backgroundColor: "#141414",
                        },
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
