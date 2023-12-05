/* eslint-disable jsx-a11y/alt-text */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { INSERT_IMAGE_COMMAND } from "../plugins/image-plugin";
import { Image } from "lucide-react";
const ImageToolbar = ({ editor }: { editor: any }) => {
  const [link, setLink] = useState("");
  return (
    <Dialog>
      <DialogTrigger className="hover:bg-gray-200 px-2 rounded-lg">
        <Image strokeWidth={1} width={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed Image</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                src: link,
                altText: "",
              });
              setLink("");
            }}
          >
            Embed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageToolbar;
