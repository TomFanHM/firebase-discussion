import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";

import { socialMediaPlatforms } from "./social-media-platforms";
import { CopySvg, ShareSvg, SuccessSvg } from "./svg";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

type SocialMediaShareProps = {
  id: string;
};

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({ id }) => {
  const pageUrl = window.location.href + `#${id}`;
  return (
    <Carousel
      className="w-full max-w-full"
      opts={{
        loop: true,
        align: "center",
      }}
    >
      <CarouselContent>
        {socialMediaPlatforms.map((el, index) => (
          <CarouselItem
            key={index}
            className="grid basis-1/5 place-items-center"
          >
            <a
              href={`${el.baseSrc}${encodeURIComponent(pageUrl)}`}
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security measure for opening links in a new tab
              aria-label={`Share on ${el.name}`} // Accessibility improvement
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <span className="sr-only">{el.name}</span>
                <el.icon className="h-4 w-4 fill-current" aria-hidden="true" />
              </Button>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 fill-current" />
      <CarouselNext className="right-0 fill-current" />
    </Carousel>
  );
};

type ShareProps = {
  id: string;
};

const Share: React.FC<ShareProps> = ({ id }) => {
  const pageUrl = window.location.href + `#${id}`;

  const [copied, setCopied] = useState(false);
  const handleClick = async () => {
    // Copy to clipboard
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShareSvg aria-hidden="true" className="h-4 w-4 fill-current" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
        </DialogHeader>
        {/* Social media share */}
        <div className="relative flex flex-col space-y-4">
          <SocialMediaShare id={id} />
          {/* Copy link */}
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={pageUrl} readOnly />
            </div>
            <Button
              size="sm"
              className="px-3"
              type="button"
              onClick={handleClick}
            >
              <span className="sr-only">Copy</span>
              {copied ? (
                <SuccessSvg
                  className="h-4 w-4 fill-current"
                  aria-label="hidden"
                />
              ) : (
                <CopySvg className="h-4 w-4 fill-current" aria-label="hidden" />
              )}
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default Share;
