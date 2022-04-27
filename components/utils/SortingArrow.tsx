import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

export type SortOrder = "asc" | "desc";

interface SortingArrowProps {
  sortOrder: SortOrder;
}

export const SortingArrow = ({ sortOrder }: SortingArrowProps) => {
  return sortOrder === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />;
};
