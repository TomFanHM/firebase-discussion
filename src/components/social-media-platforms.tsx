import React from "react";

import {
  FacebookSvg,
  LinkedInSvg,
  PinterestSvg,
  RedditSvg,
  TelegramSvg,
  TumblrSvg,
  TwitterSvg,
  WhatsAppSvg,
} from "./svg";

export const socialMediaPlatforms: {
  name: string;
  baseSrc: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    name: "Facebook",
    baseSrc: "https://www.facebook.com/sharer/sharer.php?u=",
    icon: (props) => <FacebookSvg {...props} />,
  },
  {
    name: "WhatsApp",
    baseSrc: "https://api.whatsapp.com/send?text=",
    icon: (props) => <WhatsAppSvg {...props} />,
  },
  {
    name: "LinkedIn",
    baseSrc: "https://www.linkedin.com/shareArticle?mini=true&url=",
    icon: (props) => <LinkedInSvg {...props} />,
  },
  {
    name: "Twitter",
    baseSrc: "https://twitter.com/intent/tweet?url=",
    icon: (props) => <TwitterSvg {...props} />,
  },
  {
    name: "Pinterest",
    baseSrc: "https://pinterest.com/pin/create/button/?url=",
    icon: (props) => <PinterestSvg {...props} />,
  },
  {
    name: "Reddit",
    baseSrc: "https://www.reddit.com/submit?url=",
    icon: (props) => <RedditSvg {...props} />,
  },
  {
    name: "Tumblr",
    baseSrc: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=",
    icon: (props) => <TumblrSvg {...props} />,
  },
  {
    name: "Telegram",
    baseSrc: "https://telegram.me/share/url?url=",
    icon: (props) => <TelegramSvg {...props} />,
  },
];
