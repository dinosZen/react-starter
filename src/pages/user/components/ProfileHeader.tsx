import { MoreHorizontal, ChevronDown, BadgeCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileHeaderProps {
  name: string;
  profileImage: string;
  isVerified?: boolean;
}

export const ProfileHeader = ({
  name,
  profileImage,
  isVerified = true,
}: ProfileHeaderProps) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center gap-4">
          {/* Profile image */}
          <div className="relative">
            <div className="h-[160px] w-[160px] rounded-full border-4 border-text-primary-default overflow-hidden bg-background-primary-default">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-full h-full text-text-secondary-default" />
              )}
            </div>

            {isVerified && (
              <div className="absolute bottom-2 right-2 rounded-full p-0">
                <BadgeCheck className="bg-[#0788F5] rounded-full w-7 h-7" />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-semibold">{name}</h1>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background-primary-default  transition duration-300 ease-in-out"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background-primary-default"
            >
              <DropdownMenuItem>Edit profile</DropdownMenuItem>
              <DropdownMenuItem>Delete user</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-background-brand-default text-text-primary-inverse font-medium flex items-center gap-1">
            <span>Suspend</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
