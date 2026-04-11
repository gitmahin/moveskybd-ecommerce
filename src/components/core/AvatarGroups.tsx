import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";

export type AvatarGroupType = {
  src?: string;
  alt?: string;
  fallback?: string;
};

type AvatarGroupsPropsType = {
  data: AvatarGroupType[];
};

export function AvatarGroups({ data }: AvatarGroupsPropsType) {
  return (
    <AvatarGroup>
      {data.map((item, i) => {
        return (
          <Avatar key={i}>
            <AvatarImage src={item.src ?? ""} alt={item.alt ?? "Undefined"} />
            <AvatarFallback>{item.fallback ?? "UN"}</AvatarFallback>
          </Avatar>
        );
      })}
    </AvatarGroup>
  );
}
