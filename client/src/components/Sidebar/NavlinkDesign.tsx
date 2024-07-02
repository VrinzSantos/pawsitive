import { Tooltip, UnstyledButton, rem } from "@mantine/core";
import { IconHome2 } from "@tabler/icons-react";

import classes from "./NavbarStyle.module.css";
interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavLinkDesign = ({
  icon: Icon,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon
          style={{ width: rem(20), height: rem(20) }}
          color={active ? "black" : "white"}
          stroke={1.5}
        />
      </UnstyledButton>
    </Tooltip>
  );
};

export default NavLinkDesign;
