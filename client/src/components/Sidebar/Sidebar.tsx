import { Center, Stack } from "@mantine/core";
import {
  IconGauge,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconShoppingBag,
  IconShoppingCart,
  IconClipboardData,
  IconChartBar,
  // IconMessages,
} from "@tabler/icons-react";
import NavLinkDesign from "./NavlinkDesign";
import classes from "./NavbarStyle.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/services/states/redux/hooks";
import {
  clearAppRedux,
  appInfoRedux,
} from "@/services/states/redux/slices/appSlice";
import { clearUserInfoRedux } from "@/services/states/redux/slices/userSlice";
import { logoutUserRedux } from "@/services/states/redux/slices/authSlice";
import { Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { clearInventory } from "@/services/states/redux/slices/inventorySlice";
import { clearOrder } from "@/services/states/redux/slices/orderSlice";

const mockdata = [
  { icon: IconGauge, label: "Dashboard", path: "/admin" },
  { icon: IconChartBar, label: "Generate Reports", path: "/generate-sales" },
  { icon: IconCalendarStats, label: "Appointment", path: "/appointment" },
  { icon: IconShoppingCart, label: "POS", path: "/pos" },
  { icon: IconShoppingBag, label: "Orders", path: "/orders" },
  { icon: IconClipboardData, label: "Inventory", path: "/inventory" },
  { icon: IconUser, label: "Pet Owners", path: "/petowners" },
  { icon: IconSettings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const { activeSideBar } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () =>
    modals.openConfirmModal({
      title: "",
      centered: true,
      children: (
        <Center mb={10}>
          <Title order={4}>Are you sure you want to log out?</Title>
        </Center>
      ),
      labels: { confirm: "Logout", cancel: "Close" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        dispatch(logoutUserRedux());
        dispatch(clearAppRedux());
        dispatch(clearUserInfoRedux());
        dispatch(clearInventory());
        dispatch(clearOrder());
        navigate("/login", { replace: true });
      },
    });

  const links = mockdata.map((link, index) => (
    <NavLinkDesign
      {...link}
      key={link.label}
      active={index === activeSideBar}
      onClick={() => {
        navigate(link.path!);
        dispatch(
          appInfoRedux({
            activeSideBar: index,
          })
        );
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>{/* <MantineLogo type="mark" size={30} /> */}</Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        {/* <NavLinkDesign icon={IconSwitchHorizontal} label="Change account" /> */}
        {/* <NavLinkDesign
          icon={IconSettings}
          label="Edit Profile"
          // onClick={handleLogout}
        /> */}
        <NavLinkDesign
          icon={IconLogout}
          label="Logout"
          onClick={handleLogout}
        />
      </Stack>
    </nav>
  );
};

export default Sidebar;
