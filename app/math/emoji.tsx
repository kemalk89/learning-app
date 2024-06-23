import { EmojiHappy, EmojiSad, EmojiThinking } from "@/app/components/emojis";

export const Emoji = ({ type }: { type: string }) => {
  if (type === "thinking") {
    return <EmojiThinking className="u-text-8xl" />;
  }

  if (type === "sad") {
    return <EmojiSad className="u-text-8xl" />;
  }

  if (type === "happy") {
    return <EmojiHappy className="u-text-8xl" />;
  }

  return null;
};
