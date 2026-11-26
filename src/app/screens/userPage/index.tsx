import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import "../../../css/userPage.css";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) history.push("/");

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "/icons/default-user.svg";
    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://") ||
      imagePath.startsWith("blob:")
    ) {
      return imagePath;
    }
    let clean = imagePath.replace(/\\/g, "/");
    if (clean.startsWith("/")) clean = clean.slice(1);
    return `${serverApi}/${clean}`;
  };

  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <div className={"order-user-img"}>
                  <img
                    key={authMember?.memberImage}
                    src={getImageUrl(authMember?.memberImage)}
                    className={"order-user-avatar"}
                    alt=""
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={
                        authMember?.memberType === MemberType.RESTAURANT
                          ? "/icons/restaurant.svg"
                          : "/icons/user-badge.svg"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <span className={"order-user-name"}>
                  {authMember?.memberNick}
                </span>
                <span className={"order-user-prof"}>
                  {authMember?.memberType}
                </span>
                <span className={"order-user-prof"}>
                  {authMember?.memberPhone
                    ? authMember.memberPhone
                    : "no phone"}
                </span>
              </Box>
              <Box className={"liner"}></Box>
              <Box className={"order-user-address"}>
                <div className={"spec-address-txt"}>
                  {authMember?.memberAddress
                    ? authMember.memberAddress
                    : "no address"}
                </div>
              </Box>
            </Box>
            <Box className={"order-info-box"}>
              <FacebookIcon />
              <InstagramIcon />
              <TelegramIcon />
              <YouTubeIcon />
            </Box>
            <p className={"user-desc"}>
              {authMember?.memberDesc
                ? authMember.memberDesc
                : "no description"}
            </p>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
