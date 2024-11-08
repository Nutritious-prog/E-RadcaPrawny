import { ConfigProvider } from "antd";
import { COLORS } from "assets/colors";
import React from "react";

export const AntdConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                hashed: false,
                components: {
                    Menu: {
                        itemBg: "none",
                        itemHoverBg: "none",
                        itemActiveBg: "none",
                        itemSelectedBg: "none",
                        subMenuItemBg: "none",
                        itemColor: `${COLORS.VERY_DARK_BLUE}`,
                        itemHoverColor: `${COLORS.WHITE}`,
                        itemSelectedColor: `${COLORS.WHITE}`,
                        itemHeight: "40px",
                        fontFamily: "Baloo Paaji 2, serif",
                        fontSize: 20,
                        iconSize: 18,
                        iconMarginInlineEnd: 14,
                    },
                    Dropdown: {
                        fontFamily: "Baloo Paaji 2, serif",
                        fontSize: 16,
                        borderRadiusLG: 0,
                        borderRadiusSM: 0,
                        controlItemBgHover: `${COLORS.TURQUOISE}`,
                        
                    },
                    Modal : {
                        fontFamily: "Baloo Paaji 2, serif",
                        titleFontSize: 20,
                        borderRadiusLG: 0,
                        contentBg: `${COLORS.TURQUOISE}`,
                        headerBg: `${COLORS.TURQUOISE}`,
                        colorText: `${COLORS.VERY_DARK_BLUE}`,
                    }
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};
