import React from "react";
import AdminFooter  from "./AdminFooter";
import AdminHeader  from "./AdminHeader";

export const AdminLayout = ({
                           withoutFooter = false,
                           children,
                       }: {
    withoutFooter?: boolean;
    children: React.ReactNode;
}) => {
    return (
        <>
            <AdminHeader />
            {children}
            {!withoutFooter && <AdminFooter />}
        </>
    );
};
