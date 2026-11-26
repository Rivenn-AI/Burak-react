import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useEffect, useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();

  // Rasm URL manzilini to'g'ri shakllantirish (blob, http yoki serverApi orqali)
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

  const [memberImage, setMemberImage] = useState<string>(
    getImageUrl(authMember?.memberImage),
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    },
  );

  // authMember o'zgarganda (masalan yangilanganda) forma va rasmni sinxronlash
  useEffect(() => {
    if (authMember?.memberImage) {
      setMemberImage(getImageUrl(authMember.memberImage));
    }
    setMemberUpdateInput({
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    });
  }, [authMember]);

  /** Handlers */

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDesciptionHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);

      // Yangi rasmni darhol o'rnatamiz
      if (result?.memberImage) {
        setMemberImage(getImageUrl(result.memberImage));
      }
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified Successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("file: ", file);
    const fileType = file.type?.toLowerCase();
    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      setMemberUpdateInput((prev) => ({
        ...prev,
        memberImage: file,
      }));
      // Pre-rendering: tanlangan zahoti blob orqali ekranda ko'rsatish
      setMemberImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img
          key={memberImage}
          src={memberImage}
          className={"mb-image"}
          alt=""
        />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label">
              <CloudDownloadIcon />
              <input
                type="file"
                hidden
                accept="image/jpg, image/jpeg, image/png"
                onChange={handleImageViewer}
              />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick ?? ""}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone"}
            value={memberUpdateInput.memberPhone ?? ""}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={
              authMember?.memberAddress
                ? authMember.memberAddress
                : "no address"
            }
            value={memberUpdateInput.memberAddress ?? ""}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={
              authMember?.memberDesc ? authMember.memberDesc : "no description"
            }
            value={memberUpdateInput.memberDesc ?? ""}
            name="memberDesc"
            onChange={memberDesciptionHandler}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={handleSubmitButton}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
