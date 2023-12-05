"use client";

import { INSERT_YOUTUBE_COMMAND } from "../plugins/youtube-plugin";
import { Youtube } from "lucide-react";
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
const YoutubeToolbar = ({ editor }: { editor: any }) => {
  const [link, setLink] = useState("");
  const parseUrl = (url: string) => {
    const match =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

    const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;

    if (id != null) {
      return id;
    }

    return null;
  };
  return (
    <Dialog>
      <DialogTrigger className="hover:bg-gray-200 px-2 rounded-lg">
        <Youtube strokeWidth={1} width={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed Youtube Video</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="https://www.youtube.com/watch?v=GpmOn4RyzZI"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, parseUrl(link));
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

export default YoutubeToolbar;
