import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "../../../css/mypage.css";

interface Member {
  memberNick: string;
  memberImage: string;
}

interface UserPageProps {
  authMember?: Member | null;
}

interface Profile {
  nick: string;
  phone: string;
  address: string;
  desc: string;
  image: string;
}

export default function UserPage(props: UserPageProps) {
  const { authMember } = props;

  // Default values are the ones from the design.
  // Replace them with your backend data later.
  const initial: Profile = {
    nick: authMember?.memberNick ?? "Justin",
    phone: "8210 2469 4424",
    address: "South Korea, Busan",
    desc: "The best man",
    image: authMember?.memberImage ?? "/img/justin.webp",
  };

  const [draft, setDraft] = useState<Profile>(initial); // what you type
  const [saved, setSaved] = useState<Profile>(initial); // what the card shows

  /** HANDLERS **/
  const handleChange =
    (key: keyof Profile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft({ ...draft, [key]: e.target.value });
    };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      alert("Please upload JPG, JPEG or PNG only!");
      return;
    }
    setDraft({ ...draft, image: URL.createObjectURL(file) });
  };

  const handleSave = () => setSaved(draft);

  return (
    <div className={"my-page"}>
      <Container>
        <Stack className={"my-page-config"}>
          {/* ---------- LEFT: edit form ---------- */}
          <Stack className={"config-left"}>
            <Box className={"upload-section"}>
              <img className={"upload-avatar"} src={draft.image} alt="" />
              <Box className={"upload-info"}>
                <div className={"upload-title"}>Upload image</div>
                <p className={"upload-hint"}>JPG, JPEG, PNG format only!</p>
                <div className={"upload-button"}>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={handleImage}
                  />
                  <label htmlFor="file-upload">
                    <CloudDownloadIcon />
                  </label>
                </div>
              </Box>
            </Box>

            <input
              className={"config-input"}
              type="text"
              placeholder="Username"
              value={draft.nick}
              onChange={handleChange("nick")}
            />

            <Stack className={"config-row"}>
              <input
                className={"config-input"}
                type="text"
                placeholder="Phone number"
                value={draft.phone}
                onChange={handleChange("phone")}
              />
              <input
                className={"config-input"}
                type="text"
                placeholder="Address"
                value={draft.address}
                onChange={handleChange("address")}
              />
            </Stack>

            <textarea
              className={"config-input config-area"}
              placeholder="Description"
              value={draft.desc}
              onChange={handleChange("desc")}
            />

            <Box className={"save-row"}>
              <Button
                variant={"contained"}
                className={"save-button"}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Stack>

          {/* ---------- RIGHT: profile card ---------- */}
          <Stack className={"config-right"}>
            <Box className={"avatar-box"}>
              <img className={"card-avatar"} src={saved.image} alt="" />
              <div className={"card-badge"}>
                <img src={"/img/user-icon.webp"} alt="" />
              </div>
            </Box>

            <span className={"card-name"}>{saved.nick}</span>
            <span className={"card-role"}>USER</span>
            <span className={"card-address"}>{saved.address}</span>

            <Box className={"card-social"}>
              <FacebookIcon />
              <InstagramIcon />
              <NearMeOutlinedIcon />
              <YouTubeIcon />
            </Box>

            <p className={"card-desc"}>{saved.desc}</p>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
