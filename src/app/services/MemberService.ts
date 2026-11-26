import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../lib/types/member";

class MemberService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }
  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/get-users";
      const result = await axios.get(url);
      console.log("getTopUsers", result);

      return result.data;
    } catch (err) {
      console.log("error, getTopusers", err);
      throw err;
    }
  }
  public async getRestaurant(): Promise<Member> {
    try {
      const url = this.path + "/member/restaurant";
      const result = await axios.get(url);
      console.log("getTopUsers", result);
      const restaurant: Member = result.data;
      return result.data;
    } catch (err) {
      console.log("error, getTopusers", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + "/member/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signUp", result);

      const member: Member = result.data.member;
      console.log("member", member);
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("memberSignUp err", err);
      throw err;
    }
  }
  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + "/member/login";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("login", result);

      const member: Member = result.data.member;
      console.log("member", member);
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("login err", err);
      throw err;
    }
  }

  public async logout(): Promise<boolean> {
    try {
      const url = this.path + "/member/logout";
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout", result);

      localStorage.removeItem("memberData");
      return result.data.logout;
    } catch (err) {
      console.log("logout err", err);
      throw err;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      if (input.memberNick) formData.append("memberNick", input.memberNick);
      if (input.memberPhone) formData.append("memberPhone", input.memberPhone);
      if (input.memberAddress !== undefined)
        formData.append("memberAddress", input.memberAddress);
      if (input.memberDesc !== undefined)
        formData.append("memberDesc", input.memberDesc);

      // Agar yangi File tanlangan bo'lsa, FormData ga biriktiramiz
      if (input.memberImage && typeof input.memberImage !== "string") {
        formData.append("memberImage", input.memberImage);
      }

      // FormData yuborilganda axios Content-Type va boundary ni avtomatik o'rnatadi
      const result = await axios.post(`${this.path}/member/update`, formData, {
        withCredentials: true,
      });
      console.log("updateMember result:", result);

      const member: Member = result.data?.member
        ? result.data.member
        : result.data;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("updateMember err:", err);
      throw err;
    }
  }
}
export default MemberService;
