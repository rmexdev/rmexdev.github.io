import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";
import { z } from "zod";

export const myCompSchema2 = z.object({
  logoColor1: zColor(),
  logoColor2: zColor(),
});

export const Logo: React.FC<z.infer<typeof myCompSchema2>> = () => {
  return (
    <AbsoluteFill
      style={{
        top: "50%",
        left: "50%",
      }}
    >
      <div
        style={{ transform: "translate(-50%, -50%)", height: "400px", width: "400px" }}
      >
        <Img src={staticFile("/logo.jpeg")} style={{ borderRadius: "50%" }}/>
      </div>
    </AbsoluteFill>
  );
};
