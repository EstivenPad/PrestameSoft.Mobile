import { useState } from "react";

export const useMenu = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState({ x:0, y:0 });
    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);

    const onDisplayMenu = ({ nativeEvent }) => {
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        }
        setMenuAnchor(anchor);
        openMenu();
    };

    return {
        showMenu,
        menuAnchor,

        closeMenu,
        onDisplayMenu
    };
};