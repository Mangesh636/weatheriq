import type { ComponentProps } from "react";

import { HugeiconsIcon } from "@hugeicons/react";

type IconProps = ComponentProps<typeof HugeiconsIcon>;

export function Icons({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  ...rest
}: IconProps) {
  return (
    <>
      <HugeiconsIcon
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        {...rest}
      />
    </>
  );
}
