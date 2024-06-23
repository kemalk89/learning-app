// https://www.quackit.com/character_sets/emoji/emoji_v3.0/unicode_emoji_v3.0_characters_all.cfm
type EmojiProps = {
  className?: string;
};

export const EmojiThinking = ({ className }: EmojiProps) => {
  return <span className={className}>&#x1F914;</span>;
};

export const EmojiSad = ({ className }: EmojiProps) => {
  return <span className={className}>&#x1F611;</span>;
};

export const EmojiHappy = ({ className }: EmojiProps) => {
  return <span className={className}>&#x1F601;</span>;
};

export const EmojiFlag = ({ className }: EmojiProps) => {
  return <span className={className}>&#x1F3C1;</span>;
};

export const EmojiOwl = ({ className }: EmojiProps) => {
  return <span className={className}>&#x1F989;</span>;
};
