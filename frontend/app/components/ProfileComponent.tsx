import { Dropdown, Avatar, theme, DropdownItem, DropdownDivider } from "flowbite-react";
import { ChevronDown, Lock, Truck, Wallet, Heart, ArrowsRepeat, GiftBox, MailBox, User, Cog, Bell, BookOpen, QuestionCircle, ArrowRightToBracket } from "flowbite-react-icons/outline";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { useEffect, useState } from "react";
import { profile } from "console";
import Link from "next/link";

interface ProfileComponentProps {
  className?: string;
}


const logout = async () => {

  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    window.location.reload();
  }
};

export default function ProfileComponent({ className }: ProfileComponentProps) {

  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/me/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setProfileImage(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchUserProfileImage();

  }, [])
  return (
    <div className={className}>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <span className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            {profileImage ? (
              <Avatar
                alt="Account"
                img={profileImage.profile_image}
                rounded
                size="xs"
              />
            ) : (<Avatar
              alt="Account"
              img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              rounded
              size="xs"
            />)}
            <ChevronDown className="size-6 text-gray-900 dark:text-white" />
          </span>
        }
        theme={{
          content: twMerge(theme.dropdown.content, "w-56 rounded-lg pb-2"),
          floating: {
            base: twMerge(theme.dropdown.floating.base, "rounded-lg"),
          },
        }}
      >
        <Link href={'/orders'}>
          <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
            <Truck className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            &nbsp;My Orders
          </DropdownItem>
        </Link>
        {/* <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <Wallet className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;My Wallet
        </DropdownItem> */}
        {/* <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <Heart className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;Favourites Items
        </DropdownItem> */}
        {/* <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <ArrowsRepeat className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;My Returns
        </DropdownItem> */}
        {/* <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <GiftBox className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;Gift Cards
        </DropdownItem>
        <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <MailBox className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;Subscriptions
        </DropdownItem> */}
        <DropdownDivider className="my-2" />
        <Link href={'/account'}>
          <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
            <User className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            &nbsp;Account
          </DropdownItem>
        </Link>
        {/* <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <Cog className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;Settings
        </DropdownItem>
        <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <Lock className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;Privacy
        </DropdownItem>
        <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <Bell className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;Notifications
        </DropdownItem>
        <DropdownDivider className="my-2" />
        <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <BookOpen className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;Help Guide
        </DropdownItem>
        <DropdownItem className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-gray-900">
          <QuestionCircle className="me-1 size-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          &nbsp;Help Center
        </DropdownItem> */}

        <DropdownDivider className="my-2" />
        <DropdownItem onClick={logout} className="group mx-2 w-[calc(100%-1rem)] rounded-lg px-3 text-red-600 hover:bg-red-50 hover:text-red-500 dark:text-red-600 dark:hover:text-red-500">
          <ArrowRightToBracket className="me-1 size-4" />
          &nbsp;Sign Out
        </DropdownItem>
      </Dropdown>
    </div >
  );
}