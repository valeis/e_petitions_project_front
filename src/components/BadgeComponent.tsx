import React from "react";
import {Badge} from "@chakra-ui/react";
interface DataTableProps {
    item: string
}
export const BadgeComponent : React.FC<DataTableProps> =  ({ item }) => {
    let badgeColor;

    if (item=== "DRAFT") {
        badgeColor = "red";
    } else if (item === "IN_REVIEW") {
        badgeColor = "blue";
    } else {
        badgeColor = "green";
    }
    return (
        <Badge colorScheme={badgeColor}>
            {item}
        </Badge>
    );
};

export default BadgeComponent;
